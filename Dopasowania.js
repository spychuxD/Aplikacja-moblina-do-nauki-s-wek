import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native";
import { Box, Button, Icon, Progress, Avatar, View, HStack, VStack, Text, ScrollView, } from "native-base";
import { auth, db } from './firebase';
import { useNavigation, useRoute } from '@react-navigation/core';


const Dopasowania = () => {

  const uid = auth.currentUser?.uid;

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

  const check=(buttonsPressed,indexButtonsConceptPressed,indexButtonsDefinitionPressed)=>{
    if(buttonsPressed.length == 2)
    {
      if(buttonsPressed[0] === buttonsPressed[1])
      {
        console.log("YEAH");
        setCount(count+1);
      }
      else
      {
        console.log("NOPE");
        setVisibleC({...visibleC, [indexButtonsConceptPressed]: false});
        setVisibleD({...visibleD, [indexButtonsDefinitionPressed]: false});
      }
      setButtonsPressed([]);
    }
  }

  const add=(index,number,which)=>{
    console.log(index,number,which);
    if(which == 0)
    {
      setVisibleC({...visibleC, [index]: true});
      setButtonsPressed([...buttonsPressed, number]);
      setIndexButtonsConceptPressed(index);
    }
    else
    {
      setVisibleD({...visibleD, [index]: true});
      setButtonsPressed([...buttonsPressed, number]);
      setIndexButtonsDefinitionPressed(index);
    }
  }

  useEffect(() => {
    if(buttonsPressed.length === 2)
    {
      check(buttonsPressed,indexButtonsConceptPressed,indexButtonsDefinitionPressed);
    }
  }, [buttonsPressed]);

  useEffect(() => {
    if(count == 6)
    {
     {/*navigation.navigate("podsumowanie");*/}
     console.log("WIN!");
    }
  }, [count]);

  return (
    <SafeAreaView>{definitions.length > 5 ? (
      <HStack space={10} backgroundColor="#02020B" alignItems="center" justifyContent="center" w="100%" h="100%">
        <VStack >
          {randomNumbers.map((number, index) => (
            <Button key={index} margin="2" size="100" isDisabled={visibleC[index]} onPress={()=>add(index,number,0)}>
              {definitions[number].concept}
            </Button>
          ))}
        </VStack>
        <VStack >
          {shuffleNumbers.map((number, index) => (
            <Button key={index} margin="2" size="100" isDisabled={visibleD[index]} onPress={()=>add(index,number,1)}>
              {definitions[number].definition}
            </Button>
          ))}
        </VStack>
      </HStack>
    ) : (
      <Text>Loading...</Text>
    )}
    </SafeAreaView>
  )
};

export default Dopasowania;