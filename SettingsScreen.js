import React from 'react';
import { Box, FlatList, Button,Icon, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider } from "native-base";
import { MaterialIcons,Entypo,AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { auth } from './firebase';
import { useNavigation } from '@react-navigation/core';


const Settings = (props) => {
  const navigation = useNavigation();
      const okLogout=(props)=>{
        auth
          .signOut()
          .then(() => {
            navigation.replace("Login")
          })
          .catch(error => alert(error.message))
      }
      const changeSettings=()=>{
        props.navigation.navigate('ChangeSettings');
      }
    const Logout = () =>
    Alert.alert(
        "Wylogowanie",
        "Czy na pewno chcesz sie wylogować?",
        [
            {
                text:"Nie",
                style: "cancel",
    
            },
            {
                text:"Tak",
                onPress: () => {okLogout(props)} ,
                
            }
    
        ]
    );
  return <Box backgroundColor="#02020B" h="100%">
    <VStack space={3} backgroundColor="#02020B" alignItems="center" justifyContent="center" w="100%" h="100%">
    <Text w={{base: '61%'}} marginBottom="-4" fontSize="26px" color="#f1edee" italic textAlign="center">
    Nazwa Użytkownika
    </Text>
    <Text w={{base: '61%'}} marginBottom="1" fontSize="20px" color="#4CA7DE" bold textAlign="center">
    admin
    </Text>
    <Text w={{base: '61%'}} marginBottom="-4" fontSize="26px" color="#f1edee" italic textAlign="center">
    Adres e-mail
    </Text>
    <Text w={{base: '61%'}} marginBottom="1" fontSize="20px" color="#4CA7DE" bold textAlign="center">
    admin@tu.kielce.pl
    </Text>
    <Text w={{base: '61%'}} marginBottom="-4" fontSize="26px" color="#f1edee" italic textAlign="center">
    Hasło
    </Text>
    <Text w={{base: '61%'}} marginBottom="1" fontSize="20px" color="#4CA7DE" bold textAlign="center">
    gbs
    </Text>
    <Text w={{base: '61%'}} marginBottom="-4" fontSize="26px" color="#f1edee" italic textAlign="center">
    Data Urodzenia
    </Text>
    <Text w={{base: '61%'}} marginBottom="20" fontSize="20px" color="#4CA7DE" bold textAlign="center">
    24.06.2001
    </Text>
    <Button backgroundColor="#8aa29e" onPress = {changeSettings}  >
      <HStack>
        <Icon as={<MaterialIcons name="system-update-alt" />} m="1" size={50} color="#f1edee" />
        <Text w={{base: '70%'}} m="3" fontSize="26px" color="#f1edee" bold>
            Zmień ustawienia
        </Text>
      </HStack>
    </Button>
    <Button backgroundColor="#8aa29e" onPress = {Logout}  >
      <HStack>
        <Icon as={<MaterialIcons name="logout" />} m="1" size={50} color="#f1edee" />
        <Text w={{base: '70%'}} m="3" fontSize="26px" color="#f1edee" bold>
            Wyloguj
        </Text>
      </HStack>
    </Button>
    </VStack>
  </Box>

}

export default Settings;
