import React from 'react';
import {View} from 'react-native';
import {Text, Box} from 'native-base';

export default Car = ({navigation, route}) => {
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      _dark={{bg: 'blueGray.900'}}
      _light={{bg: 'blueGray.50'}}>
      <View style={{flex: 1, padding: 24}}>
        <Text mx="auto" fontSize="lg">
          Vehicule {route.params.item.make} - {route.params.item.model}
        </Text>
      </View>
    </Box>
  );
};
