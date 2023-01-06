import React, { useState } from 'react';
import { Box, FlatList, Button, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';


const HomeScreen = (props) => {
  const data = [{
    id: "1",
    setName: "Zestaw 1",
    login: "admin",
    numerConcepts: "85",
    avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  }, {
    id: "2",
    setName: "Zestaw 2",
    login: "user1234",
    numerConcepts: "124",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
  }, {
    id: "3",
    setName: "Zestaw 3",
    login: "usertestXD",
    numerConcepts: "16",
    avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
  }, {
    id: "4",
    setName: "Zestaw 4",
    login: "gbsdobrzejest",
    numerConcepts: "231",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
  }, {
    id: "5",
    setName: "Zestaw 5",
    login: "test_user_test",
    numerConcepts: "2137",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
  }];
  const startLearning=()=>{
    props.navigation.navigate('LearnHome');
  }
  const createNewSet=()=>{
    props.navigation.navigate('CreateNewSetScreen');
  }
  return <Box backgroundColor="#02020b" h="100%">
    <Button onPress={createNewSet}> Utwórz nowy zestaw</Button>
    <FlatList data={data} renderItem={({item}) => <Box  borderBottomWidth="1" borderColor="#8aa29e" pl={["4", "4"]} pr={["5", "5"]} py="5">
        <Button justifyContent='flex-start' backgroundColor="#8aa29e" onPress={startLearning}>
          <VStack>
            <Text fontSize="26px" color="#f1edee" bold>
              {item.setName}
            </Text>
            <Text fontSize="14px" color="#686963">
              {item.numerConcepts} pojęć
            </Text>
            <HStack>
              <Avatar margin="3" size="30px" source={{
                uri: item.avatarUrl
              }} />
              <Text fontSize="16px" p="3" color="#686963">
                {item.login}
              </Text>
            </HStack>
          </VStack>
        </Button>
      </Box>} keyExtractor={item => item.id} />
  </Box>;
};

export default HomeScreen;
