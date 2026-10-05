import {useState} from "react";
import type {Credentials} from "../types";

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
        <form onSubmit={handleSubmit}>
            <input value={id}
                   onChange={(e) => setId(e.target.value)}
                   placeholder="id" required/>
            <input value={apiUrl}
                   onChange={(e) => setApiUrl(e.target.value)}
                   placeholder="apiUrl" required/>
            <input value={token}
                   onChange={(e) => setToken(e.target.value)}
                   placeholder="token" required type="password"/>
            <button type="submit" > Войти</button>
        </form>
    )


}