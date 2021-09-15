function pesquisaCep(cep){
    var cepCodigo = cep.replace(/\D/g, '');

    if (cepCodigo != "") {
        var mascara = /^[0-9]{8}$/;

        if(mascara.test(cepCodigo)){
            fetch(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {
                response.json().then(dados => {
                    if(dados.hasOwnProperty('erro')){
                        limpaForm()
                        alert("CEP não encontrado"); 
                    }else{
                        let cidade = document.getElementById("cidade")
                        let estado = document.getElementById("estado")
                        let logradouro = document.getElementById("logradouro") 

                        cidade.value = dados.localidade;
                        estado.value = dados.uf;
                        logradouro.value = dados.logradouro;
                        
                        cidade.readOnly = true;
                        estado.readOnly = true;
                        logradouro.readOnly = true;
                    }
                })
            })

        }else{
            limpaForm()
            alert("CEP inválido");
        }   
    }else{
        limpaForm()
    }
}

function limpaForm(){
    let cidade = document.getElementById("cidade")
    let estado = document.getElementById("estado")
    let logradouro = document.getElementById("logradouro") 

    cidade.value = "";
    estado.value = "";
    logradouro.value = "";    

    cidade.readOnly = false;
    estado.readOnly = false;
    logradouro.readOnly = false;
}