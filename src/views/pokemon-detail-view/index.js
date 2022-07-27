import React, {useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import __pokemons from '../../constants/pokemons';
import {PokemonType} from '../../components';
import {Text, ScrollView, Image, VStack, HStack, Box} from 'native-base';
import {usePokemons} from '../../api';

export const PokemonDetailsView = ({navigation, route}) => {
  const [pokemon, setPokemon] = useState(__pokemons[0]);
  const [loading, setLoading] = useState(true);
  const {fetchPokemon} = usePokemons();
  const pokemonId = route.params.pokemon.id;

  const getPokemon = async () => {
    try {
      const response = await fetchPokemon(pokemonId);
      setPokemon(response);
      const name = response.name;
      navigation.setOptions({
        headerTitle: name.charAt(0).toUpperCase() + name.slice(1),
      });
      //tmp
      setTimeout(() => {
        setLoading(false);
      }, 100);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getPokemon();
  }, []);

  if (loading === true) {
    return (
      <View style={[styles.loadingContainer, styles.loadingHorizontal]}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <ScrollView _dark={{bg: 'blueGray.900'}} _light={{bg: 'blueGray.50'}}>
      <Image
        source={{
          uri: pokemon.sprites.other.home.front_default,
        }}
        alt="Pokemon front default sprite"
        size="2xl"
        style={styles.image}
      />
      <Text style={styles.name}>{pokemon.name}</Text>
      <VStack>
        <Box
          style={styles.box}
          _dark={{bg: 'blueGray.900'}}
          _light={{bg: 'blueGray.50'}}>
          <HStack>
            <Text style={styles.text}>
              Taille du pokémon :{'\n'} {pokemon.height / 10}m
            </Text>
            <Text style={styles.text}>
              Poid du pokémon :{'\n'} {pokemon.weight / 10}Kg
            </Text>
          </HStack>
          <Text style={styles.typeTitle}>Type(s) :</Text>
          <HStack>
            {pokemon.types.map(type => {
              return (
                <PokemonType key={type.type.name} type={type}></PokemonType>
              );
            })}
          </HStack>
        </Box>
        <Box
          style={styles.boxStats}
          _dark={{bg: 'blueGray.900'}}
          _light={{bg: 'blueGray.50'}}>
          <Text style={styles.statsTitle}>Stats: </Text>
          {pokemon.stats.map(stat => {
            return (
              <Text style={styles.text} key={stat.stat.name}>
                {stat.stat.name} : {stat.base_stat}
              </Text>
            );
          })}
        </Box>
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 350,
    marginTop: 0,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
    textTransform: 'capitalize',
  },
  loading: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 200,
  },
  box: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    fontSize: 15,
    marginRight: 10,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  typeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  boxStats: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center"
  },
  loadingHorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
