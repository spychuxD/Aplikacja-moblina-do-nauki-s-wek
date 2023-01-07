import React, { useState } from 'react';
import { Box, FlatList, Button, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider,Stack,Input,Icon, ScrollView } from "native-base";
import { MaterialIcons,Ionicons } from '@expo/vector-icons';


const CreateNewSetScreen = () => {
  const [numInputs, setNumInputs] = useState(2);
  
  return (
    <Stack  space={4} backgroundColor="#02020B" alignItems="center" justifyContent="center" w="100%" h="100%">
      <Input
        w={{
          base: '75%',
          md: '25%',
        }}
        marginBottom="10"
        marginTop="5"
        placeholder="Nazwa zestawu"
        borderColor="#8aa29e"
        backgroundColor="#f1edee"
        color="#686963"
      />
      <ScrollView w="100%" >
      {[...Array(numInputs)].map((_, i) => (
        <VStack alignItems="center" justifyContent="center" key={i}>
          <Input
             w={{
              base: '75%',
              md: '25%',
            }}
            marginBottom="3"
            marginTop="7"
            placeholder={`Pojęcie ${i + 1}`}
            borderColor="#8aa29e"
            backgroundColor="#f1edee"
            color="#686963"
          />
          <Input
             w={{
              base: '75%',
              md: '25%',
            }}
            placeholder={`Definicja ${i + 1}`}
            borderColor="#8aa29e"
            backgroundColor="#f1edee"
            color="#686963"
          />
        </VStack>
      ))}
      <VStack alignItems="center">
      <Button w="30%" marginTop="4" onPress={() => setNumInputs(numInputs + 1)} backgroundColor="#8aa29e">
          <Icon as={<Ionicons name="add" />} m="1" size={50} color="#f1edee" />
      </Button>
      </VStack>
      </ScrollView>
      <Button backgroundColor="#8aa29e">
        <HStack>
          <Icon as={<Ionicons name="create" />} m="1" size={50} color="#f1edee" />
          <Text w={{base: '70%'}} m="3" fontSize="26px" color="#f1edee" bold>
            Utwórz zestaw
          </Text>
        </HStack>
      </Button>
      
    </Stack>
  );
}

export default CreateNewSetScreen;
