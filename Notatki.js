import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Text, Input, Button, Icon, Pressable, Stack, View} from 'native-base';
import { Alert,StyleSheet,SafeAreaView,TouchableOpacity,Image } from 'react-native';
import { auth, db, st} from './firebase';
import * as Progress from 'react-native-progress';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImageManipulator from 'expo-image-manipulator';
import { Camera } from 'expo-camera';

const Notatki = () => {
    const [imageGallery, setImageGallery] = useState(null);
    const [imageCamera, setImageCamera] = useState(null);
    const [camera, setCamera] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [url, setUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    //const [transferred, setTransferred] = useState(0);
    const takePicture = async () => {
      if(camera){
          const data = await camera.takePictureAsync(null)
          setImageCamera(data.uri);
      }
    }
    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [16, 9],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) 
        {
          setImage(result.assets[0].uri);
        }
      };

      const uploadImage = () => {
        const fileType = imageGallery.split('.')[1];
        const imageRef = ref(st,"image"+"."+fileType);
        uploadBytes(imageRef,imageGallery,{contentType: `image/${fileType}`}).then(() => {
          getDownloadURL(imageRef).then((url)=> {
            setUrl(url);
          })
          .catch(error => {
            alert(error.message);
          });
          setImage(null);
        })
        .catch(error => {
          alert(error.message);
        });
      };
      return (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={styles.selectButton} onPress={takePicture}>
            <Text style={styles.buttonText}>Zrób Zdjęcie</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
            <Text style={styles.buttonText}>Pick an image</Text>
          </TouchableOpacity>
          <View style={styles.imageContainer}>
          {imageGallery && <Image source={{ uri: imageGallery }} style={{ width: 300, height: 300 }} />}
            {uploading ? (
              <View style={styles.progressBarContainer}>
                <Progress.Bar progress={transferred} width={300} />
              </View>
            ) : (
              <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
                <Text style={styles.buttonText}>Upload image</Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#bbded6'
    },
    selectButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#8ac6d1',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    uploadButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#ffb6b9',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold'
    },
    imageContainer: {
      marginTop: 30,
      marginBottom: 50,
      alignItems: 'center'
    },
    progressBarContainer: {
      marginTop: 20
    },
    imageBox: {
      width: 500,
      height: 500
    }
  });
export default Notatki;
