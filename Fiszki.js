import React, { useState, useRef, useEffect } from 'react';
import { Animated, PanResponder, StyleSheet, SafeAreaView } from "react-native";
import { Menu,Box,Switch, HamburgerIcon, FlatList, Button, Icon, Progress, Avatar, View, Pressable, HStack, VStack, Text, Spacer, Center, NativeBaseProvider, Divider } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, } from '@react-navigation/core';
import { auth, db } from './firebase';
import { Accelerometer } from 'expo-sensors';

import GestureFlipView from 'react-native-gesture-flip-card';


const Fiszki = () => {
  const [count, setCount] = useState(1);
  const route = useRoute();
  const [accel, setAccel] = useState(false);
  const [changes, setChanges] = useState(false);

  const toggleAccelerometer = () => {
    if (accel) {
      Accelerometer.removeAllListeners();
      setAccel(false);
      setChanges(false);
    } else {
      Accelerometer.addListener(gyroscopeData => {
        setData(gyroscopeData);
      });
      setAccel(true);
      setChanges(true);
    }
  };

  const navigation = useNavigation();
  const name = route.params.nazwa;
  const uid = auth.currentUser?.uid;
  const [isPhoneTiltRight, setIsPhoneTiltRight] = useState(0);
  const [isPhoneTilt, setIsPhoneTilt] = useState(false);

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [tab, setTab] = useState([{}]);

  const incrementCount = () => {
    // Update state with incremented value
    if (count < tab.length) {
      setCount(count + 1);
    }
    else if (count === (tab.length)) {
      db.collection('users').doc(uid).collection('zestawy').doc(uid + name).update({
        definitions: tab,
      })  
      navigation.goBack();
    }
  };

  const exit = ()=>{
    db.collection('users').doc(uid).collection('zestawy').doc(uid + name).update({
      definitions: tab,
    })  
    navigation.goBack();
  }

  const know = () => {
    tab[randomNumbers[count - 1]].isLearn = true;
    incrementCount();
  }

  const doNotKnow = () => {
    tab[randomNumbers[count - 1]].isLearn = false;
    incrementCount();
  }

  const [randomNumbers, setRandomNumbers] = useState([0]);
  useEffect(() => {
    db.collection('users').doc(uid).collection('zestawy').doc(uid + name).get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data().definitions;
          setTab(data);
        } else {
          console.log("No such document!")
        }
      })
      .catch(error => {
        console.log(error);
      });

  }, []);

  useEffect(() => {
    let newRandomNumbers = [];
    while (newRandomNumbers.length < tab.length) {
      let random = Math.floor(Math.random() * (tab.length)) + 0;
      if (!newRandomNumbers.includes(random)) {
        newRandomNumbers.push(random);
      }
    }
    setRandomNumbers(newRandomNumbers);
  }, [tab]);


  useEffect(() => {
    if (accel) {
      Accelerometer.setUpdateInterval(200);
      Accelerometer.addListener(gyroscopeData => {
        setData(gyroscopeData);
      });
    } else {
      Accelerometer.removeAllListeners();
    }
  }, [accel]);


  useEffect(() => {
    if (x < -0.6) {
      setIsPhoneTiltRight(1);
    } else if (x > 0.6) {
      setIsPhoneTiltRight(-1);
    } else if (x < 0.3 && x > -0.3) {
      setIsPhoneTiltRight(0);
    }
  }, [{ x, y, z }]);


  useEffect(() => {
    if (isPhoneTiltRight === 1 && !isPhoneTilt) {
      know();
      setIsPhoneTilt(true);
    } else if (isPhoneTiltRight === -1 && !isPhoneTilt) {
      doNotKnow();
      setIsPhoneTilt(true);
    } else if (isPhoneTiltRight === 0) {
      setIsPhoneTilt(false);
    }
  }, [isPhoneTiltRight, isPhoneTilt]);

  const reset = ()=>{
    tab.forEach(el=>{
      el.isLearn = false;
    })
    db.collection('users').doc(uid).collection('zestawy').doc(uid + name).update({
      definitions: tab,
    }) 
    console.log("zmieniono stan");
  };

  const renderFront = () => {
    return <View backgroundColor="#f1edee" width={280} height={450} marginTop={5} marginBottom={10} borderRadius={20} alignItems="center" justifyContent="center">
      <Text fontSize="30px" color="#02020B">{tab[randomNumbers[count - 1]].concept}</Text>
    </View>
  };

  const renderBack = () => {
    return <View backgroundColor="#f1edee" width={280} height={450} marginTop={5} marginBottom={10} borderRadius={20} alignItems="center" justifyContent="center">
      <Text fontSize="30px" color="#02020B">{tab[randomNumbers[count - 1]].definition}</Text>
    </View>
  };
    

  return <VStack space={4} backgroundColor="#686963" alignItems="center" justifyContent="space-between" w="100%" h="100%">
    <Box w="90%" maxW={400}>
      <Text alignSelf='center' m="5" color="#f1edee">{count}/{tab.length}</Text>
      <Progress style={{ shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }} value={(count) / tab.length * 100} mx="4" />
    </Box>
      
        <Menu closeOnSelect={false} w="200" placement="left bottom"  
        trigger={triggerProps => {
        return <Button marginRight="3" backgroundColor="#8aa29e" marginLeft="auto"{...triggerProps}>
                <Icon as={<MaterialCommunityIcons name={'menu'} />} size={5} color="#f1edee" />
              </Button>
      }}>
            <Menu.ItemOption padding="0" value="Akcel">Akcelerometr<Switch size="lg" isChecked={changes} offTrackColor="blue.100" onTrackColor="blue.400" onToggle={()=>toggleAccelerometer()}/></Menu.ItemOption>
            <Menu.ItemOption paddingBottom="5" value="Reset" onPress={()=>reset()}>Reset</Menu.ItemOption>
        </Menu>
    
    <SafeAreaView flex={1} alignItems="center" style={{ shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
      <GestureFlipView width={280} height={450}>
        {renderFront()}
        {renderBack()}
      </GestureFlipView>
    </SafeAreaView>
    <HStack>
      <Button style={{ shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
      borderRadius="15" marginTop="5" marginX="5" w={{ base: '35%' }} h={60} alignItems="center" backgroundColor="#db5461" onPress={() => doNotKnow()}>
        Nie wiem
      </Button>
      
      <Button style={{ shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
      borderRadius="15" marginTop="5" marginX="5" w={{ base: '35%' }} h={60} alignItems="center" backgroundColor="#56A598" onPress={() => know()}>
        Wiem
      </Button>
      
    </HStack>
    <Button style={{ shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
      borderRadius="15"  alignItems="center" backgroundColor="#8aa29e" onPress={() => exit()}>
        Zapisz i wyjdź
      </Button>
  </VStack>
};
const styles = StyleSheet.create({
  box: {
    height: 450,
    width: 280,
    backgroundColor: "#f1edee",
    borderRadius: 15
  }
});
export default Fiszki;
