import React, { useState, useEffect } from 'react';
import { Button, Text } from "native-base";
import { useNavigation, useRoute, } from '@react-navigation/core';
import { View, Image, FlatList, Alert } from 'react-native';
import { st, auth } from './firebase';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
import Lightbox from 'react-native-lightbox-v2';


const NotatkiPrzegladanie = () => {
  const route = useRoute();
  const [images, setImages] = useState([]);
  const navigation = useNavigation();
  const setName = route.params.nazwa;

  const getImages = async () => {
    const imageRef = st.ref(`/${auth.currentUser.email}/${setName}/`);
    const imageList = await imageRef.listAll();

    const imagesData = await Promise.all(
      imageList.items
        .filter(item => item.name.endsWith('.jpg') || item.name.endsWith('.jpeg') || item.name.endsWith('.png'))
        .map(async item => {
          const imageURL = await item.getDownloadURL();
          return { uri: imageURL, name: item.name };
        })
    );
    setImages(imagesData);
  };
  const deleteImage = async (item) => {
    const imageRef = st.ref(`/${auth.currentUser.email}/${setName}/${item.name}`);
    try {
      await imageRef.delete();
      getImages();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const catalogExist = st.ref(`/${auth.currentUser.email}/${setName}/exist.txt`);
    catalogExist.getDownloadURL().then(() => {

    }).catch(() => {
      catalogExist.put(new Blob()).then(() => {
      })
    })
    getImages();
  }, []);

  return (
    <View>
      <Button
        w={{
          base: '55%',
          md: '25%',
        }}
        backgroundColor="#8aa29e"
        color="#f1edee"
        marginTop={3}
        marginBottom={5}
        alignSelf="center"
        margin="10"
        style={{ shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
        onPress={() => navigation.replace('NotatkiDodawanie', { nazwa: setName })}
      >
        <Text style={{ fontSize: 18, marginBottom: 10, color: '#F1EDEE' }}>
          Dodaj nowe notatki
        </Text>
      </Button>
      <FlatList
        data={images}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <LongPressGestureHandler onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) {
              Alert.alert(
                "Usuwanie zdjęcia",
                "Czy na pewno chcesz usunąć to zdjęcie?",
                [
                  {
                    text: "Nie",
                    style: "cancel",

                  },
                  {
                    text: "Tak",
                    onPress: () => { deleteImage(item) },

                  }

                ]
              );
            }
          }}
            minDurationMs={800}>
            <View>
              <Lightbox>
                <Image source={item} style={{ width: 400, height: 300, marginBottom: 20, alignSelf: 'center' }} resizeMode='contain' />
              </Lightbox>
            </View>
          </LongPressGestureHandler>
        )}

      />

    </View>
  );
}

export default NotatkiPrzegladanie;