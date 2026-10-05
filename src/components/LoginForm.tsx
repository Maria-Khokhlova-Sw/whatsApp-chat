import {useState} from "react";
import type {Credentials} from "../types";
import "./LoginForm.css";

type LoginFormProps= {
    onLogin: (credentials: Credentials) => void;

}
export default function LoginForm({onLogin}: LoginFormProps) {
    const [id, setId] = useState<string>('');
    const [apiUrl, setApiUrl] = useState<string>('https://api.green-api.com');
    const [token, setToken] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dataId = id.trim();
        const apiUrlData = apiUrl.trim();
        const tokenData = token.trim();
        if (!dataId || !apiUrlData || !tokenData) return;
        onLogin({idInstance: dataId, apiToken:tokenData, apiUrl: apiUrlData });

    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Вход в GREEN-API</h2>
            <p className="login-hint">Данные инстанса из console.green-api.com</p>
            <input value={id}
                   onChange={(e) => setId(e.target.value)}
                   placeholder="idInstance" required/>
            <input value={apiUrl}
                   onChange={(e) => setApiUrl(e.target.value)}
                   placeholder="apiUrl" required/>
            <input value={token}
                   onChange={(e) => setToken(e.target.value)}
                   placeholder="apiTokenInstance" required type="password"/>
            <button type="submit">Войти</button>
        </form>
    )


}