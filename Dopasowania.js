import React, { useState, useEffect } from 'react';
import { Animated, PanResponder, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Box, Button, Icon, Progress, Avatar, View, HStack, VStack, Text, Input, Spacer, Center, NativeBaseProvider, Divider, ScrollView } from "native-base";
import { auth, db } from './firebase';
import { useNavigation, useRoute } from '@react-navigation/core';

const Dopasowania = () => {
  const [definitions, setDefinitions] = useState([{}]);
  const route = useRoute();
  const name = route.params.nazwa;
  const uid = auth.currentUser?.uid;
  const [randomNumbers, setRandomNumbers] = useState([0, 0, 0, 0, 0, 0]);
  const [shuffleNumbers, setShuffleNumbers] = useState([0, 0, 0, 0, 0, 0]);
  const [buttonsConceptVisible, setButtonsConceptVisible] = useState({
    0: 'none',
    1: 'none',
    2: 'none',
    3: 'none',
    4: 'none',
    5: 'none',
  });
  const [buttonsDefinitionVisible, setButtonsDefinitionVisible] = useState({
    0: 'none',
    1: 'none',
    2: 'none',
    3: 'none',
    4: 'none',
    5: 'none',
  });
  useEffect(() => {
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
  
  const start = () => {
    let newRandomNumbers = [];
    {/*randomNumbers.splice(0, randomNumbers.length);*/ }
    while (newRandomNumbers.length < 6) {
      let random = Math.floor(Math.random() * (definitions.length)) + 0;
      if (!newRandomNumbers.includes(random)) {
        newRandomNumbers.push(random);
      }
    }
    setRandomNumbers(newRandomNumbers);
    let shuffleNumbers = [...newRandomNumbers];
    shuffleNumbers.sort(() => Math.random() - 0.5);
    setShuffleNumbers(shuffleNumbers);
    setButtonsConceptVisible({
      0: 'flex',
      1: 'flex',
      2: 'flex',
      3: 'flex',
      4: 'flex',
      5: 'flex',
    });
    setButtonsDefinitionVisible({
      0: 'flex',
      1: 'flex',
      2: 'flex',
      3: 'flex',
      4: 'flex',
      5: 'flex',
    })
  };
  const [selectedButtons] = useState([]);
  const [conceptClicked, setConceptClicked] = useState(false);
  const [definitionClicked, setDefinitionClicked] = useState(false);
  const conceptButtonPress = (buttonId) => {
    if (!conceptClicked) {
      if(selectedButtons.length == 0)
      {
        selectedButtons[0]= buttonId;
        console.log(selectedButtons);
        setConceptClicked(true);
      }
      else if(selectedButtons.length == 1)
      {
        selectedButtons[1]= buttonId;
        console.log(selectedButtons);
        setConceptClicked(true);
      }
      if (selectedButtons.length == 2) {
        console.log("CHECKBUTTONS");
        checkButtons();

      }
    }
  };

  const definitionButtonPress = (buttonId) => {
    if (!definitionClicked) {
      if(selectedButtons.length == 0)
      {
        selectedButtons[0]= buttonId;
        console.log(selectedButtons);
        setDefinitionClicked(true);
      }
      else if(selectedButtons.length == 1)
      {
        selectedButtons[1]= buttonId;
        console.log(selectedButtons);
        setDefinitionClicked(true);
        
      }
      if (selectedButtons.length == 2) {
        console.log("CHECKBUTTONS");
        checkButtons();

      }
      
    }
  };

  const checkButtons = () => {
    if (randomNumbers[selectedButtons[0]] === shuffleNumbers[selectedButtons[1]]) {
      console.log("Buttons match!");
      setButtonsConceptVisible({ [selectedButtons[0]]: 'none' });
      setButtonsDefinitionVisible({ [selectedButtons[1]]: 'none' });
      selectedButtons.splice(0, selectedButtons.length);
    } else if (randomNumbers[selectedButtons[1]] === shuffleNumbers[selectedButtons[0]]) {
      setButtonsConceptVisible({ [selectedButtons[1]]: 'none' });
      setButtonsDefinitionVisible({ [selectedButtons[0]]: 'none' });
      selectedButtons.splice(0, selectedButtons.length);
    } else {
      console.log("Buttons do not match.");
      selectedButtons.splice(0, selectedButtons.length);
      // handle non-matching buttons logic
    }
    setConceptClicked(false);
    setDefinitionClicked(false);
  };

  return (
    <SafeAreaView>
      <Button onPress={() => start()}>
        START
      </Button>
      <VStack space={4} backgroundColor="#02020B" alignItems="center" w="100%" h="100%">
        <HStack marginTop="100">
          <Button margin="2" size="100" display={buttonsConceptVisible[0]} onPress={() => conceptButtonPress(0)}>
            {definitions[randomNumbers[0]].concept}
          </Button>
          <Button margin="2" size="100" display={buttonsConceptVisible[1]} onPress={() => conceptButtonPress(1)}>
            {definitions[randomNumbers[1]].concept}
          </Button>
          <Button margin="2" size="100" display={buttonsConceptVisible[2]} onPress={() => conceptButtonPress(2)}>
            {definitions[randomNumbers[2]].concept}
          </Button>
        </HStack>
        <HStack>
          <Button margin="2" size="100" display={buttonsDefinitionVisible[0]} onPress={() => definitionButtonPress(0)}>
            {definitions[shuffleNumbers[0]].definition}
          </Button>
          <Button margin="2" size="100" display={buttonsDefinitionVisible[1]} onPress={() => definitionButtonPress(1)}>
            {definitions[shuffleNumbers[1]].definition}
          </Button>
          <Button margin="2" size="100" display={buttonsDefinitionVisible[2]} onPress={() => definitionButtonPress(2)}>
            {definitions[shuffleNumbers[2]].definition}
          </Button>
        </HStack>
        <HStack >
          <Button margin="2" size="100" display={buttonsConceptVisible[3]} onPress={() => conceptButtonPress(3)}>
            {definitions[randomNumbers[3]].concept}
          </Button>
          <Button margin="2" size="100" display={buttonsConceptVisible[4]} onPress={() => conceptButtonPress(4)}>
            {definitions[randomNumbers[4]].concept}
          </Button>
          <Button margin="2" size="100" display={buttonsConceptVisible[5]} onPress={() => conceptButtonPress(5)}>
            {definitions[randomNumbers[5]].concept}
          </Button>
        </HStack>
        <HStack >
          <Button margin="2" size="100" display={buttonsDefinitionVisible[3]} onPress={() => definitionButtonPress(3)}>
            {definitions[shuffleNumbers[3]].definition}
          </Button>
          <Button margin="2" size="100" display={buttonsDefinitionVisible[4]} onPress={() => definitionButtonPress(4)}>
            {definitions[shuffleNumbers[4]].definition}
          </Button>
          <Button margin="2" size="100" display={buttonsDefinitionVisible[5]} onPress={() => definitionButtonPress(5)}>
            {definitions[shuffleNumbers[5]].definition}
          </Button>
        </HStack>
      </VStack>
    </SafeAreaView>
  )
};

export default Dopasowania;
