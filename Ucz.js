import React, { useState, useRef, useEffect } from 'react';
import { Animated, PanResponder, StyleSheet } from "react-native";
import { Box, Menu, Switch, FlatList, Button, Icon, Progress, Avatar, View, HStack, VStack, Text, Input, Spacer, Center, NativeBaseProvider, Divider } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
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
        if (yourAns === definitions[count].definition && onlyConcept) {
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
        else if (yourAns === definitions[count].concept && !onlyConcept) {
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
    const [onlyConcept, setOnlyConcept] = useState(true);
    const [onlyDefinition, setOnlyDefinition] = useState(false);

    const setChanges=(tmp)=>{
        if(tmp == 0 && !onlyConcept)
        {
            setOnlyConcept(true);
            setOnlyDefinition(false);
        }
        else if(tmp == 0 && onlyConcept)
        {
            setOnlyConcept(false);
            setOnlyDefinition(true);
        }
        else if(tmp == 1 && !onlyDefinition)
        {
            setOnlyConcept(false);
            setOnlyDefinition(true);
        }
        else if(tmp == 1 && onlyDefinition)
        {
            setOnlyConcept(true);
            setOnlyDefinition(false);
        }
    };

    return <VStack backgroundColor="#686963" alignItems="center" justifyContent="center" w="100%" h="100%">
        <Menu closeOnSelect={false} w="200" placement="left bottom"  
        trigger={triggerProps => {
        return <Button marginRight="3" backgroundColor="#8aa29e" marginLeft="auto"{...triggerProps}>
                <Icon as={<MaterialCommunityIcons name={'menu'} />} size={5} color="#f1edee" />
              </Button>
      }}>
            <Menu.ItemOption padding="0" value="Akcel">Pojecia<Switch size="lg" isChecked={onlyConcept} offTrackColor="blue.100" onTrackColor="blue.400" onToggle={()=>setChanges(0)}/></Menu.ItemOption>
            <Menu.ItemOption padding="0" value="Akcel">Definicje<Switch size="lg" isChecked={onlyDefinition} offTrackColor="blue.100" onTrackColor="blue.400" onToggle={()=>setChanges(1)}/></Menu.ItemOption>
            
        </Menu>
        <HStack marginBottom={5} display={prompt} borderRadius={10} backgroundColor="#f1edee" alignItems="center" justifyContent="center" padding={5}>
        {error && errorShown && <Text color="#db5461" bold>{error}</Text>}
        <Button display={prompt} marginLeft="2" borderRadius="15" alignItems="center" backgroundColor="#8aa29e" onPress={() => setPromptShown(true)}>
            <Text fontSize="14px" color="#f1edee" bold>Pokaż</Text>
        </Button>
        </HStack>
        <View style={{ shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
        borderRadius={20} backgroundColor="#f1edee" alignItems="center" justifyContent="center" w="90%" h="50%">
        {promptShown && <Text fontSize="25px" color="#8aa29e">{onlyConcept ? definitions[count].definition : definitions[count].concept}</Text>}
            <Text style={{ textShadowColor: '#686963', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3}} 
            marginBottom={2} fontSize="30px" color="#686963" bold>{onlyConcept ? definitions[count].concept : definitions[count].definition}</Text>
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
