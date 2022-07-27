import React, {useState, useEffect} from 'react';
import {View, FlatList, Pressable} from 'native-base';
import __pokemons from '../../constants/pokemons';
import {PokemonCard} from '../../components';
import {usePokemons} from '../../api';

export const PokemonsView = ({navigation}) => {
  const [pokemons, setPokemons] = useState(__pokemons);
  const [baseLimit, setBaseLimit] = useState(20);

  const {fetchPokemons} = usePokemons();

  const getPokemons = async () => {
    try {
      const response = await fetchPokemons(baseLimit);

      setPokemons(response);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMorePokemons = async () => {
    try {
      const limit = baseLimit + 5;
      const response = await fetchPokemons(limit);

      setPokemons(response);
      setBaseLimit(limit);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <View _dark={{bg: 'blueGray.900'}} _light={{bg: 'blueGray.50'}}>
      <FlatList
        data={pokemons}
        onEndReachedThreshold={0.5}
        onEndReached={loadMorePokemons}
        renderItem={({item: pokemon}) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate('Pokémon', {pokemon: pokemon})
              }>
              <PokemonCard pokemon={pokemon} />
            </Pressable>
          );
        }}
        keyExtractor={item => item.name}
      />
    </View>
  );
};
