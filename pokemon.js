//Busca dentro do html a tag "section"
var section = document.querySelector('#gridPokemons');

window.onload = function () {
    // setTimeout(function () {
    //     consultarAPIPoke();
    // }, 1000); // Atraso de 1 segundo
    consultarAPIPoke();
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
                const buttonPokemon = document.createElement('a');
                buttonPokemon.setAttribute("onclick", "exibe('" + pokemon.name + "')");

                const divPokemon = document.createElement('div');
                divPokemon.classList.add('frame-pokemon');
                divPokemon.classList.add('display-flex');

                const containerPokemon = document.createElement('div');
                containerPokemon.classList.add('container-pokemon')
                divPokemon.appendChild(containerPokemon);

                // const picturePokemon = document.createElement('picture');
                // picturePokemon.classList.add('pokemon-grid')
                // containerPokemon.appendChild(picturePokemon);

                // const imgPokemon = document.createElement('img');
                // imgPokemon.classList.add('gif')
                // picturePokemon.appendChild(imgPokemon);

                const containerLabel = document.createElement('div');
                containerLabel.classList.add('container-label');
                divPokemon.appendChild(containerLabel);

                const nomePokemon = document.createElement('p');

                if (pokemon.name.length > 12)
                    nomePokemon.classList.add('nome-pokemon-grid-pequena');
                else
                    nomePokemon.classList.add('nome-pokemon-grid');

                nomePokemon.textContent = pokemon.name;
                containerLabel.appendChild(nomePokemon);

                const numeroPokemon = document.createElement('span');
                // numeroPokemon.textContent = pokemon.name; //Colocar numero do pokemon
                // containerLabel.appendChild(numeroPokemon);

                // Faz uma segunda chamada à API para obter os detalhes do Pokémon
                // Traz a imagem em movimento do pokemon, porém nem todo pokemon tem sua versão na 'geração 5'. 
                // Portanto, muitos ficarão sem imagem. O correto seria colocar uma condição, que caso venha null a imagem, ele busque nos outros 'nós' do json (generation-vi, generation-vii, etc)
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokemonData => {

                        const picturePokemon = document.createElement('picture');
                        picturePokemon.classList.add('pokemon-grid')
                        // containerPokemon.appendChild(picturePokemon);

                        const imagemPokemon = document.createElement('img');
                        // buttonPokemon.onclick = alert(pokemon['name']);
                        // document.getElementById(pokemon['name']).onclick = exibe()
                        // buttonPokemon.id = pokemon['name'];

                        // Acessando a propriedade usando notação de colchetes
                        const img = pokemonData['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

                        // se não existir imagem animada do pokemon ele retorna a padrão estática
                        if (img != null)
                            imagemPokemon.src = img;
                        else
                            imagemPokemon.src = pokemonData['sprites']['front_default'];

                        imagemPokemon.style.height = "50px";

                        const buttonAlinha = document.createElement('a');

                        numeroPokemon.textContent = "#" + pokemonData['id']; //Colocar numero do pokemon
                        containerLabel.appendChild(numeroPokemon);
                        picturePokemon.appendChild(imagemPokemon)
                        buttonAlinha.appendChild(picturePokemon);

                        containerPokemon.appendChild(buttonAlinha);
                    })
                    .catch(error => {
                        console.error('Erro ao obter detalhes do Pokémon:', error);
                    });
                // Faz uma segunda chamada à API para obter os detalhes do Pokémon
                // Traz a imagem estática do pokemon
                // fetch(pokemon.url)
                //     .then(response => response.json())
                //     .then(pokemonData => {
                //         const imagemPokemon = document.createElement('img');
                //         // imagemPokemon.src = pokemonData.sprites.front_default;
                //         imagemPokemon.src = pokemonData.sprites.versions.'generation-v'.animated;
                //         divPokemon.appendChild(imagemPokemon);
                //     })
                //     .catch(error => {
                //         console.error('Erro ao obter detalhes do Pokémon:', error);
                //     });

                buttonPokemon.appendChild(divPokemon);
                section.appendChild(buttonPokemon);
            });
        })
        .catch(error => {
            console.error('Ocorreu um erro ao consultar a API:', error);
        });
}

// const fetchPokemon = async (pokemon) => {
//     const APIResponse = await fetch(``);
// }

//Função que é chamada quando o botão "busca pokemon" é pressionado
function exibe() {
    var pokemon = document.querySelector('#txtBusca').value
    API('https://pokeapi.co/api/v2/pokemon/' + pokemon)
}

function exibe(pokemon) {
    var request = new XMLHttpRequest();
    var requestURL = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;

    request.onreadystatechange = function (e) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var pokemon = request.response['name'];

                const imgPokemon = document.getElementById('imgPokemon');
                const h2nomePokemon = document.getElementById('h2nomePokemon');
                const nrPokemon = document.getElementById('nrPokemon');
                const dscPokemon = document.getElementById('dscPokemon');
                dscPokemon.innerText = "";

                const myH4 = document.createElement('h4');
                const myPara1 = document.createElement('li');
                const myPara2 = document.createElement('h4');
                const myList = document.createElement('ul');

                h2nomePokemon.textContent = pokemon;

                pokemon = request.response['id'];
                nrPokemon.value = pokemon;

                pokemon = request.response['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
                if (pokemon == null)
                    pokemon = request.response['sprites']['front_default'];

                imgPokemon.setAttribute('src', pokemon);

                myH4.textContent = "Habilidades:";
                dscPokemon.appendChild(myH4);

                pokemon = request.response['abilities'];

                for (let i = 0; i < pokemon.length; i++) {
                    myPara1.innerHTML += pokemon[i].ability.name + "<br>";
                }

                // myPara1.setAttribute('class', 'list-group-item');
                // myPara1.innerText = pokemon[0].ability.name;

                // myPara2.setAttribute('class', 'list-group-item');
                // myPara2.innerText = pokemon[1].ability.name;

                myList.appendChild(myPara1);
                // myList.appendChild(myPara2);
                dscPokemon.appendChild(myList);

            }

        }
    }

    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

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