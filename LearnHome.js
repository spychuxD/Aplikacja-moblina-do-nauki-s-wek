import React, { useState } from 'react';
import { Box, FlatList, Button, Icon, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

const LearnHome = (props) => {
  const startFiszki=()=>{
    props.navigation.navigate('Fiszki');
  }
  const startUcz=()=>{
    props.navigation.navigate('Ucz');
  }
  const startDop=()=>{
    props.navigation.navigate('Dopasowania');
  }
  return <VStack space={4} backgroundColor="#02020B" alignItems="center" justifyContent="center" w="100%" h="100%">
    <Button backgroundColor="#8aa29e" onPress={startFiszki}>
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
    <Button backgroundColor="#8aa29e" onPress={startDop}>
      <HStack>
        <Icon as={<MaterialIcons name="extension" />} m="1" size={16} color="#f1edee" />
        <Text w={{base: '61%'}} m="3" fontSize="26px" color="#f1edee" bold>
            Dopasowania
        </Text>
      </HStack>
    </Button>
    <Button backgroundColor="#8aa29e" >
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
