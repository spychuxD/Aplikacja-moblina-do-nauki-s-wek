import React from 'react';
import { Box, FlatList, Button,Icon, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider, Input } from "native-base";
import { MaterialIcons,Entypo,AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';



const ChangeSettings = (props) => {
    const ok=(props)=>{
        props.navigation.navigate('Home');
      }
    const Acceptation = () =>
    Alert.alert(
        "Zmiana danych",
        "Czy na pewno chcesz zatwierdzić wprowadzone zmiany?",
        [
            {
                text:"Nie",
                style: "cancel",
    
            },
            {
                text:"Tak",
                onPress: () => {ok(props)} ,
                
            }
    
        ]
    );
  return <Box backgroundColor="#02020B" h="100%">
    <VStack space={3} backgroundColor="#02020B" alignItems="center" justifyContent="center" w="100%" h="100%">
    <Text w={{base: '61%'}} marginBottom="-4" fontSize="26px" color="#f1edee" italic textAlign="center">
    Nazwa Użytkownika
    </Text>
    <Input w={{base: '61%'}} marginBottom="1" fontSize="20px" color="#4CA7DE" bold textAlign="center">
    admin
    </Input>
    <Text w={{base: '61%'}} marginBottom="-4" fontSize="26px" color="#f1edee" italic textAlign="center">
    Adres e-mail
    </Text>
    <Input w={{base: '61%'}} marginBottom="1" fontSize="20px" color="#4CA7DE" bold textAlign="center">
    admin@tu.kielce.pl
    </Input>
    <Text w={{base: '61%'}} marginBottom="-4" fontSize="26px" color="#f1edee" italic textAlign="center">
    Hasło
    </Text>
    <Input w={{base: '61%'}} marginBottom="1" fontSize="20px" color="#4CA7DE" bold textAlign="center">
    gbs
    </Input>
    <Text w={{base: '61%'}} marginBottom="-4" fontSize="26px" color="#f1edee" italic textAlign="center">
    Data Urodzenia
    </Text>
    <Input w={{base: '61%'}} marginBottom="1" fontSize="20px" color="#4CA7DE" bold textAlign="center">
    24.06.2001
    </Input>
    <Button backgroundColor="#8aa29e" marginTop="5" onPress={Acceptation}>
      <HStack>
        <Icon as={<AntDesign name="check" />} marginRight="2" size={44} color="#f1edee"/>
        <Text w={{base: '72%'}} textAlign="center" fontSize="26px" color="#f1edee" bold>
            Zatwierdź zmiany
        </Text>
      </HStack>
    </Button>
    </VStack>
  </Box>

}

export default ChangeSettings;
