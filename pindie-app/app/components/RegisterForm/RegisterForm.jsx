
import Styles from './RegisterForm.module.css';
import {authorize, getMe, setJWT} from "@/app/api/api utils";
import {endpoints} from "@/app/api/config";
import {useEffect, useState} from "react";
import {isResponseOk} from "@/app/api/api utils";
import {useStore} from '@/app/store/app-store';

export const RegisterForm = (props) => {
    const authContext = useStore();
    const [authData, setAuthData] = useState({ identifier: "", password: "" });
    const [message, setMessage] = useState({ status: null, text: null });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = await authorize(endpoints.auth, authData);
        if(isResponseOk(userData)) {
            authContext.login(userData.user, userData.jwt); // login из контекста
            setMessage({ status: "success", text: "Вы авторизовались!" });
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
        if (authContext.user) {
            timer = setTimeout(() => {
                props.close();
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [authContext.user]);

    return (
    <form onSubmit={handleSubmit} className={Styles['form']}>
      <h2 className={Styles['form__title']}>Регистрация</h2>
        <div className={Styles['form__fields']}>
            <label className={Styles['form__field']}>
                <span className={Styles['form__field-title']}>Имя</span>
                <input name={"password"} onInput={handleInput} className={Styles['form__field-input']} type="password"
                       placeholder='Имя пользователя'/>
            </label>
            <label className={Styles['form__field']}>
                <span className={Styles['form__field-title']}>Email</span>
                <input name={"identifier"} onInput={handleInput} className={Styles['form__field-input']} type="email"
                       placeholder="Ваша почта"/>
            </label>
            <label className={Styles['form__field']}>
                <span className={Styles['form__field-title']}>Пароль</span>
                <input name={"password"} onInput={handleInput} className={Styles['form__field-input']} type="password"
                       placeholder='Придумайте пароль'/>
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
