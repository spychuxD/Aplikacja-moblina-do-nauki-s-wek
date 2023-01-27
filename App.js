import React from 'react';
import { NativeBaseProvider, Stack } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import LearnHome from './LearnHome';
import Fiszki from './Fiszki';
import SettingsScreen from './SettingsScreen';
import ChangeSettingsScreen from './ChangeSettingsScreen';
import Ucz from './Ucz';
import Dopasowania from './Dopasowania';
import CreateNewSetScreen from './CreateNewSetScreen';
import NotatkiPrzegladanie from './NotatkiPrzegladanie';
import NotatkiDodawanie from './NotatkiDodawanie';
import Test from './Test';
const Tab = createBottomTabNavigator();

const ProfileDrawer = () => {
  return (
   <Drawer.Navigator >
  <Drawer.Screen name="Profil " component={ProfileScreen} options = {{
      headerStyle: {
        backgroundColor: '#8aa29e',
      },
      headerTintColor: '#f1edee',
      headerTitle: 'Profil',
      headerTitleStyle: {
        fontSize: 24,
      },
      drawerIcon: ({focused, size}) => (
        <MaterialIcons
           name="account-circle"
           size={size}
           color={focused ? '#7cc' : '#ccc'}
        />
     ),
      }}/>
  <Drawer.Screen name="Ustawienia" component={SettingsScreen} options = {{
      headerStyle: {
        backgroundColor: '#8aa29e',
      },
      headerTintColor: '#f1edee',
      headerTitle: 'Profil',
      headerTitleStyle: {
        fontSize: 24,
      },
      drawerIcon: ({focused, size}) => (
        <MaterialIcons
           name="settings"
           size={size}
           color={focused ? '#7cc' : '#ccc'}
        />
     ),
      }}/>
   </Drawer.Navigator>
  ) 
}

const Drawer = createDrawerNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Strona główna" component={HomeScreen} options={{
        headerStyle: {
          backgroundColor: '#8aa29e',
        },
        headerTintColor: '#f1edee',
        headerTitle: 'Strona główna',
        headerTitleStyle: {
          fontSize: 24,
        },
        tabBarStyle: { backgroundColor: '#8aa29e' },
        tabBarInactiveTintColor: "#686963",
        tabBarActiveTintColor: "#f1edee",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="home" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Profil" component={ProfileDrawer} options={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#8aa29e',
        },
        headerTintColor: '#f1edee',
        headerTitle: 'Profil',
        headerTitleStyle: {
          fontSize: 24,
        },
        tabBarStyle: { backgroundColor: '#8aa29e' },
        tabBarInactiveTintColor: "#686963",
        tabBarActiveTintColor: "#f1edee",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="account-circle" color={color} size={size} />
        ),
      }} />

    </Tab.Navigator>
  );
}

const Stacks = createStackNavigator();


const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stacks.Navigator>
          <Stacks.Screen name="Login" component={LoginScreen} options={{ headerLeft: () => null, headerShown: false }} />
          <Stacks.Screen name="Home" component={MyTabs} options={{ headerLeft: () => null, headerShown: false }} />
          <Stacks.Screen name="LearnHome" component={LearnHome} options={{headerStyle: {backgroundColor: '#8aa29e',},
            headerTintColor: '#f1edee',
            headerTitle: 'Tryby nauki',
            headerTitleStyle: {
              fontSize: 24,
            },
          }}>
          </Stacks.Screen>
          <Stacks.Screen name="CreateNewSetScreen" component={CreateNewSetScreen} options = {{headerShown:true,
          headerStyle: {
            backgroundColor: '#8aa29e',
          },
          headerTintColor: '#f1edee',
          headerTitle: 'Tworzenie zestawu',
          headerTitleStyle: {
            fontSize: 24,
          }
          }} />
          <Stacks.Screen name="ChangeSettings" component={ChangeSettingsScreen} options = {{headerShown:true,headerStyle: {
          backgroundColor: '#8aa29e',
          },
          headerTintColor: '#f1edee',
          headerTitle: 'Zmiana ustawień',
          headerTitleStyle: {
            fontSize: 24,
          }
          }}>
          </Stacks.Screen>
          <Stacks.Screen name="Fiszki" component={Fiszki} options={{
            headerStyle: {
              backgroundColor: '#8aa29e',
            },
            headerTintColor: '#f1edee',
            headerTitle: 'Fiszki',
            headerTitleStyle: {
              fontSize: 24,
            },
          }}>
          </Stacks.Screen>
            <Stacks.Screen name="Ucz" component={Ucz} options={{
            headerStyle: {
              backgroundColor: '#8aa29e',
            },
            headerTintColor: '#f1edee',
            headerTitle: 'Ucz się',
            headerTitleStyle: {
              fontSize: 24,
            },
          }}>
          </Stacks.Screen>
          
          <Stacks.Screen name="Dopasowania" component={Dopasowania} options={{
            headerStyle: {
              backgroundColor: '#8aa29e',
            },
            headerTintColor: '#f1edee',
            headerTitle: 'Dopasowania',
            headerTitleStyle: {
              fontSize: 24,
            },
          }}>
           </Stacks.Screen> 
          <Stacks.Screen name="NotatkiPrzegladanie" component={NotatkiPrzegladanie} options = {{headerShown:true,headerStyle: {
          backgroundColor: '#8aa29e',
          },
          headerTintColor: '#f1edee',
          headerTitle: 'Przeglądaj Notatki',
          headerTitleStyle: {
            fontSize: 24,
          }
          }}>
          </Stacks.Screen>
          <Stacks.Screen name="NotatkiDodawanie" component={NotatkiDodawanie} options = {{headerShown:true,headerStyle: {
          backgroundColor: '#8aa29e',
          },
          headerTintColor: '#f1edee',
          headerTitle: 'Dodaj Notatki',
          headerTitleStyle: {
            fontSize: 24,
          }
          }}>
          </Stacks.Screen>
          <Stacks.Screen name="Test" component={Test} options = {{headerShown:true,headerStyle: {
          backgroundColor: '#8aa29e',
          },
          headerTintColor: '#f1edee',
          headerTitle: 'Test',
          headerTitleStyle: {
            fontSize: 24,
          }
          }}>
          </Stacks.Screen>
        </Stacks.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
export default App;