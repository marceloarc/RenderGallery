import React, { Component } from 'react';
import axios from 'axios';


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
        const { email, password, name, userType, document } = this.state;
        var data = {};
        try {
            let response;
            if (userType === 'artista') {
               // data = { "user": { "name": "teste", "email": "teste@teste18.com", "password": "teste", "pic": "teste", "telefone": "43434" } };
                data = { "user": { email, password, name, "pic": "0", "telefone": "0" } };

                response = await axios.post(process.env.REACT_APP_API + '/user/RegisterArtista', data);
            } else {
               // data = { "document": "43802329805", "user": { "name": "teste", "email": "teste@teste18.com", "password": "teste", "pic": "teste", "telefone": "43434" } };
                data = { "document": document, "user": { email, password, name, "pic": "0", "telefone": "0" } };

                response = await axios.post(process.env.REACT_APP_API + '/user/RegisterCliente', data);
            }

            const result = response.data;
            if (result.sucesso) {
                this.setState({ message: result.sucesso });
            } else if (result.erro) {
                this.setState({ message: result.erro });
            }
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const { email, password, name, userType, message, document } = this.state;

        return (
            <div>
                <h2>Registro de Usuário</h2>
                <label>
                    Nome:
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                    />
                </label>
                <br />
                <label>
                    Senha:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                    />
                </label>
                <br />
                <label>
                    Tipo de Usuário:
                    <select name="userType" value={userType} onChange={this.handleChange}>
                        <option value="artista">Artista</option>
                        <option value="cliente">Cliente</option>
                    </select>
                </label>
                <br />

                {/* Renderiza o campo CPF se o userType for "cliente" */}
                {userType === 'cliente' && (
                    <label>
                        CPF:
                        <input
                            type="text"
                            name="cpf"
                            value={document}
                            onChange={this.handleChange}
                        />
                    </label>
                )}

                <br />
                <button onClick={this.handleRegister}>Registrar</button>
                <p>{message}</p>
            </div>
        );
    }
}

export default Registro;
