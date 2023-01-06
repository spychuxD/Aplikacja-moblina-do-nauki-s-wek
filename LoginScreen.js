import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Text, Input, Button, Icon, Pressable, Stack} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from './firebase';


const LoginScreen = (props) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSignUP = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
      <Stack space={4} backgroundColor="#02020B" alignItems="center" justifyContent="center" w="100%" h="100%">
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
      </Stack>
);}

export default LoginScreen;
