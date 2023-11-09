import React, { Component } from 'react';

import axios from 'axios';
import './loginn.css';
import InputMask from 'react-input-mask';

class CriaArt extends Component {
    state = {
        arte: 'teste',
        valor: '',
        quantidade: '',
       
        file: '',
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFile = (e) => {
        this.setState({ [e.target.name]: e.target.files[0] })
    }


    handleInputChange = (e) => {
        const { name, value } = e.target;

        // Não defina a máscara automaticamente aqui

        this.setState({
            [name]: value,
        });
    };

    handlePublicar = async () => {
        const {arte, valor, quantidade, file } = this.state;
  
        try {
            let response;
            let response2
            const data = new FormData();
            data.append("File", file);

            console.log(this.state);

            response = await axios.post(process.env.REACT_APP_API + '/art/Upload', data);

            const result = response.data;
            console.error(result);
            if (result.sucesso) {
                this.setState({ message: result.sucesso });
                alert(result.sucesso);
                try {
                    const data2 = new FormData();
                    data2.append("Quantidade", quantidade);
                    data2.append("Valor", valor);
                    data2.append("Arte", arte);
                    data2.append("Path", result.path);
                    response2 = await axios.post(process.env.REACT_APP_API + '/art/SaveArt', data2);
                    const result2 = response2.data;
                    if (result2.sucesso) {
                        alert(result2.sucesso);
                    }
                } catch(error) {
                    console.error(error);
                }
            } else if (result.erro) {
                this.setState({ message: result.erro });
                alert(result.erro);
            }
        } catch (error) {
            console.error(error);
 
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
     
                                onChange={this.handleFile}
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
