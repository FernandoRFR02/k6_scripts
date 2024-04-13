import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const response = http.get('https://pokeapi.co/api/v2/pokemon/1');

  check(response, {
    'El estado es 200': (r) => r.status === 200,
    'El tiempo de respuesta fue menos de 100ms': (r) => r.timings.duration < 100,
  });

  const jsonData = JSON.parse(response.body);

  check(jsonData, {
    'El nombre correcto del pokemon es': (data) => data.name === 'bulbasaur',
    'La altura correcta del pokemon es': (data) => data.height === 7,
  });
}