import React, { Component } from 'react';
import axios from 'axios';

class RegistrationForm extends Component {
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
        const { email, password, name, userType } = this.state;
        const data = { email, password, name };

        try {
            let response;
            if (userType === 'artista') {
                response = await axios.post('/user/registerArtista', data);
            } else {
                response = await axios.post('/user/registerCliente', data);
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
        const { email, password, name, userType, message } = this.state;

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
                <button onClick={this.handleRegister}>Registrar</button>
                <p>{message}</p>
            </div>
        );
    }
}

export default RegistrationForm;
