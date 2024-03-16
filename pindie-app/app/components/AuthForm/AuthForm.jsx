import Styles from './AuthForm.module.css';
import {authorize, getMe, setJWT} from "@/app/api/api utils";
import {endpoints} from "@/app/api/config";
import {useEffect, useState} from "react";
import {isResponseOk} from "@/app/api/api utils";

export const AuthForm = (props) => {
    const [authData, setAuthData] = useState({ identifier: "", password: "" });
    const [userData, setUserData] = useState(null);
    const [message, setMessage] = useState({ status: null, text: null });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = await authorize(endpoints.auth, authData);
        if (isResponseOk(userData)) {
            getMe(endpoints.me, userData.jwt)
            setUserData(userData);
            props.setAuth(true);
            setMessage({ status: "success", text: "Вы авторизовались!" });
            setJWT(userData.jwt)
        } else {
            setMessage({ status: "error", text: "Неверные почта или пароль" });
        }
    };
    const handleInput = (e) => {
        const newAuthData = authData;
        newAuthData[e.target.name] = e.target.value;
        setAuthData({ ...authData, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        let timer;
        if (userData) {
            timer = setTimeout(() => {
                props.close();
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [userData]);

    return (
    <form onSubmit={handleSubmit} className={Styles['form']}>
      <h2 className={Styles['form__title']}>Авторизация</h2>
      <div className={Styles['form__fields']}>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Email</span>
          <input  name={"identifier"} onInput={handleInput} className={Styles['form__field-input']} type="email" placeholder="hello@world.com"/>
        </label>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Пароль</span>
          <input name={"password"} onInput={handleInput} className={Styles['form__field-input']} type="password" placeholder='***********'/>
        </label>
      </div>
        {message.status && (
            <p className={Styles["form__message"]}>{message.text}</p>
        )}
        <div className={Styles['form__actions']}>
        <button className={Styles['form__reset']} type="reset">Очистить</button>
        <button className={Styles['form__submit']} type="submit">Войти</button>
      </div>
    </form>
  ) 
};
