import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Box} from 'native-base';
import {TYPES} from '../../config';

export const PokemonType = ({type}) => {
  const color = {
    backgroundColor: TYPES[type.type.name],
  };
  return (
    <Box style={[styles.type, color]}>
      <Text style={styles.text} key={type.type.name}>
        {type.type.name}
      </Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  type: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 3,
    borderRadius: 100,
    borderColor: '#cdcdcd',
    marginRight: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
  },
});
