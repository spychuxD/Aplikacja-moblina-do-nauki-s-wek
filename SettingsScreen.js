import React, { useState} from 'react';
import { Box, FlatList, Button,Icon, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider } from "native-base";
import { MaterialIcons,Entypo,AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { auth } from './firebase';
import { useNavigation } from '@react-navigation/core';
import Dialog from "react-native-dialog";

const Settings = () => {

  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const handlePress = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = (value) => {
    setPassword(value);
    setVisible(false);
    auth.
    signInWithEmailAndPassword(auth.currentUser?.email,password)
    .then(()=> {
      navigation.navigate("ChangeSettings")
    })
    .catch(error => alert(error.message))
  };
  
      const okLogout=()=>{
        auth
          .signOut()
          .then(() => {
            navigation.replace("Login")
          })
          .catch(error => alert(error.message))
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
                onPress: () => {okLogout()} ,
                
            }
    
        ]
    );
    
  return <Box backgroundColor="#02020B" h="100%">
    <VStack space={3} backgroundColor="#02020B" alignItems="center" justifyContent="center" w="100%" h="100%">
    <Text w={{base: '61%'}} marginBottom="-4" fontSize="26px" color="#f1edee" fontWeight="hairline" textAlign="center">
    Nazwa Użytkownika
    </Text>
    <Text w={{base: '61%'}} marginBottom="1" fontSize="20px" color="#4CA7DE" bold textAlign="center">
    {auth.currentUser?.email}
    </Text>
    <Button backgroundColor="#8aa29e" onPress = {handlePress} >
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
    <Dialog.Container visible={visible}>
        <Dialog.Title>Aby zmienić ustawienia podaj aktualne hasło</Dialog.Title>
        <Dialog.Input placeholder="Twoje aktualne hasło" onChangeText={setPassword}/>
        <Dialog.Button label="Anuluj" onPress={handleCancel} />
        <Dialog.Button label="Zatwierdź" onPress={handleSubmit} />
    </Dialog.Container>
    </VStack>
  </Box>

      };


export default Settings;
