import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(process.env.REACT_APP_API + '/login', {
                email,
                password,
                keepLoggedIn,
            });

            console.log(response.data);
            const access = response.data.access;

            switch (access) {
                case 0:
                    // Redirecionar para a página de administrador
                    navigate('/fetch-data');
                    break;
                case 1:
                    // Redirecionar para a página de cliente
                    navigate('/fetch-data');
                    break;
                case 2:
                    // Redirecionar para a página de artista
                    navigate('/fetch-data');
                    break;
                default:
                    // Redirecionar para uma página de erro, pois o tipo de usuário é desconhecido
                    break;
            }

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <br />
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Senha</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>
                        Manter-me conectado
                        <input
                            type="checkbox"
                            checked={keepLoggedIn}
                            onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                        />
                    </label>
                </div>
                <div>
                    <button className="login-button" type="submit">Entrar</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
