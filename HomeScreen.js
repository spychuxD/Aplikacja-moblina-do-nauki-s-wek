import React, { useCallback, useEffect, useState } from 'react';
import { Box, FlatList, Button, VStack, Text } from "native-base";
import { useNavigation } from '@react-navigation/core';
import { auth, db } from './firebase';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [documents, setDocuments] = useState([]);


  const createNewSet = () => {
    navigation.navigate('CreateNewSetScreen');
  }
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    db.collection('users').doc(uid).collection('zestawy').get()
      .then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data());
        setDocuments(documents);
      })
      .catch(error => {
        console.log(error);
      });
  }, [])
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
      > Utwórz nowy zestaw
      </Button>
    </Box>
    <FlatList data={documents} renderItem={({ item }) => <Box borderBottomWidth="1" borderColor="#8aa29e" pl={["4", "4"]} pr={["5", "5"]} py="5">
      <Button justifyContent='flex-start' backgroundColor="#8aa29e" onPress={() => navigation.navigate('LearnHome', {nazwa: item.name})}>
        <VStack>
          <Text fontSize="26px" color="#f1edee" bold>
            {item.name} 
          </Text>
          <Text fontSize="14px" color="#686963">
            Liczba pojęć: {item.count}
          </Text>
        </VStack>
      </Button>
    </Box>} keyExtractor={item => item.name} />
  </Box>;
};
export default HomeScreen;
