import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import Endereco from '../domain/Endereco';

@Component({
  selector: 'app-add-endereco',
  templateUrl: './add-endereco.page.html',
  styleUrls: ['./add-endereco.page.scss'],
})
export class AddEnderecoPage implements OnInit {

  constructor(private alert: AlertController, private nav: NavController) { }

  ngOnInit() {
  }

  buscar(cep) {
    const cepString = cep.el.value
    if (cepString == '' || cepString.length !== 8 ||
      !cepString.match(/^\d+$/g)) {
      console.log("CEP invalido")
    } else {
      console.log('CEP Válido')
      let retorno = fetch('https://viacep.com.br/ws/' + cepString + '/json')
      console.log("Enviando requisição...")
      retorno.then(dados => {
        return dados.json()
      }).then(endereco => {
        if (endereco.erro) {
          console.error('CEP Inexistente')
        } else {
          this.alert.create({
            header: 'Seu endereço esta correto?',
            subHeader: `${endereco.logradouro}, ${endereco.bairro} , ${endereco.localidade} - ${endereco.uf.toUpperCase()}`,
            buttons: [{
              text: 'Não'
            }, {
              text: 'Sim',
              handler: () => {
                this.alert.dismiss()
                this.alert.create({
                  header: 'Qual o seu número?',
                  inputs: [{
                    name: 'numero',
                    type: 'number'
                  }],
                  buttons: [{
                    text: 'Cancelar'
                  }, {
                    text: 'Salvar',
                    handler: (dados) => {
                      let tempEnd = new Endereco()
                      tempEnd.bairro = endereco.bairro
                      tempEnd.cidade = endereco.localidade
                      tempEnd.estado = endereco.uftemp
                      tempEnd.numero = endereco.numero
                      tempEnd.rua = endereco.longradouro
                      tempEnd.cep = endereco.cep
                      tempEnd.salvar()
                      this.nav.back()
                    }
                  }]
                }).then(alert => {
                  alert.present()
                })
              }
            }]
          }).then(alert => {
            alert.present()
          })
        }
      })
    }
  }

}
