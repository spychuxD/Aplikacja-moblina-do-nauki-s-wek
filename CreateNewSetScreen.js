import React, { useState, useEffect } from 'react';
import { Box, FlatList, Button, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider, Stack, Input, Icon, ScrollView } from "native-base";
import { Alert } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { auth, db } from './firebase';
import { addDoc, collection, querySnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/core';
const CreateNewSetScreen = () => {
  const [numInputs, setNumInputs] = useState(1);
  const [zestawNR, setZestawNR] = useState([]);
  const [max, setMax] = useState();
  const todoRef = db.collection('zestawy');

  const [inputConcept, setConcept] = useState([]);
  const [inputDefinition, setDefinition] = useState([]);
  const [ids, setIDS] = useState([]);
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const addSet = () => {
    if (name.length === 0) {
      Alert.alert(
        "Brak danych",
        "Należy podać nazwę zestawu",
        [{ text: "OK", }]
      );
    }
    else {

      for(let i = 0; i < numInputs; i++)
      {
        ids.push({i})
      }

      addDoc(collection(db, "zestawy"), {
        id: max,
        nazwa: name,
        email: auth.currentUser?.email,
      })
        .catch((error) => {
          console.log(error);
        })
        for (let i = 0; i < numInputs; i++) {
          addDoc(collection(db, "slowko"), {
            id_s: ids[i],
            pojecie: inputConcept[i],
            definicja: inputDefinition[i],
            id_z: max,
          })
          .catch((error) => {
            console.log(error);
          })
        }
      navigation.replace('Home');
    }
  }

  useEffect(() => {
    const unsubscribe = todoRef
      .onSnapshot(
        querySnapshot => {
          const zestawNR = []
          querySnapshot.forEach((doc) => {
            const { id } = doc.data()
            zestawNR.push({
              id,
            })
          })
          if (zestawNR.length) {
            zestawNR.sort(function (a, b) { return Number(b.id) - Number(a.id) });
            setZestawNR(zestawNR)
            setMax(zestawNR[0].id + 1) //3,1,2
          }
          else {
            setMax(0)
          }

        })

    return () => unsubscribe();


  }, [])
  return (
    <Stack space={4} backgroundColor="#02020B" alignItems="center" justifyContent="center" w="100%" h="100%">
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
        onChangeText={(text) => { setName(text) }}
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
              onChangeText={(text) => {setConcept(text)}}

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
              onChangeText={(text) => {setDefinition(text)}}

            />
          </VStack>
        ))}
        <VStack alignItems="center">
          <Button w="30%" marginTop="4" onPress={() => setNumInputs(numInputs + 1)} backgroundColor="#8aa29e">
            <Icon as={<Ionicons name="add" />} m="1" size={50} color="#f1edee" />
          </Button>
        </VStack>
      </ScrollView>
      <Button backgroundColor="#8aa29e" onPress={() => addSet()}>
        <HStack>
          <Icon as={<Ionicons name="create" />} m="1" size={50} color="#f1edee" />
          <Text w={{ base: '70%' }} m="3" fontSize="26px" color="#f1edee" bold>
            Utwórz zestaw
          </Text>
        </HStack>
      </Button>

    </Stack>
  );
}

export default CreateNewSetScreen;
