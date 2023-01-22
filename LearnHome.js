import React, { useState, useCallback } from 'react';
import { Button, Icon, HStack, VStack, Text} from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute,  } from '@react-navigation/core';

const LearnHome = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const itemid = route.params.nazwa;
  

  const startUcz=()=>{
    navigation.navigate('Ucz');
  }

  return <VStack space={4} backgroundColor="#02020B" alignItems="center" justifyContent="center" w="100%" h="100%">
    <Text fontSize="26px" color="#f1edee" paddingBottom={10} bold>
      {itemid} 
    </Text>
    <Button backgroundColor="#8aa29e" onPress={()=>navigation.navigate('Fiszki', {nazwa: itemid})}>
      <HStack>
        <Icon as={<MaterialIcons name="filter-none" />} m="1" size={16} color="#f1edee" />
        <Text w={{base: '61%'}} m="3" fontSize="26px" color="#f1edee" bold>
           Fiszki 
        </Text>
      </HStack>
    </Button>
    <Button backgroundColor="#8aa29e" onPress={startUcz}>
      <HStack>
        <Icon as={<MaterialIcons name="face-retouching-natural" />} m="1" size={16} color="#f1edee" />
        <Text w={{base: '61%'}} m="3" fontSize="26px" color="#f1edee" bold>
            Ucz się
        </Text>
      </HStack>
    </Button>
    <Button backgroundColor="#8aa29e" >
      <HStack>
        <Icon as={<MaterialIcons name="assignment" />} m="1" size={16} color="#f1edee" />
        <Text w={{base: '61%'}} m="3" fontSize="26px" color="#f1edee" bold>
            Test
        </Text>
      </HStack>
    </Button>
    <Button backgroundColor="#8aa29e" onPress={()=>navigation.navigate('DopasowaniaStart', {nazwa: itemid})}>
      <HStack>
        <Icon as={<MaterialIcons name="extension" />} m="1" size={16} color="#f1edee" />
        <Text w={{base: '61%'}} m="3" fontSize="26px" color="#f1edee" bold>
            Dopasowania
        </Text>
      </HStack>
    </Button>
    <Button backgroundColor="#8aa29e" onPress={()=>navigation.navigate('Notatki', {nazwa: itemid})} >
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
