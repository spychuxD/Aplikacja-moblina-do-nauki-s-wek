import React, { useState, useCallback, useEffect } from 'react';
import { Button, Icon, HStack, VStack, Text} from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, } from '@react-navigation/core';
import { View, Image, TouchableOpacity,ScrollView,StyleSheet,FlatList, Modal } from 'react-native';
import { st,auth,db } from './firebase';
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
        return { uri: imageURL };
      })
    );
    setImages(imagesData);
  };

  useEffect(() => {
    const catalogExist = st.ref(`/${auth.currentUser.email}/${setName}/exist.txt`);
    catalogExist.getDownloadURL().then(() => {

    }).catch(()=> {
      catalogExist.put(new Blob()).then(()=>{
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
            borderWidth= "0.5"
            borderColor="black"
            margin ="10"
            onPress={()=>navigation.replace('NotatkiDodawanie', {nazwa: setName})}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: '#F1EDEE' }}>
              Dodaj nowe notatki
            </Text>
          </Button>
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Lightbox>
              <Image source={item}  style={{ width:400, height: 300, marginBottom:20 ,alignSelf: 'center' }} resizeMode='contain'/>
            </Lightbox>
          )}
          
        />
         
      </View>
    );
}
    
    export default NotatkiPrzegladanie;