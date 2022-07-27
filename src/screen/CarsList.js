import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, FlatList} from 'react-native';
import {
  NativeBaseProvider,
  Text,
  Box,
  Button,
  VStack,
  Divider,
  useColorMode,
  Switch,
  HStack,
} from 'native-base';

export default CarsList = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const getCars = async () => {
    try {
      const response = await fetch(
        `https://car-data.p.rapidapi.com/cars?page=${page}`,
        {
          headers: {
            'X-RapidAPI-Host': 'car-data.p.rapidapi.com',
            'X-RapidAPI-Key':
              '62ccdeafb4msh9bc542984a31c78p12828djsnbbe9c6d38fb0',
          },
        },
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getMoreCars = async page => {
    try {
      setPage(page);
      const response = await fetch(
        `https://car-data.p.rapidapi.com/cars?page=${page}`,
        {
          headers: {
            'X-RapidAPI-Host': 'car-data.p.rapidapi.com',
            'X-RapidAPI-Key':
              '62ccdeafb4msh9bc542984a31c78p12828djsnbbe9c6d38fb0',
          },
        },
      );

      const json = await response.json();
      if (json !== []) {
        setData(data.concat(json));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      _dark={{bg: 'blueGray.900'}}
      _light={{bg: 'blueGray.50'}}>
      <View style={{flex: 1, padding: 24}}>
        <Text mx="auto" fontSize="lg">
          Liste des véhicules disponibles
        </Text>

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            onEndReached={() => getMoreCars(page + 1)}
            ListEmptyComponent={() => <Text>Rien</Text>}
            renderItem={({item}) => {
              if (item.id) {
                return (
                  <Box
                    border="1"
                    mb="2"
                    borderRadius="md"
                    _dark={{bg: 'blueGray.800'}}
                    _light={{bg: 'blueGray.100'}}>
                    <VStack space="4" divider={<Divider />}>
                      <Box px="4" pt="4">
                        Marque - Model :{item.make} - {item.model}
                      </Box>
                      <Box px="4">Année :{item.year}</Box>
                      <Box px="4" pb="4">
                        <Button
                          title="Go to Jane's profile"
                          onPress={() =>
                            navigation.navigate('Véhicule', {item: item})
                          }>
                          Plus d'informations
                        </Button>
                      </Box>
                    </VStack>
                  </Box>
                );
              } else {
                return
              }
            }}
          />
        )}
      </View>
    </Box>
  );
};
