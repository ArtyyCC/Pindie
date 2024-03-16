const getData = async (url) => {
    try {
        const response = await fetch(url)
        if (response.status !== 200) {
            throw new Error('Ошибка получения данных')
        }
        const data = await response.json()
        return data
    } catch (error) {
        return error
    }
}
const normalizeDataObject = (obj) => {
    return {
        ...obj,
        category: obj.categories,
        users: obj.users_permissions_users,
    };
};

const normalizeData = (data) => {
    return data.map((item) => {
        return normalizeDataObject(item)
    })
}

const isResponseOk = (response) => {
    return !(response instanceof Error);
};



const getNormalizedGamesDataByCategory = async (url, category) => {
    const data = await getData(`${url}?categories.name=${category}`);

    return isResponseOk(data) ? normalizeData(data) : data;
};

const getNormalizedGameDataById = async (url, id) => {
    const data = await getData(`${url}/${id}`);
    return isResponseOk(data) ? normalizeDataObject(data) : data;
};

const authorize = async (url, data) => {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (res.status !== 200) {
            throw new Error("Ошибка авторизации");
        }
        const result = await res.json();
        return result;
    } catch (error) {
        return error;
    }
};



const getMe = async (url, jwt) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { Authorization: `Bearer ${jwt}` },
        });
        if (response.status !== 200) {
            throw new Error("Ошибка получения данных");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
};

const setJWT = (jwt) => {
    localStorage.setItem("jwt", jwt);
};

const getJWT = () => {
    return localStorage.getItem("jwt");
};

const removeJWT = () => {
    localStorage.removeItem("jwt");
};

const checkIfUserVoted = (game, userId) => {
    return game.users.find((user) => user.id === userId);
};

const vote = async (url, jwt, usersArray) => {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ users_permissions_users: usersArray }),
        })
        if (response.status !== 200) {
            throw new Error('Ошибка голосования')
        }
        const result = await response.json()
        return result
    } catch (error) {
        return error
    }
}


export {
    getData,
    normalizeDataObject,
    normalizeData,
    isResponseOk,
    getNormalizedGamesDataByCategory,
    getNormalizedGameDataById,
    authorize,
    getMe,
    setJWT,
    getJWT,
    removeJWT,
    checkIfUserVoted,
    vote
}
