import React, { useState } from 'react';
import { Button, HStack, VStack, Text, Stack, Input, Icon, ScrollView } from "native-base";
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from './firebase';
import { useNavigation } from '@react-navigation/core';
const CreateNewSetScreen = () => {
  const [nameSet, setName] = useState('');
  const navigation = useNavigation();

  const [arrayList, setArrayList] = useState([
    {
      definition: '',
      concept: '',
      isLearn: false,
    }
  ]);
  const [tmp, setTmp] = useState(1);
  const addSet = async () => {
    if (nameSet.length === 0) {
      Alert.alert(
        "Brak danych",
        "Należy podać nazwę zestawu",
        [{ text: "OK", }]
      );
    }
    else {
      const uid = auth.currentUser?.uid;
      const allSets = await db.collection('users').doc(uid).collection('zestawy').doc(uid + nameSet).get();
      if (allSets.exists) {
        Alert.alert(
          "Niepoprawna nazwa zestawu",
          "Istnieje zewstaw o podanej nazwie",
          [{ text: "OK", }]
        );
      }
      else {
        db.collection('users').doc(uid).collection('zestawy').doc(uid + nameSet).set({});
        
        await db.collection('users').doc(uid).collection('zestawy').doc(uid + nameSet).set({
          name: nameSet,
          definitions: arrayList,
          count: tmp,
        });
        navigation.replace("Home")
      }
    }
  }

  const addNewOne = () => {
    setTmp(tmp + 1);
    setArrayList([...arrayList, {
      definition: '',
      concept: '',
      isLearn: false,
    }])

  }

  const updateValueC = (text, i) => {
    setArrayList([...arrayList].map((el, j) => i === j ? { ...el, concept: text } : el));
  }

  const updateValueD = (text, i) => {
    setArrayList([...arrayList].map((el, j) => i === j ? { ...el, definition: text } : el));


  }
  return (
    <Stack space={4} backgroundColor="#686963" alignItems="center" justifyContent="center" w="100%" h="100%">
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
        {arrayList.map((item, i) =>
          <VStack alignItems="center" justifyContent="center" key={i}>
            <Input

              w={{
                base: '75%',
                md: '25%',
              }}
              value={item?.concept}
              marginBottom="3"
              marginTop="7"
              placeholder={`Pojęcie ${i + 1}`}
              borderColor="#8aa29e"
              backgroundColor="#f1edee"
              color="#686963"
              onChangeText={text => updateValueC(text, i)}
            />
            <Input
              w={{
                base: '75%',
                md: '25%',
              }}
              value={item?.definition}
              placeholder={`Definicja ${i + 1}`}
              borderColor="#8aa29e"
              backgroundColor="#f1edee"
              color="#686963"
              onChangeText={text => updateValueD(text, i)}
            />
          </VStack>)}
        <VStack alignItems="center">
          <Button w="30%" marginTop="4" onPress={addNewOne} backgroundColor="#8aa29e" borderRadius="30">
            <Icon as={<Ionicons name="add" />} m="1" size={50} color="#f1edee" />
          </Button>
        </VStack>
      </ScrollView>

      <Button style={{ shadowColor: 'black', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
        backgroundColor="#8aa29e" onPress={() => addSet()}>
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
