import { Http, VirtualUsers } from 'k6';
from pokebase.cache import API_CACHE


const options = {
  vus: 10,
  duration: '60s',
};

const cacheUrl = 'http://pokeapi.co/api/v2';

const virtualUsers = new VirtualUsers();

virtualUsers.add(() => {
  const pokemonId = Math.floor(Math.random() * 100) + 1;
  const response = Http.get(`${cacheUrl}/${pokemonId}`);

  if (response.status === 200) {
    console.log(`Datos de Pokémon ${pokemonId} recuperados del caché`);
  } else {
    console.error(`Error al recuperar datos de Pokémon ${pokemonId}: ${response.status}`);
  }
});

run(options, virtualUsers);
