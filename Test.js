import React, { useState, useRef, useEffect } from 'react';
import { Animated, PanResponder, StyleSheet,TouchableOpacity } from "react-native";
import { Box, FlatList, Button, Icon, Progress, Avatar, View, HStack, VStack, Text, Input, Spacer, Center, NativeBaseProvider, Divider } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, } from '@react-navigation/core';
import { auth, db } from './firebase';


const Test = () => {

    const [definitions, setDefinitions] = useState([]);
    const route = useRoute();
    const uid = auth.currentUser?.uid;
    const name = route.params.nazwa;
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





    return (
        <View>
             <Text>Jakie jest stolice Polski?</Text>
      <TouchableOpacity onPress={() => handleAnswerPress(1)}>
        <Text>Warszawa</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleAnswerPress(2)}>
        <Text>Kraków</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleAnswerPress(3)}>
        <Text>Gdańsk</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleAnswerPress(4)}>
        <Text>Lublin</Text>
      </TouchableOpacity>

        </View>
    )

}


export default Test;