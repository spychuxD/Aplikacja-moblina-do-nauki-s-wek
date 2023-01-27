import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';

import { Animated, PanResponder, StyleSheet, SafeAreaView, Alert } from "react-native";

import { Text, Input, Button, Icon, Pressable, Stack, View, Switch, Box, VStack} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { auth, db } from './firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GestureFlipView from 'react-native-gesture-flip-card';

const LoginScreen = () => {
  
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState(null);
  const [errorShown, setErrorShown] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        navigation.replace("Home")
      }
    })
    return unsubscribe
  },[])

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch(error => alert(error.message))
    }

  const handleSignUP = async() => {
    if(repeatPassword === password)
    {
      await auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email);
        db.collection('users').doc(user.uid).set({'email': user.email})
      })
      .catch(error => alert(error.message))

        const noneRef = "https://firebasestorage.googleapis.com/v0/b/projektapki.appspot.com/o/none.png?alt=media&token=a71f19e8-fd47-4ea4-acb1-84b312e6a8f0";
        const storageRef = st.ref();
        const imageRef = storageRef.child(`/${auth.currentUser.email}/Avatar/${new Date().getTime()}.png`);
        const response = await fetch(noneRef);
        const blob = await response.blob();
        const task = imageRef.put(blob);
        await task;
    }


    else
    {
      Alert.alert(
        "Blad rejestracji",
        "Hasla nie sa zgodne",
        [{ text: "OK", }]
      );
    }
    
  }

  const renderFront = () => {
    return <View  backgroundColor="#f1edee" width={300} height={350} borderRadius={50} alignItems="center" justifyContent="center">
    <Stack space={4}  alignItems="center" justifyContent="center" w="100%" h="100%">
    <Text marginBottom="5" fontSize="30px" color="#686963" bold>
        Logowanie
     </Text>
    <Input
      onChangeText={text => setEmail(text)}
      w={{
        base: '75%',
        md: '25%',
      }}
      InputLeftElement={
        <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="#8aa29e" />
      }
      placeholder="Login"
      borderColor="#8aa29e"
      backgroundColor="#f1edee"
      color="#686963"
    />

    <Input
      onChangeText={text => setPassword(text)}
      w={{
        base: '75%',
        md: '25%',
      }}
      type={show ? 'text' : 'password'}
      InputRightElement={
        <Pressable onPress={() => setShow(!show)}>
          <Icon as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />} size={5} mr="2" color="#8aa29e" />
        </Pressable>
      }
      placeholder="Password"
      borderColor="#8aa29e"
      backgroundColor="#f1edee"
      color="#686963"
    />
    
    <Button
      onPress={handleLogin}
      w={{
        base: '75%',
        md: '25%',
      }}
      backgroundColor="#8aa29e"
      color="#f1edee"
      
    >
      Zaloguj się
    </Button>
    {error && errorShown && <Text color="#db5461">{error}</Text>}
    </Stack>
    </View>
  };

  const renderBack = () => {
    return <View backgroundColor="#f1edee" width={300} height={350} borderRadius={50} alignItems="center" justifyContent="center">
    <Stack space={2}  alignItems="center" justifyContent="center" w="100%" h="100%">
    <Text marginBottom="5" fontSize="30px" color="#686963" bold>
        Rejestracja
     </Text>
    <Input
      onChangeText={text => setEmail(text)}
      w={{
        base: '75%',
        md: '25%',
      }}
      InputLeftElement={
        <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="#8aa29e" />
      }
      placeholder="Login"
      borderColor="#8aa29e"
      backgroundColor="#f1edee"
      color="#686963"
    />

    <Input
      onChangeText={text => setPassword(text)}
      w={{
        base: '75%',
        md: '25%',
      }}
      type={show ? 'text' : 'password'}
      
      placeholder="Password"
      borderColor="#8aa29e"
      backgroundColor="#f1edee"
      color="#686963"
    />
    <Input
      onChangeText={text => setRepeatPassword(text)}
      w={{
        base: '75%',
        md: '25%',
      }}
      type={show ? 'text' : 'password'}
      
      placeholder="Repeat password"
      borderColor="#8aa29e"
      backgroundColor="#f1edee"
      color="#686963"
    />
    
    <Button
      onPress={handleSignUP}
      w={{
        base: '75%',
        md: '25%',
      }}
      backgroundColor="#8aa29e"
      color="#f1edee"
      
    >
      Zarejestruj się
    </Button>
    {error && errorShown && <Text color="#db5461">{error}</Text>}
    </Stack>
    </View>
  };

  const [flipType, setFlipType] = useState('left');

  return (
  <SafeAreaView flex={1} alignItems="center" w={{base: '75%',md: '25%',}} justifyContent="center" backgroundColor="#686963">
    <GestureFlipView ref={(ref) => flipView = ref} width={300} height={350}>
      {renderFront()}
      {renderBack()}
    </GestureFlipView>
    <Button backgroundColor="#8aa29e" margin={5} onPress={() => {
      (flipType == 'left') ? flipView.flipRight() : flipView.flipLeft();
      setFlipType((flipType == 'left') ? 'right' : 'left')
    }}>
      <Text color="#f1edee" bold>
      {(flipType == 'left') ? "REJESTRACJA" : "LOGOWANIE"}
      </Text>
    </Button>
  </SafeAreaView>
  

        
);}

export default LoginScreen;
