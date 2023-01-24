import React, { useState, useEffect } from 'react';
import { Animated, PanResponder, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Box, Button, Icon, Progress, Avatar, View, HStack, VStack, Text, Input, Spacer, Center, NativeBaseProvider, Divider, ScrollView } from "native-base";
import { auth, db } from './firebase';
import { useNavigation, useRoute } from '@react-navigation/core';

const DopasowaniaStart = () => {
    const route = useRoute();
    const name = route.params.nazwa;
    const size = route.params.size;
    const navigation = useNavigation();
    const [randomNumbers, setRandomNumbers] = useState([]);
    const [shuffleNumbers, setShuffleNumbers] = useState([]);
    console.log(size);
    const start = () => {
      navigation.navigate('Dopasowania', {nazwa: name, size: size});
      } 

  return (
    <View backgroundColor="#02020B" alignItems="center" justifyContent="center" w="100%" h="100%">
        <Text fontSize="30px" color="#f1edee" bold>
            Gotowy?
        </Text>
        <Text fontSize="24px" color="#f1edee">
            Dopasuj wszystkie pojęcia
        </Text>
        <Text fontSize="24px" color="#f1edee">
            do definicji
        </Text>
      <Button marginTop="5" width="80%" onPress={() => start()}>
        <Text fontSize="30px" color="#f1edee" bold>
            START
        </Text>
      </Button>
    </View>
  )
};

export default DopasowaniaStart;
