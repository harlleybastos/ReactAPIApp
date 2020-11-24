import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
class Main extends Component {

    state = {
        products: [],
        productInfo: {},
        page: 1,
    }

    componentDidMount() {
        this.loadProducts();
    }

    prevPage = () => {
        const {page, productInfo} = this.state;
        //Busca qual a pagina atual que esta e as informações do produto do estado.

        if(page === 1) return;
        //Verifica se a página atual é a 1, se for não faz nada pois não tem pagina abaixo de 1.

        const pageNumber = page - 1;
        // Tira 1 da variavel pagina para voltar a anterior
        this.loadProducts(pageNumber);
        //Armazena a url o valor novo retido 1

    }

    nextPage = () => {
        const {page, productInfo} = this.state;
        //Busca qual a pagina atual que esta e as informações do produto do estado.
        
        if(page === productInfo.pages) return;
        //Verifica se a pagina atual ja é a ultima página, se estiver na ultima pagina simplesmente retorna pra não fazer nada.

        const pageNumber = page + 1;
        //Se não estiver na ultima pagina adicionar mais 1 na pagina e pega a proxima pagina.

        this.loadProducts(pageNumber);
        //Passa o numero da página atual para função usar como parametro na url

    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const { docs , ...productInfo } = response.data;
        // ARMAZENANDO DOCS EM UMA VARIAVEL E O TODO O RESTO DO ARRAY EM OUTRA (PRODUCTINFO) 
        this.setState({ products: docs, productInfo, page});
    }


    render() {
        const { products ,page, productInfo } = this.state;
        return (  
        <div className="product-list">
            {products.map((product) =>(
                <article key={product._id}>
                    <strong>{product.title}</strong>
                    <p>{product.description}</p>

                    <Link to={`/products/${product._id}`}>Acessar</Link>
                </article> 
            )
            )}
            <div className="actions">
                <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                <button disabled={page === productInfo.pages} onClick={this.nextPage}>Proxima</button>
            </div>
        </div>    
        );
    }
}

export default Main;