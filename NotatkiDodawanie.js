import React, { useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import { View, Image, TouchableOpacity, Text,ScrollView,StyleSheet, StatusBar,Alert } from 'react-native';
import { st,auth,db } from './firebase';
import { useNavigation, useRoute, } from '@react-navigation/core';;
import { useEffect } from 'react';
import * as Progress from 'react-native-progress';
import * as ImagePicker from 'expo-image-picker';

export default function NotatkiDodawanie () {
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [image, setImage] = useState(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const route = useRoute();
  const navigation = useNavigation();
  const setName = route.params.nazwa;

  const camera = useRef(null);
  const scrollView = useRef(null);
  
  async function requestPermissions() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setPermissionsGranted(true);
    } else {
      Alert.alert(
        'Brak permisji do kamery!',
        'Odrzucono permisje do kamery!',
        [
          {
            text:"OK",
          }
        ]
      );
    }
  }
  async function takePicture() {
    if (camera.current) {
      let photo = await camera.current.takePictureAsync();
      setImage(photo.uri);
      setIsEnabled(false);
      scrollView.current.scrollToEnd({ animated: true });
    }
  }
  async function uploadPicture () {
    setUploading(true);
    setTransferred(0);
    const storageRef = st.ref();
    const imageRef = storageRef.child(`/${auth.currentUser.email}/${setName}/${new Date().getTime()}.jpg`);
    const response = await fetch(image);
    const blob = await response.blob();
    const task = imageRef.put(blob);
  
    task.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes * 1000000 ) * 10;
      setTransferred(progress);
    });
  
    try {
      await task;
      setUploading(false);
      Alert.alert(
        'Przesłano Zdjęcie!',
        'Sprawdź swoje zdjęcie w notatkach!',
        [
          {
            text:"OK",
            onPress: () => {navigation.replace('NotatkiPrzegladanie', {nazwa: setName})} ,
          }
        ]
      );
      setImage(null);
    } catch (e) {
      console.error(e);
    }
  }
  
  async function loadPicture() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      try {
        const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: false,
        });
    
        if (!canceled) {
          setImage(assets[0].uri);
          setIsEnabled(false);
          scrollView.current.scrollToEnd({ animated: true });
        }
      } catch (error) {
        console.log(error);
      }
      }
      else {
        console.log('Permission denied');
    } 
    }
useEffect(() => {
  requestPermissions();
}, []);

  return (
    <ScrollView ref={scrollView}>
    {!uploading ? (
    <View>
    {permissionsGranted ? (
      <Camera style={{ flex: 1, aspectRatio: 0.7}} ref={camera}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>

        </View>
      </Camera>
      ) : (
        <Text>Permisje do kamery nie zostały przyznane</Text>
      )}
      </View>
    ):null}
      <View alignItems= 'center' >
      {!uploading ? (
      <TouchableOpacity
            style={[
              styles.button,
            ]}
            onPress={takePicture}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: '#F1EDEE' }}>
              Zrób zdjęcie
            </Text>
          </TouchableOpacity>
      ): null }
      {!uploading ? (
          <TouchableOpacity
            style={[
              styles.button,
            ]}
            onPress={loadPicture}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: '#F1EDEE' }}>
              Załaduj zdjęcie z galerii
            </Text>
          </TouchableOpacity>
      ) : null}
      {image !=null ? (<Image source={{ uri: image }} style={{ width: 200, height: 250 }}/>
      ) : null}
      {uploading ? (
        <View style={styles.progressBarContainer}>
          <Progress.Bar progress={transferred} width={300} />
        </View>
      ) : ( 

      <TouchableOpacity disabled={isEnabled}
            style={[
              styles.button,
            ]}
            onPress={uploadPicture}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: '#F1EDEE' }}>
              Załaduj 
            </Text>
          </TouchableOpacity>)}
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
  justifyContent: 'center',
  shadowColor: 'black', 
  shadowOffset: { width: 0, height: 2 }, 
  shadowOpacity: 0.25, shadowRadius: 3.84, 
  elevation: 5,
  },
  progressBarContainer: { 
    marginTop: 20
  },
  });

