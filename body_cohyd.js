function criaElementos(file, elem){
    let conj_elems = [];
    let lista_indices = [];
    elem.forEach(compo => {
        for (let k=0; k<compo.length; k++){
            if (compo[k].search(':') != -1){
                lista_indices.push(k);
            }
        }
    })

    elem.forEach(componente => {
        conj_elems.push(document.createElement(`${componente[0]}`));
        let conteudo_filho = '';
        for (let vz = 0; vz<lista_elementos.length; vz++){
            for (let m=0; m<componente.length; m++){
                if (lista_indices[vz] > m){
                    conteudo_filho += componente[m];
                }
            }
        }
        conj_elems[-1].innerHTML = conteudo_filho;
        console.log(conj_elems[-1]);
        //document.body.appendChild(conj_elems[-1]);
    })
}

function createBody(file,body){
    var cpo = body.split('\n');
    let comeco = 2;
    let fim = cpo.length - 1;
    var lista_elementos = [];

    for (let i=comeco+1; i<fim; i++){
        lista_elementos.push(cpo[i].replace("\r",'').replace(';',''));
    }

    let separa_elems = [];
    for (let i=0; i<lista_elementos.length; i++){
        separa_elems.push(lista_elementos[i].split(' '));
    }

    separa_elems.forEach(elem => {
        criaElementos(file, elem);
    })
}

exports.createBody = createBody;