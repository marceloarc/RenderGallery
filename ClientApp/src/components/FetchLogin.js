import React, { Component } from 'react';
import axios from 'axios';
import './login.css';

class Login extends Component {
    static displayName = Login.name;
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            keepLoggedIn: false,
        };
    }

    handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        this.setState({ [name]: type === 'checkbox' ? checked : value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, keepLoggedIn } = this.state;

        try {
            const response = await axios.post(process.env.REACT_APP_API + '/login', {
                email,
                password,
                keepLoggedIn,
            })
                .then(response => {
                    const access = response.data.access;
                    switch (access) {
                        case 0:
                            // Redirecionar para a página de administrador
                            break;
                        case 1:
                            // Redirecionar para a página de cliente
                            break;
                        case 2:
                            // Redirecionar para a página de artista
                            break;
                        default:
                            // Redirecionar para uma página de erro, pois o tipo de usuário é desconhecido
                            break;
                    }
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                });

            // Você pode redirecionar ou executar ações apropriadas com base na resposta do servidor.
            
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const { email, password, keepLoggedIn } = this.state;
        return (
            <div className="login-container">
                <h2>Login</h2>
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <div>
                        <label>Email</label>
                        <br />
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Senha</label>
                        <br />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>
                            Manter-me conectado  
                            <input
                                type="checkbox"
                                name="keepLoggedIn"
                                checked={keepLoggedIn}
                                onChange={this.handleChange}
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
}

export default Login;

