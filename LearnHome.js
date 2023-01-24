import React, { useState, useCallback } from 'react';
import { Button, Icon, HStack, VStack, Text} from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute,  } from '@react-navigation/core';

const LearnHome = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const itemid = route.params.nazwa;
  const size = route.params.size;
  

  const startUcz=()=>{
    navigation.navigate('Ucz');
  }

  return <VStack space={4} backgroundColor="#686963" alignItems="center" justifyContent="center" w="100%" h="100%">
    <Text fontSize="26px" paddingBottom={10} style={{ textShadowColor: 'black', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3, color:"#f1edee", fontSize:26, fontWeight:"bold"}}>
      {itemid} 
    </Text>
    <Button style={{ shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
     backgroundColor="#8aa29e" onPress={()=>navigation.navigate('Fiszki', {nazwa: itemid})}>
      <HStack>
        <Icon as={<MaterialIcons name="filter-none" />} m="1" size={16} color="#f1edee" />
        <Text w={{base: '61%'}} m="3" fontSize="26px" color="#f1edee" bold>
           Fiszki 
        </Text>
      </HStack>
    </Button>
    <Button style={{ shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
     backgroundColor="#8aa29e" onPress={()=>navigation.navigate('Ucz', {nazwa: itemid})}>
      <HStack>
        <Icon as={<MaterialIcons name="face-retouching-natural" />} m="1" size={16} color="#f1edee" />
        <Text w={{base: '61%'}} m="3" fontSize="26px" color="#f1edee" bold>
            Ucz się
        </Text>
      </HStack>
    </Button>
    <Button style={{ shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
     backgroundColor="#8aa29e" >
      <HStack>
        <Icon as={<MaterialIcons name="assignment" />} m="1" size={16} color="#f1edee" />
        <Text w={{base: '61%'}} m="3" fontSize="26px" color="#f1edee" bold>
            Test
        </Text>
      </HStack>
    </Button>
    <Button style={{ shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
    backgroundColor="#8aa29e" onPress={()=>navigation.navigate('DopasowaniaStart', {nazwa: itemid, size: size})}>
      <HStack>
        <Icon as={<MaterialIcons name="extension" />} m="1" size={16} color="#f1edee" />
        <Text w={{base: '61%'}} m="3" fontSize="26px" color="#f1edee" bold>
            Dopasowania
        </Text>
      </HStack>
    </Button>
    <Button style={{ shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
    backgroundColor="#8aa29e" onPress={()=>navigation.navigate('NotatkiPrzegladanie', {nazwa: itemid})} >
      <HStack>
        <Icon as={<MaterialIcons name="sticky-note-2" />}m="1" size={16} color="#f1edee" />
        <Text w={{base: '61%'}} m="3" fontSize="26px" color="#f1edee" bold>
            Notatki
        </Text>
      </HStack>
    </Button>
    </VStack>
};

export default LearnHome;
