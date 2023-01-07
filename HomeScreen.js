import React, { useEffect, useState } from 'react';
import { Box, FlatList, Button, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { auth, db } from './firebase';
import { querySnapshot } from 'firebase/firestore';

const HomeScreen = () => {
  

  const[users, setUsers] =useState([]);
  const todoRef = db.collection('zestawy');
  const navigation = useNavigation();
  const startLearning=()=>{
    navigation.navigate('LearnHome');
  }
  const createNewSet=()=>{
    navigation.navigate('CreateNewSetScreen');
  }
  useEffect(() => {
    const unsubscribe = todoRef
    .onSnapshot(
      querySnapshot => {
        const users = []
        querySnapshot.forEach((doc)=>{
          const{id,nazwa,email}=doc.data()
          if(auth.currentUser?.email === doc.data().email)
          {
            users.push({
              id: doc.id,
              id,
              nazwa,
              email,
            })
          }
        })
        setUsers(users)
      }
    )
    return () => unsubscribe();
  },[])
  return <Box backgroundColor="#02020b" h="100%">
    <Box alignItems="center" justifyContent="center">
    <Button onPress={createNewSet}
          w={{
            base: '55%',
            md: '25%',
          }}
          backgroundColor="#8aa29e"
          color="#f1edee"
          marginTop={5}
          marginBottom={5}
          > Utwórz nowy zestaw</Button>
          </Box>
    <FlatList data={users} renderItem={({item}) => <Box  borderBottomWidth="1" borderColor="#8aa29e" pl={["4", "4"]} pr={["5", "5"]} py="5">
        <Button justifyContent='flex-start' backgroundColor="#8aa29e" onPress={startLearning}>
          <VStack>
            <Text fontSize="26px" color="#f1edee" bold>
              {item.nazwa}
            </Text>
            <Text fontSize="14px" color="#686963">
               pojęć
            </Text>
            <HStack>
              <Avatar margin="3" size="30px" source={{
                
              }} />
              <Text fontSize="16px" p="3" color="#686963">
                {item.email}
              </Text>
            </HStack>
          </VStack>
        </Button>
      </Box>} keyExtractor={item => item.id} />
  </Box>;
};

export default HomeScreen;
