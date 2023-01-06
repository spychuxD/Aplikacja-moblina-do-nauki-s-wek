import React, { useEffect, useState } from 'react';
import { Box, FlatList, Button, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { db } from './firebase';
import { querySnapshot } from 'firebase/firestore';
const HomeScreen = () => {
  const[users, setUsers] =useState([]);
  const todoRef = db.firestore().collection('zestawy');
  const navigation = useNavigation();
  const startLearning=()=>{
    navigation.navigate('LearnHome');
  }
  const createNewSet=()=>{
    navigation.navigate('CreateNewSetScreen');
  }
  useEffect(async() => {
    todoRef
    .onSnapshot(
      querySnapshot => {
        const users = []
        querySnapshot.forEach((doc)=>{
          const{id,email,numerConcepts,setName,avatarUrl}=doc.data()
          users.push({
            id: doc.id,
            id,
            email,
            numerConcepts,
            setName,
            avatarUrl,
          })
        })
        setUsers(users)
      }
    )
  },[])
  return <Box backgroundColor="#02020b" h="100%">
    <Button onPress={createNewSet}> Utwórz nowy zestaw</Button>
    <FlatList data={users} renderItem={({item}) => <Box  borderBottomWidth="1" borderColor="#8aa29e" pl={["4", "4"]} pr={["5", "5"]} py="5">
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
