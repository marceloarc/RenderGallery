import React, { useState } from 'react';
import axios from 'axios';
import './loginn.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const navigate = useNavigate();
    const notify = () => {
        toast.success("Notificação de sucesso!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000, // Tempo em milissegundos que a notificação deve permanecer visível
        });
    };
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



            console.log(response);
            notify();
            if (response.data.erro) {
                alert(response.data.erro)
            } else {
        
                var nome = response.data.name;
                var role = response.data.role;
                alert("Nome: "+nome + " Role:" + role);
            }

        } catch (error) {
            alert(error);
            console.error(error);
        }
    }


    return (

        <div className="container">
            <div className="form-image">
                <div className="texto">
                    <h1>Bem Vindo!</h1>
                    <br />
                    <p>Realize o Login para acessar sua conta.</p>
                </div>
            </div>
            <div className="right-login">
                <div className="card-login">
                    <h1>Login</h1>          
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input
                                type="text"
                                name="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                name="senha"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="checkbox-container">
                                <input
                                    type="checkbox"
                                    checked={keepLoggedIn}
                                    onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                                />
                            <label>
                                Manter-me conectado
                            </label>
                        </div>
                        <div className="continue-button">
                            <button onClick={notify}>Entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
