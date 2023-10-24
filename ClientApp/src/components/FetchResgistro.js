import React, { Component } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import './loginn.css';



class Registro extends Component {
    state = {
        email: '',
        password: '',
        name: '',
        userType: 'artista', // Valor padrão para artista
        message: '',
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleRegister = async () => {
        const { email, password, name, userType, document, telefone } = this.state;
        var data = {};
        try {
            let response;
            if (userType === 'artista') {
               // data = { "user": { "name": "teste", "email": "teste@teste18.com", "password": "teste", "pic": "teste", "telefone": "43434" } };
                data = { "user": { email, password, name, "pic": "0", "telefone": telefone } };

                response = await axios.post(process.env.REACT_APP_API + '/user/RegisterArtista', data);
            } else {
               // data = { "document": "43802329805", "user": { "name": "teste", "email": "teste@teste18.com", "password": "teste", "pic": "teste", "telefone": "43434" } };
                data = { "document": document, "user": { email, password, name, "pic": "0", "telefone": telefone } };

                response = await axios.post(process.env.REACT_APP_API + '/user/RegisterCliente', data);
            }

            const result = response.data;
            console.error(result);
            if (result.sucesso) {
                this.setState({ message: result.sucesso });
                alert(result.sucesso);
            } else if (result.erro) {
                this.setState({ message: result.erro });
                alert(result.erro);
            }
        } catch (error) {
            console.error(error);
            alert("Todos os campos são obrigatórios!");
        }
    };

    render() {
        const { email, password, name, userType, telefone, document } = this.state;

        return (
            <div className="container">
                <div className="form-image">
                    <div className="texto">
                        <h1>Bem Vindo!</h1>
                        <br/>
                            <p>Realize o Cadastro para criar sua conta.</p>
                    </div>
                </div>
                <div className="form">
                    <div className="form-header">
                        <div className="title">
                            <h1>Cadastre-se</h1>
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="input-box">
                            <label for="name">Nome</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Digite seu nome"
                                value={name}
                                onChange={this.handleChange}
                                required
                            >
                            </input>
                        </div>

                        <div className="input-box">
                            <label for="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Digite seu email"
                                value={email}
                                onChange={this.handleChange}
                                required
                            >
                            </input>
                        </div>

                        <div className="input-box">
                            <label for="password">Senha</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={this.handleChange}
                                required
                            >
                            </input>
                        </div>

                        <div className="input-box">
                            <label for="telefone">Telefone</label>
                            <input
                                id="telefone"
                                type="number"
                                name="telefone"
                                mask="(99) 99999-9999"
                                placeholder="(xx) xxxxx-xxxx"
                                value={telefone}
                                onChange={this.handleChange}
                                required
                            >
                            </input>
                        </div>

                        <div className="input-box">
                            <label for="userType">Tipo de Usuário</label>
                            <select
                                id="userType"
                                name="userType"
                                required
                                value={userType}
                                onChange={this.handleChange}
                            >
                                <option value="artista">Artista</option>
                                <option value="cliente">Cliente</option>
                            </select>
                        </div>

                        {userType === 'cliente' && (
                            <div className="input-box">
                                <label for="document">Documento</label>
                                <input
                                    id="document"
                                    type="text"
                                    name="document"
                                    mask={document.length === 11 ? '999.999.999-99' : '99.999.999/9999-99'}
                                    placeholder="Digite seu documento"
                                    value={document}
                                    onChange={this.handleChange}
                                    required
                                >
                                </input>
                            </div>
                            )}
                        </div>
                        <div className="continue-button">
                        <button onClick={this.handleRegister}>Registrar</button>
                        </div>
                </div>
            </div>

        );
    }
}

export default Registro;
