import React, { useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { View, Image, TouchableOpacity, Text,ScrollView,StyleSheet } from 'react-native';
import { st,auth,db } from './firebase';
import { useNavigation, useRoute, } from '@react-navigation/core';

export default function NotatkiDodawanie () {
  const [image, setImage] = useState(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const route = useRoute();
  const setName = route.params.nazwa;

  const camera = useRef(null);

  async function takePicture() {
    if (camera.current) {
      let photo = await camera.current.takePictureAsync();
      setImage(photo.uri);
      setIsEnabled(false);
    }
  }
async function uploadPicture (){
  const storageRef = st.ref();
  const imageRef = storageRef.child(`/${auth.currentUser.email}/${setName}/${new Date().getTime()}.jpg`);
  const response = await fetch(image);
  const blob = await response.blob();
  await imageRef.put(blob);
}
  return (
    <ScrollView>
    <View>
      <Camera style={{ flex: 1,aspectRatio: 1}} ref={camera}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>

        </View>
      </Camera>
      </View>
      <View alignItems= 'center' >
      <TouchableOpacity
            style={[
              styles.button,
            ]}
            onPress={takePicture}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: '#F1EDEE' }}>
              Zrób zdjęcie
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
            ]}
            onPress={takePicture}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: '#F1EDEE' }}>
              Załaduj zdjęcie z galerii
            </Text>
          </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 270 }}/>}
      <TouchableOpacity disabled={isEnabled}
            style={[
              styles.button,
            ]}
            onPress={uploadPicture}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: '#F1EDEE' }}>
              Załaduj 
            </Text>
          </TouchableOpacity>
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  button: {
  width: 200,
  height: 50,
  backgroundColor: '#8AA29E',
  margin: 5,
  alignItems: 'center',
  justifyContent: 'center'
  },
  
  });

