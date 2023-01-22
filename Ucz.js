import React, { useState, useRef, useEffect } from 'react';
import { Animated, PanResponder, StyleSheet } from "react-native";
import { Box, FlatList, Button, Icon, Progress, Avatar, View, HStack, VStack, Text, Input, Spacer, Center, NativeBaseProvider, Divider } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, } from '@react-navigation/core';
import { auth, db } from './firebase';

const Ucz = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const name = route.params.nazwa;
    const [definitions, setDefinitions] = useState([{}]);

    const [count, setCount] = useState(0);
    const [yourAns, setAns] = useState('');

    const [error, setError] = useState(null);
    const [errorShown, setErrorShown] = useState(false);
    const [prompt, setPrompt] = useState('none');
    const [promptShown, setPromptShown] = useState(false);

    const Check = () => {
        if (yourAns === definitions[count].definition) {
            setErrorShown(false);
            setPrompt('none');
            setPromptShown(false);
            if (count < (definitions.length - 1)) {
                setCount(count + 1);
                setAns('');
            }
            else if (count === (definitions.length - 1)) {
                navigation.goBack();
            }
        }
        else if(yourAns!=''){
            setError('Zla odpowiedz! Czy chcesz\n'+ 'zobaczyć poprawną odpowiedż?');
            setErrorShown(true);
            setPrompt('flex');
        }
    }
    useEffect(() => {
        const uid = auth.currentUser?.uid;
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
    return <VStack backgroundColor="#686963" alignItems="center" justifyContent="center" w="100%" h="100%">
        <HStack marginBottom={5} display={prompt} borderRadius={10} backgroundColor="#f1edee" alignItems="center" justifyContent="center" padding={5}>
        {error && errorShown && <Text color="#db5461" bold>{error}</Text>}
        <Button display={prompt} marginLeft="2" borderRadius="15" alignItems="center" backgroundColor="#8aa29e" onPress={() => setPromptShown(true)}>
            <Text fontSize="14px" color="#f1edee" bold>Pokaż</Text>
        </Button>
        </HStack>
        <View style={{ shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
        borderRadius={20} backgroundColor="#f1edee" alignItems="center" justifyContent="center" w="90%" h="50%">
        {promptShown && <Text fontSize="25px" color="#8aa29e">{definitions[count].definition}</Text>}
            <Text style={{ textShadowColor: '#686963', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3}} 
            marginBottom={2} fontSize="30px" color="#686963" bold>{definitions[count].concept}</Text>
            <Input onChangeText={text => setAns(text)} value={yourAns}
                w={{
                    base: '75%',
                    md: '25%',
                }}
                fontSize="20px"
                placeholder="Wpisz odpowiedź"
                borderColor="#8aa29e"
                backgroundColor="#f1edee"
                color="#686963"
            />

            <Button style={{ shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
            borderRadius="15" marginTop={4} backgroundColor="#8aa29e" width={200} onPress={Check}>
                <Text fontSize="25px" color="#f1edee" bold>OK</Text>
            </Button>
        </View>
    </VStack>
};

export default Ucz;
