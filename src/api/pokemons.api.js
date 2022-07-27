import {Pokemon} from '../models/Pokemon.model';
import APIRoot from './index.api';

const pokemonsApi = new APIRoot('/pokemon');
export const usePokemons = () => {

  const fetchPokemons = async (limit) => {

    try {
      const res = await pokemonsApi.api().get(`/?limit=${limit}`);
      const pokemons = Pokemon.fromArray(res.data.results);
     
      return pokemons;
    } catch (error) {
      console.log('ERROR', error);
      throw error;
    }
  };

  const fetchPokemon = async (id) => {
    try {
      const res = await pokemonsApi.api().get(`/${id}`);

      return res.data;
    } catch (error) {
      console.log('ERROR', error);
      throw error;
    }
  };



  return {fetchPokemons, fetchPokemon};
};
