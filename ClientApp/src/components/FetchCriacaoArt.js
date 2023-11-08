import React, { Component } from 'react';
import axios from 'axios';
import './loginn.css';
import InputMask from 'react-input-mask';

class CriaArt extends Component {
    state = {
        valor: '',
        quantidade: '',
        arte: '',
        file: '',
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;

        // Não defina a máscara automaticamente aqui

        this.setState({
            [name]: value,
        });
    };

    handlePublicar = async () => {
        const { valor, quantidade, file } = this.state;
        var data = {};
        try {
            let response;

            data = { "art": { valor, quantidade, file } };
            response = await axios.post(process.env.REACT_APP_API + '/art/Upload', data);

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
        const { valor, quantidade, file } = this.state;

        return (
            <div className="container">
                <div className="form-image">
                    <div className="texto">
                        <h1>Bem Vindo!</h1>
                        <br />
                        <p>Publique sua Art agora</p>
                    </div>
                </div>
                <div className="form">
                    <div className="form-header">
                        <div className="title">
                            <h1>Insira os Dados da Arte</h1>
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="input-box">
                            <label for="valor">Valor</label>
                            <input
                                id="valor"
                                type="number"
                                name="valor"
                                placeholder="Insira o Valor da Art"
                                value={valor}
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <div className="input-box">
                            <label for="quantidade">Quantidade</label>
                            <input
                                id="quantidade"
                                type="number"
                                name="quantidade"
                                placeholder="Insira o número de cópias a serem vendidas"
                                value={quantidade}
                                onChange={this.handleChange}
                                required
                            />
                        </div> 

                        <div className="input-box">
                            <label for="arte">Arte</label>
                            <input
                                id="file"
                                type="file"
                                name="file"
                                value={file}
                                onChange={this.handleChange}
                                required
                            />
                        </div> 
                    </div>
                    <div className="continue-button">
                        <button onClick={this.handlePublicar}>Publicar</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CriaArt;
