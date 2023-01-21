import React, { useState} from 'react';
import { Box, FlatList, Button,Icon, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider, Input } from "native-base";
import { MaterialIcons,Entypo,AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth } from './firebase';
import Dialog from "react-native-dialog";

const ChangeSettings = () => {

  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const handlePress = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
    const okPassword=()=>{
        changePassword();
      }
      const okMail=()=>{
        handlePress();
      }
     const confirmPassword = () => {
      Alert.alert(
        "Zmiana hasła",
        "Czy na pewno chcesz hasło?",
        [
            {
                text:"Nie",
                style: "cancel",
    
            },
            {
                text:"Tak",
                onPress: () => {okPassword()} ,
                
            }
    
        ]
    );
      }
      const confirmMail = () => {
        Alert.alert(
          "Zmiana adresu e-mail",
          "Czy na pewno chcesz zmienić e-mail?",
          [
              {
                  text:"Nie",
                  style: "cancel",
      
              },
              {
                  text:"Tak",
                  onPress: () => {okMail()} ,
                  
              }
      
          ]
      );
        }
    const changePassword = () => {
      auth.sendPasswordResetEmail(auth.currentUser.email)
      .then(()=> {
        Alert.alert(
          "Sukces!",
          `Wysłano link o zmiane hasła na ${auth.currentUser.email}`,
          [
            {
                text:"OK",
                style: "cancel",
    
            },
        ]
    );
      }).catch((error) => {
        alert(error)
      })
    }
    const changeMail= (value) => {
      
      setEmail(value);
      setVisible(false);
      auth.currentUser.updateEmail(email)
      .then(()=>{
        Alert.alert(
          "Sukces!",
          `Zmieniono na nowy adres email: ${email}
          Zaloguj się ponownie`,
          [
            {
                text:"OK",
                style: "cancel",
                onPress: () => {auth
                  .signOut()
                  .then(() => {
                    navigation.replace("Login")
                  })
                  .catch(error => alert(error.message))} ,
    
            },
        ]
    );
      })
      .catch(error => alert(error.message))
    }
  return <Box backgroundColor="#02020B" h="100%">
    <VStack space={3} backgroundColor="#02020B" alignItems="center" justifyContent="center" w="100%" h="100%">
    <Button backgroundColor="#8aa29e" marginTop="5" onPress={confirmMail}>
      <HStack>
        <Icon as={<Entypo name="email" />} marginRight="2" size={44} color="#f1edee"/>
        <Text w={{base: '72%'}} textAlign="center" fontSize="26px" color="#f1edee" bold>
            Zmiana e-mail
        </Text>
      </HStack>
    </Button>
    <Button backgroundColor="#8aa29e" marginTop="5" onPress={confirmPassword}>
      <HStack>
        <Icon as={<MaterialIcons name="vpn-key" />} marginRight="2" size={44} color="#f1edee"/>
        <Text w={{base: '72%'}} textAlign="center" fontSize="26px" color="#f1edee" bold>
            Zmiana hasla
        </Text>
      </HStack>
    </Button>
    <Dialog.Container visible={visible}>
        <Dialog.Title>Podaj nowy adres e-mail</Dialog.Title>
        <Dialog.Input placeholder="Adres e-mail" onChangeText={setEmail}/>
        <Dialog.Button label="Anuluj" onPress={handleCancel} />
        <Dialog.Button label="Zatwierdź" onPress={changeMail} />
    </Dialog.Container>
    </VStack>
  </Box>

}

export default ChangeSettings;
