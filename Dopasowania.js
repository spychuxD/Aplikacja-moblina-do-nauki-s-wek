import React, { useState, useEffect } from 'react';
import { SafeAreaView, Alert } from "react-native";
import { Button, View, HStack, VStack, Text } from "native-base";
import { auth, db } from './firebase';
import { useNavigation, useRoute } from '@react-navigation/core';


const Dopasowania = () => {
  const [definitions, setDefinitions] = useState([{}]);
  const route = useRoute();
  const name = route.params.nazwa;
  const size = route.params.size;
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [shuffleNumbers, setShuffleNumbers] = useState([]);
  const navigation = useNavigation();

  const uid = auth.currentUser?.uid;

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let newRandomNumbers = [];
    while (newRandomNumbers.length < 6) {
      let random = Math.floor(Math.random() * (size)) + 0;
      if (!newRandomNumbers.includes(random)) {
        newRandomNumbers.push(random);
      }
    }
    setRandomNumbers(newRandomNumbers);
    let shuffleNumber = [...newRandomNumbers];
    shuffleNumber.sort(() => Math.random() - 0.5);
    setShuffleNumbers(shuffleNumber);

    db.collection('users').doc(uid).collection('zestawy').doc(uid + name).get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data().definitions;
          setDefinitions(data);
        } else {
          console.log("No such document!")
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const [visibleC, setVisibleC] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const [visibleD, setVisibleD] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const [buttonsPressed, setButtonsPressed] = useState([]);
  const [indexButtonsConceptPressed, setIndexButtonsConceptPressed] = useState();
  const [indexButtonsDefinitionPressed, setIndexButtonsDefinitionPressed] = useState();
  const [count, setCount] = useState(0);

  const check = (buttonsPressed, indexButtonsConceptPressed, indexButtonsDefinitionPressed) => {
    if (buttonsPressed.length == 2) {
      if (buttonsPressed[0] === buttonsPressed[1]) {
        setCount(count + 1);
        setSave(false);
        setSave2(false);
      }
      else {
        setVisibleC({ ...visibleC, [indexButtonsConceptPressed]: false });
        setVisibleD({ ...visibleD, [indexButtonsDefinitionPressed]: false });
        setSave(false);
        setSave2(false);
      }
      setButtonsPressed([]);
    }
  }

  const [save, setSave] = useState(false);
  const [save2, setSave2] = useState(false);

  const add = (index, number, which) => {
    if (which == 0 && !save) {
      setVisibleC({ ...visibleC, [index]: true });
      setButtonsPressed([...buttonsPressed, number]);
      setIndexButtonsConceptPressed(index);
      setSave(true);
    }
    else if (which == 1 && !save2) {
      setVisibleD({ ...visibleD, [index]: true });
      setButtonsPressed([...buttonsPressed, number]);
      setIndexButtonsDefinitionPressed(index);
      setSave2(true);
    }
  }
  useEffect(() => {
    if (buttonsPressed.length === 2) {
      check(buttonsPressed, indexButtonsConceptPressed, indexButtonsDefinitionPressed);
    }
  }, [buttonsPressed]);

  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(null);


  const handleStartPress = () => {
    setIsRunning(true);
    setStartTime(new Date());
  };

  useEffect(() => {
    if (count == 6) {
      setIsRunning(false);
      setElapsedTime(new Date() - startTime);
    }
  }, [count]);

  useEffect(() => {
    if (elapsedTime != 0) {
      Alert.alert(
        "GRATULACJE!",
        `Twój czas: ${elapsedTime / 1000}s`,
        [{ text: "OK", onPress: () => { navigation.goBack() } }]
      );
    }
  }, [elapsedTime]);



  return (
    <SafeAreaView >{isRunning == true ? (
      <HStack space={10} backgroundColor="#686963" alignItems="center" justifyContent="center" w="100%" h="100%">
        <VStack >
          {randomNumbers.map((number, index) => (
            <Button style={{ shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
              backgroundColor="#8aa29e" key={index} margin="2" size="100" isDisabled={visibleC[index]} onPress={() => add(index, number, 0)}>
              {definitions[number].concept}
            </Button>
          ))}
        </VStack>
        <VStack >
          {shuffleNumbers.map((number, index) => (
            <Button style={{ shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
              backgroundColor="#8aa29e" key={index} margin="2" size="100" isDisabled={visibleD[index]} onPress={() => add(index, number, 1)}>
              {definitions[number].definition}
            </Button>
          ))}
        </VStack>
      </HStack>
    ) : (
      <View backgroundColor="#686963" alignItems="center" justifyContent="center" w="100%" h="100%">
        <Text fontSize="30px" color="#f1edee" bold>
          Gotowy?
        </Text>
        <Text fontSize="24px" color="#f1edee">
          Dopasuj wszystkie pojęcia
        </Text>
        <Text fontSize="24px" color="#f1edee">
          do definicji
        </Text>
        <Button marginTop="5" width="80%" onPress={() => handleStartPress()}>
          <Text fontSize="30px" color="#f1edee" bold>
            START
          </Text>
        </Button>
      </View>
    )}
    </SafeAreaView>
  )
};

export default Dopasowania;