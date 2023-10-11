'use strict'

const listEl = document.getElementById('cards');

const pesquise = () => {
    const nome = document.querySelector('#nome').value
    console.log(nome)
    buscarPokemon(nome)
}

const buscarPokemon = (nome) => {
    const URL = "https://api.pokemontcg.io/v1/cards?name="

    if (nome.trim() === '') {
        listEl.innerHTML = 'Pokémon não encontrado';
        return;
    }

    var Httpreq = new XMLHttpRequest();
    Httpreq.open(
        "GET",
        "https://api.pokemontcg.io/v1/cards?name=" + nome,
        false);
    Httpreq.send(null);

    listEl.innerHTML = '';

    if (Httpreq.status === 200) {
        var responseData = JSON.parse(Httpreq.responseText);
        if (responseData.cards && Array.isArray(responseData.cards)) {
            responseData.cards.forEach(item => {
                listEl.insertAdjacentHTML('beforeend', `
                    <div class='card'>
                        <div class="card-img">
                            <img src="${item.imageUrl}" alt='${item.name}'/>
                        </div>
                        <div class="card-body">
                            <!-- Adicione outras propriedades do item aqui -->
                        </div>
                    </div>
                `);
            });
        }
    }
}