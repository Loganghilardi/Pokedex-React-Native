import React, {useState} from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Car from './src/screen/Car';
import CarsList from './src/screen/CarsList';
import Setting from './src/screen/Setting';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';
import {PokemonsView, PokemonDetailsView, LoginView} from './src/views';

const ListStack = createNativeStackNavigator();
const PokedexStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

function ListStackScreen() {
  return (
    <ListStack.Navigator initialRouteName="Véhicules">
      <ListStack.Screen
        name="Véhicules"
        options={{
          headerStyle: {
            backgroundColor: '#f8fafc',
          },
        }}
        component={CarsList}
      />
      <ListStack.Screen
        name="Véhicule"
        options={{
          headerStyle: {
            backgroundColor: '#f8fafc',
          },
        }}
        component={Car}
      />
    </ListStack.Navigator>
  );
}

function PokedexStackScreen() {
  return (
    <PokedexStack.Navigator initialRouteName="Pokédex">
      <PokedexStack.Screen
        name="Pokédex"
        options={{
          headerStyle: {
            backgroundColor: '#f8fafc',
          },
        }}
        component={PokemonsView}
      />
      <PokedexStack.Screen
        name="Pokémon"
        options={{
          headerStyle: {
            backgroundColor: '#f8fafc',
          },
        }}
        component={PokemonDetailsView}
      />
    </PokedexStack.Navigator>
  );
}

function SettingsStackScreen({setIsAuthenticated}) {
  return (
    <SettingsStack.Navigator initialRouteName="Paramètres">
      <SettingsStack.Screen
        name="Paramètres"
        options={{
          headerStyle: {
            backgroundColor: '#f8fafc',
          },
        }}>
        {props => (
          <Setting {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      </SettingsStack.Screen>
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginView setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Pokedex"
          screenOptions={{
            headerShown: false,
            tabBarStyle: {backgroundColor: '#f8fafc'},
          }}>
          <Tab.Screen
            name="VéhiculesList"
            component={ListStackScreen}
            options={{
              tabBarLabel: 'Liste des véhicules',
              tabBarIcon: ({color, size}) => (
                <AntDesign name="car" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Pokedex"
            component={PokedexStackScreen}
            options={{
              tabBarLabel: 'Pokédex',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="pokemon-go"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
       
            options={{
              tabBarLabel: 'Paramètres',
              tabBarIcon: ({color, size}) => (
                <MaterialIcons name="settings" color={color} size={size} />
              ),
            }}>
            {props => (
              <SettingsStackScreen
                {...props}
                setIsAuthenticated={setIsAuthenticated}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
