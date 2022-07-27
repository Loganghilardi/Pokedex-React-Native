import React from 'react';
import {View} from 'react-native';
import {Text, Box, useColorMode, Switch, HStack, Button} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Setting = ({navigation, route, setIsAuthenticated}) => {
  function ToggleDarkMode() {
    const {colorMode, toggleColorMode} = useColorMode();

    return (
      <HStack space={2} mx="auto" alignItems="center">
        <Text>Dark</Text>
        <Switch
          isChecked={colorMode === 'light'}
          onToggle={toggleColorMode}
          aria-label={
            colorMode === 'light'
              ? 'switch to dark mode'
              : 'switch to light mode'
          }
        />
        <Text>Light</Text>
      </HStack>
    );
  }

  function Logout() {
    function logout() {
      AsyncStorage.removeItem('@storage_Key');
      setIsAuthenticated(false);
    }

    return (
      <HStack space={2} mx="auto" alignItems="center">
        <Button title="logout" onPress={logout}>
          Logout
        </Button>
      </HStack>
    );
  }

  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      _dark={{bg: 'blueGray.900'}}
      _light={{bg: 'blueGray.50'}}>
      <View style={{flex: 1, padding: 24}}>
        <ToggleDarkMode />
        <Logout />
      </View>
    </Box>
  );
};
