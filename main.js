'use strict'

const listEl = document.getElementById('cards');
const pokemonNaoEncontrado = document.getElementById('aviso');

const pesquise = () => {
    const nome = document.querySelector('#nome').value
    console.log(nome)
    buscarPokemon(nome)
}

const buscarPokemon = (nome) => {
    listEl.innerHTML = '';
    pokemonNaoEncontrado.innerHTML = '';

    const URL = "https://api.pokemontcg.io/v1/cards?name="

    if (nome.trim() === '') {
        pokemonNaoEncontrado.innerHTML = 'Digite o nome de um Pokémon';
        return;
    }

    var Httpreq = new XMLHttpRequest();
    Httpreq.open(
        "GET",
        "https://api.pokemontcg.io/v1/cards?name=" + nome,
        false);
    Httpreq.send(null);

    

    if (Httpreq.status === 200) {
        var arrayPokemon = JSON.parse(Httpreq.responseText);
        console.log(arrayPokemon.cards.length)
        
        if (arrayPokemon.cards.length == 0) {
            pokemonNaoEncontrado.innerHTML = 'Pokémon não encontrado';
        } else if 
        (arrayPokemon.cards && Array.isArray(arrayPokemon.cards)) {
            arrayPokemon.cards.forEach(item => {
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