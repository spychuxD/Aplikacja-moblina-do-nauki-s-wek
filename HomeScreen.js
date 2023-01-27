import React, { useEffect, useState } from 'react';
import { Box, FlatList, Button, VStack, Text } from "native-base";
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth, db } from './firebase';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [documents, setDocuments] = useState([]);
  const uid = auth.currentUser?.uid
  const deleteSet = async (item) => {
    const docRef = db.collection('users').doc(uid).collection('zestawy').doc(uid + item.name);
    docRef.delete().then(() => {
      Alert.alert(
        "Pomyślnie usunięto!",
        `Usunięto zestaw o nazwie: ${item.name}`,
        [
          {
            text: "OK",
            onPress: () => { navigation.replace('Home') },

          },
        ]
      );
    }).catch((error) => {
      console.error("Blad! ", error);
    });
  }

  const createNewSet = () => {
    navigation.navigate('CreateNewSetScreen');
  }
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    db.collection('users').doc(uid).collection('zestawy').get()
      .then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data());
        setDocuments(documents);
      })
      .catch(error => {
        console.log(error);
      });
  }, [])
  return <Box backgroundColor="#686963" h="100%">
    <Box alignItems="center" justifyContent="center">
      <Button onPress={createNewSet}
        w={{
          base: '55%',
          md: '25%',
        }}
        backgroundColor="#8aa29e"
        color="#f1edee"
        marginTop={5}
        marginBottom={5}
      > Utwórz nowy zestaw
      </Button>
    </Box>
    <FlatList data={documents} renderItem={({ item }) => <Box borderBottomWidth="1" borderColor="#686963" pl={["4", "4"]} pr={["5", "5"]} py="5">
      <LongPressGestureHandler onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          Alert.alert(
            "Usuwanie zestawu",
            "Czy na pewno chcesz usunąć ten zestaw?",
            [
              {
                text: "Nie",
                style: "cancel",

              },
              {
                text: "Tak",
                onPress: () => { deleteSet(item) },

              }

            ]
          );
        }
      }}
        minDurationMs={600}>
        <Button style={{ shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
          justifyContent='flex-start' backgroundColor="#8aa29e" onPress={() => navigation.navigate('LearnHome', { nazwa: item.name, size: item.count })}>
          <VStack>
            <Text border="5px solid #02020b" fontSize="26px" color="#f1edee" bold>
              {item.name}
            </Text>
            <Text fontSize="14px" color="#686963">
              Liczba pojęć: {item.count}
            </Text>
          </VStack>
        </Button>
      </LongPressGestureHandler>
    </Box>

    } keyExtractor={item => item.name}

    />
  </Box>;
};
export default HomeScreen;
