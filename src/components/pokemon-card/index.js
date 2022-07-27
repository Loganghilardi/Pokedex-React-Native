import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {VStack, Text, HStack, Box, useColorModeValue} from 'native-base';
import {LinearGradient} from 'expo-linear-gradient';

export const PokemonCard = ({pokemon}) => {
  const linearGradientColor = useColorModeValue('2E2E2E', 'FFFFFF');
  return (
    <HStack justifyContent="center">
      <Box
        style={styles.card}
        _dark={{bg: 'blueGray.800'}}
        _light={{bg: 'blueGray.100'}}>
        <ImageBackground
          source={{
            uri: pokemon.image,
          }}
          resizeMode="contain"
          style={styles.imageBackground}>
          <VStack flex={1} justifyContent="flex-end">
            <LinearGradient
              colors={['00', '99'].map(o => `#${linearGradientColor}${o}`)}
              style={styles.informations}>
              <Text style={styles.pokemonName} fontSize="2xl">
                {pokemon.name}
              </Text>
            </LinearGradient>
          </VStack>
        </ImageBackground>
      </Box>
    </HStack>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  imageBackground: {
    width: '100%',
    height: 200,
  },
  informations: {
    paddingBottom: 15,
    paddingTop: 35,
    paddingLeft: 20,
    paddingRight: 20,
  },
  pokemonName: {
    fontWeight: 'bold',
    color: '#F7F7F7',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
