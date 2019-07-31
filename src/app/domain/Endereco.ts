
class Endereco {
    rua:String;
    cep:String;
    numero:String;
    bairro:String;
    cidade:String;
    estado:String;

    salvar(){

        localStorage.setItem((Math.random() * 100).toString(), JSON.stringify(this))

    }
}

export default Endereco