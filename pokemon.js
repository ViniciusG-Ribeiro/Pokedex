//Busca dentro do html a tag "section"
var section = document.querySelector('#gridPokemons');

window.onload = function () {
    setTimeout(function () {
        consultarAPIPoke();
    }, 1000); // Atraso de 3 segundo
};

// function consultarAPIPoke() {
//     const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0";
//     const section = document.getElementById('gridPokemons');

//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => {
//             const pokemons = data.results;
            
//             pokemons.forEach(pokemon => {
//                 const divPokemon = document.createElement('div');
//                 divPokemon.classList.add('pokemon-card'); // Adicionar classes CSS para estilizar as divs conforme desejar.
                
//                 const nomePokemon = document.createElement('h2');
//                 nomePokemon.textContent = pokemon.name;
//                 divPokemon.appendChild(nomePokemon);

//                 section.appendChild(divPokemon);
//             });
//         })
//         .catch(error => {
//             console.error('Ocorreu um erro ao consultar a API:', error);
//         });
// }

//Função que carrega varios cards de pokemons ao entrar no index
function consultarAPIPoke() {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0";
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const pokemons = data.results;
            
            pokemons.forEach(pokemon => {
                const divPokemon = document.createElement('div');
                divPokemon.classList.add('pokemon-card'); // Você pode adicionar classes CSS para estilizar as divs conforme desejar.
                
                const nomePokemon = document.createElement('h2');
                nomePokemon.textContent = pokemon.name;
                divPokemon.appendChild(nomePokemon);

                // Faz uma segunda chamada à API para obter os detalhes do Pokémon
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokemonData => {
                        const imagemPokemon = document.createElement('img');
                        imagemPokemon.src = pokemonData.sprites.front_default;
                        divPokemon.appendChild(imagemPokemon);
                    })
                    .catch(error => {
                        console.error('Erro ao obter detalhes do Pokémon:', error);
                    });

                section.appendChild(divPokemon);
            });
        })
        .catch(error => {
            console.error('Ocorreu um erro ao consultar a API:', error);
        });
}


//Função que é chamada quando o botão "busca pokemon" é pressionado
function exibe() {
    var pokemon = document.querySelector('#txtBusca').value
    API('https://pokeapi.co/api/v2/pokemon/' + pokemon)
}

function API(url) {

    var request = new XMLHttpRequest();
    var requestURL = url;

    request.onreadystatechange = function (e) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                section.innerHTML = ''
                var pokemon = request.response['forms'];
                var myRol = document.createElement('div');

                myRol.setAttribute('class', 'row');
                section.appendChild(myRol);

                var myArticle = document.createElement('article');
                var myDiv = document.createElement('div');
                var myCol = document.createElement('div');
                var myH2 = document.createElement('h2');
                var myH4 = document.createElement('h4');
                var myImg = document.createElement('img');
                var myPara1 = document.createElement('li');
                var myPara2 = document.createElement('li');
                var myPara3 = document.createElement('li');
                var myList = document.createElement('ul');

                myCol.setAttribute('class', 'col-md-3');
                myDiv.setAttribute('class', 'card');
                myDiv.setAttribute('style', 'margin: 10px; padding-left: 0px;');
                
                myH2.textContent = pokemon[0].name;
                pokemon = request.response['sprites'];
                myImg.setAttribute('src', pokemon.front_default);

                myH4.textContent = "Habilidades:";
                pokemon = request.response['abilities'];
                myPara1.setAttribute('class', 'list-group-item');
                myPara1.innerText = pokemon[0].ability.name;

                myPara2.setAttribute('class', 'list-group-item');
                myPara2.innerText = pokemon[1].ability.name;
                
                // myPara3.setAttribute('class', 'list-group-item');
                myImg.setAttribute('class', 'card-img-top')

                myDiv.appendChild(myH2);
                myDiv.appendChild(myImg);
                myDiv.appendChild(myH4);
                myDiv.appendChild(myPara1);
                myDiv.appendChild(myPara2);
                // myDiv.appendChild(myPara3);
                myDiv.appendChild(myList);
                myCol.appendChild(myDiv);

                myCol.appendChild(myDiv);

                var ultimaRow = section.lastElementChild;
                ultimaRow.appendChild(myCol);
                section.appendChild(myRol);
            }

        } else {
            section.innerHTML = '';
            var myDiv = document.createElement('div');
            var divBody = document.createElement('div');
            var myError = document.createElement('p');

            myDiv.setAttribute('class', 'card');
            myDiv.setAttribute('style', 'margin: 10px; border: 0;');
            divBody.setAttribute('class', 'card-body');
            myError.textContent = "Nenhum resultado encontrado.";
            divBody.appendChild(myError);
            myDiv.appendChild(divBody);
            section.appendChild(myDiv);
        }
    }

    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
}

// function API(url, tipo) {

//     var request = new XMLHttpRequest();
//     var requestURL = url;

//     request.onreadystatechange = function (e) {
//         if (request.readyState === 4) {
//             if (request.status === 200) {
//                 section.innerHTML = ''
//                 var pokemon = request.response['forms'];
//                 var myRol = document.createElement('div');

//                 myRol.setAttribute('class', 'row');
//                 section.appendChild(myRol);

//                 debugger;
//                 for (i = 0; i < Object.keys(pokemon).length; i++) {
//                     var myArticle = document.createElement('article');
//                     var myDiv = document.createElement('div');
//                     var myCol = document.createElement('div');
//                     var myH2 = document.createElement('h2');
//                     var myImg = document.createElement('img');
//                     var myPara1 = document.createElement('li');
//                     var myPara2 = document.createElement('li');
//                     var myPara3 = document.createElement('li');
//                     var myList = document.createElement('ul');

//                     myCol.setAttribute('class', 'col-md-3');
//                     myDiv.setAttribute('class', 'card');
//                     myDiv.setAttribute('style', 'margin: 10px; padding-left: 0px;');

//                     if (tipo == 0) {
//                         myH2.textContent = pokemon[i].result.name;
//                     }
//                     else if (tipo == 1) {
//                         myH2.textContent = pokemon[i].name;
//                     }

//                     pokemon = request.response['sprites']
//                     myImg.setAttribute('src', pokemon.front_default)

//                     myPara1.setAttribute('class', 'list-group-item');
//                     myPara2.setAttribute('class', 'list-group-item');
//                     myPara3.setAttribute('class', 'list-group-item');
//                     myImg.setAttribute('class', 'card-img-top')

//                     myDiv.appendChild(myH2);
//                     myDiv.appendChild(myImg);
//                     myDiv.appendChild(myPara1);
//                     myDiv.appendChild(myPara2);
//                     myDiv.appendChild(myPara3);
//                     myDiv.appendChild(myList);
//                     myCol.appendChild(myDiv);

//                     myCol.appendChild(myDiv);

//                     var ultimaRow = section.lastElementChild;
//                     ultimaRow.appendChild(myCol);
//                     section.appendChild(myRol);
//                 }

//             }

//         } else {
//             section.innerHTML = '';
//             var myDiv = document.createElement('div');
//             var divBody = document.createElement('div');
//             var myError = document.createElement('p');

//             myDiv.setAttribute('class', 'card');
//             myDiv.setAttribute('style', 'margin: 10px; border: 0;');
//             divBody.setAttribute('class', 'card-body');
//             myError.textContent = "Nenhum resultado encontrado.";
//             divBody.appendChild(myError);
//             myDiv.appendChild(divBody);
//             section.appendChild(myDiv);
//         }
//     }

//     request.open('GET', requestURL);
//     request.responseType = 'json';
//     request.send();
// }