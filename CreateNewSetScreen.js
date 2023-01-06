import React, { useState } from 'react';
import { Box, FlatList, Button, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider,Stack,Input,Icon } from "native-base";
import { MaterialIcons,Ionicons } from '@expo/vector-icons';


const CreateNewSetScreen = (props) => {
    return (

        <Stack space={4} backgroundColor="#02020B" alignItems="center" justifyContent="center" w="100%" h="100%">
        <Input
          w={{
            base: '75%',
            md: '25%',
          }}
          marginBottom="10"
          placeholder="Nazwa zestawu"
          borderColor="#8aa29e"
          backgroundColor="#f1edee"
          color="#686963"
        />
        <Input
          w={{
            base: '75%',
            md: '25%',
          }}
          placeholder="Pojęcie"
          borderColor="#8aa29e"
          backgroundColor="#f1edee"
          color="#686963"
        />
        <Input
          w={{
            base: '75%',
            md: '25%',
          }}
          marginBottom="10"
          placeholder="Definicja"
          borderColor="#8aa29e"
          backgroundColor="#f1edee"
          color="#686963"
        />
        <Input
          w={{
            base: '75%',
            md: '25%',
          }}
          placeholder="Pojęcie"
          borderColor="#8aa29e"
          backgroundColor="#f1edee"
          color="#686963"
        />
        <Input
          w={{
            base: '75%',
            md: '25%',
          }}
          marginBottom="10"
          placeholder="Definicja"
          borderColor="#8aa29e"
          backgroundColor="#f1edee"
          color="#686963"
        />
        <Input
          w={{
            base: '75%',
            md: '25%',
          }}
          placeholder="Pojęcie"
          borderColor="#8aa29e"
          backgroundColor="#f1edee"
          color="#686963"
        />
        <Input
          w={{
            base: '75%',
            md: '25%',
          }}
          marginBottom="10"
          placeholder="Definicja"
          borderColor="#8aa29e"
          backgroundColor="#f1edee"
          color="#686963"
        />
        <Button backgroundColor="#8aa29e">
      <HStack>
        <Icon as={<Ionicons name="create" />} m="1" size={50} color="#f1edee" />
        <Text w={{base: '70%'}} m="3" fontSize="26px" color="#f1edee" bold>
            Utwórz zestaw
        </Text>
      </HStack>
    </Button>
    </Stack>
    )

}

export default CreateNewSetScreen;
