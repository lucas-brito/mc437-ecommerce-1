import React from 'react';
import { Form, ControlLabel, FormGroup, FormControl, Button, Col, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

import Layout from '../../components/Layout';
import ProdutosCarrinho from '../../components/ProdutosCarrinho';
import InformacoesCliente from '../../components/InformacoesCliente';

@inject('store') @observer
export default class CarrinhoIndex extends React.Component {

  state = {
      // logged: this.props.store.user || false;
    logged: false,
    preco: 10,
    frete: 0
  }

  frete = () => {
    const cpf = document.getElementById('txtCpf').value;
    const endereco = document.getElementById('txtEndereco').value;
    alert('[' + cpf + '] [' + endereco + ']');
    this.setState({ preco: 20 });
  }

  handleBuyButton(){
    const { store } = this.props;

    if (this.state.frete === -1){
      store.snackbar = { active: true, message: 'Frete ainda nao foi calculado', success: false };

    }else if (!store.userinfo.logged){
      store.snackbar = { active: true, message: 'Faça login para finalizar sua compra!', success: true };
      this.props.history.push('login');

    }
  }

  calcularPreco(){
    const produtos = Object.values(this.props.store.carrinho.produtos);
    console.log(produtos);
  }

  render() {
    // if (this.state.logged == false) {
    //   console.log('Nao tem carrinho, mandar para a pagina de login');
    // }

    return (
      <div>
        <Layout>
          <div>
            <h1>Informações Cliente</h1>
            <InformacoesCliente />
          </div>
          <div>
            <h1>Produtos no Carrinho</h1>
            <ProdutosCarrinho />
          </div>

          <Panel header="Endereço de Entrega">
            <Form horizontal>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={1}>
                  CPF
                </Col>
                <Col sm={5}>
                  <FormControl
                    id="txtCpf"
                    type="cpf"
                    placeholder="this.prop.store.user.cpf"
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} sm={1}>
                Endereço
              </Col>
                <Col sm={5}>
                  <FormControl
                    id="txtEndereco"
                    type="endereco"
                    placeholder="this.prop.store.user.endereco"
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col
                  componentClass={Button}
                  smOffset={1}
                  onClick={this.frete}
                >
                Re-Calcular Frete
              </Col>
              </FormGroup>
              <Col>
                <ListGroup>
                  <ListGroupItem header="Preço Final">
                  R$ {this.state.preco}
                  </ListGroupItem>
                </ListGroup>
              </Col>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button onClick={() => {this.handleBuyButton()}} bsSize="large">
                  Finalizar Compra
                </Button>
                </Col>
              </FormGroup>
            </Form>
          </Panel>
        </Layout>
      </div>
    );
  }
}
