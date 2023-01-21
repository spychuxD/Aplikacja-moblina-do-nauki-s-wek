import React, { useState, useEffect } from 'react';
import { Animated, PanResponder, FlatList, StyleSheet,TouchableOpacity} from "react-native";
import { Box, Button, Icon, Progress, Avatar, View, HStack, VStack, Text, Input,Spacer, Center, NativeBaseProvider, Divider, ScrollView} from "native-base";
import {auth,db} from './firebase';
import {useNavigation,useRoute } from '@react-navigation/core';

const Dopasowania = () => {
    const [selectedConcept, setSelectedConcept] = useState(null);
    const [concepts, setConcepts] = useState([]);
    const route = useRoute();
    const name = route.params.nazwa;
    const uid = auth.currentUser?.uid;
   
    useEffect(() => {
    db.collection('users').doc(uid).collection('zestawy').doc(uid + name).get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data().definitions;
          setConcepts(data);
        } else {
          console.log("No such document!")
        }
      })
      .catch(error => {
        console.log(error);``
      });
    }, []);

    const handlePress = (item) => {
      setSelectedConcept(item);
    }
  
    const handleMatching = (definition) => {
      if (selectedConcept && definition === selectedConcept.definition) {
        setConcepts(concepts.filter(concept => concept.id !== selectedConcept.id));
      } else {
        setSelectedConcept(null);
      }
    }
  
    return (
      <View style={styles.container}>
        <FlatList
          data={concepts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)} style={[styles.concept, selectedConcept && selectedConcept.id === item.id ? styles.selected : {}]}>
              <Text>{item.concept}</Text>
            </TouchableOpacity>
          )}
        />
        <FlatList
          data={concepts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleMatching(item.definition)} style={styles.definition}>
              <Text>{item.definition}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    concept: {
      width: 100,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      backgroundColor: 'lightgray',
    },
    selected: {
      backgroundColor: 'blue',
    },
    definition: {
      width: 200,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      backgroundColor: 'lightgray',
    },
  });
export default Dopasowania;
