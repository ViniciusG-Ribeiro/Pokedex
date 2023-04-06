//Busca dentro do html a tag "section"
var section = document.querySelector('section');

//Função que é chamada quando o botão(busca o pokemon) é pressionado
function exibe() {
    var pokemon = document.querySelector('input').value
    var request = API('https://pokeapi.co/api/v2/pokemon/' + pokemon)
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
                var myImg = document.createElement('img');
                var myPara1 = document.createElement('li');
                var myPara2 = document.createElement('li');
                var myPara3 = document.createElement('li');
                var myList = document.createElement('ul');

                myCol.setAttribute('class', 'col-md-3');
                myDiv.setAttribute('class', 'card');
                myDiv.setAttribute('style', 'margin: 10px; padding-left: 0px;');

                myH2.textContent = pokemon[0].name;
                pokemon = request.response['sprites']
                myImg.setAttribute('src', pokemon.front_default)

                myPara1.setAttribute('class', 'list-group-item');
                myPara2.setAttribute('class', 'list-group-item');
                myPara3.setAttribute('class', 'list-group-item');
                myImg.setAttribute('class', 'card-img-top')

                myDiv.appendChild(myH2);
                myDiv.appendChild(myImg);
                myDiv.appendChild(myPara1);
                myDiv.appendChild(myPara2);
                myDiv.appendChild(myPara3);
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
};