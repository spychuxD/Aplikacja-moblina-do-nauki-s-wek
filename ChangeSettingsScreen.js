import React, { useState } from 'react';
import { Box, Button, Icon, HStack, VStack, Text} from "native-base";
import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { st, auth } from './firebase';
import Dialog from "react-native-dialog";
import * as ImagePicker from 'expo-image-picker';

const ChangeSettings = () => {

  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const handlePress = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const okPassword = () => {
    changePassword();
  }
  const okMail = () => {
    handlePress();
  }
  const confirmPassword = () => {
    Alert.alert(
      "Zmiana hasła",
      "Czy na pewno chcesz hasło?",
      [
        {
          text: "Nie",
          style: "cancel",

        },
        {
          text: "Tak",
          onPress: () => { okPassword() },

        }

      ]
    );
  }
  const confirmMail = () => {
    Alert.alert(
      "Zmiana adresu e-mail",
      "Czy na pewno chcesz zmienić e-mail?",
      [
        {
          text: "Nie",
          style: "cancel",

        },
        {
          text: "Tak",
          onPress: () => { okMail() },

        }

      ]
    );
  }
  const changePassword = () => {
    auth.sendPasswordResetEmail(auth.currentUser.email)
      .then(() => {
        Alert.alert(
          "Sukces!",
          `Wysłano link o zmiane hasła na ${auth.currentUser.email}`,
          [
            {
              text: "OK",
              style: "cancel",

            },
          ]
        );
      }).catch((error) => {
        alert(error)
      })
  }
  const changeMail = (value) => {

    setEmail(value);
    setVisible(false);
    auth.currentUser.updateEmail(email)
      .then(() => {
        Alert.alert(
          "Sukces!",
          `Zmieniono na nowy adres email: ${email}
          Zaloguj się ponownie`,
          [
            {
              text: "OK",
              style: "cancel",
              onPress: () => {
                auth
                  .signOut()
                .then(() => {
                  navigation.replace("Login")
                })
                .catch(error => alert(error.message))
              },

            },
          ]
        );
      })
      .catch(error => alert(error.message))
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
          const source = assets[0].uri;
          deleteOldPicture();
          uploadPicture(source);
        }
      } catch (error) {
        console.log(error);
      }
    }
    else {
      console.log('Permission denied');
    }
  }
  async function uploadPicture(source) {
    const storageRef = st.ref();
    const imageRef = storageRef.child(`/${auth.currentUser.email}/Avatar/${new Date().getTime()}.jpg`);
    const response = await fetch(source);
    const blob = await response.blob();
    const task = imageRef.put(blob);
    try {
      await task;
      Alert.alert(
        'Ustawiono nowy avatar!',
        'Sprawdź swoje zdjęcie nowe zdjęcie w profilu!',
        [
          {
            text: "OK",
            onPress: () => { navigation.replace('ChangeSettings') },
          }
        ]
      );
    } catch (e) {
      console.error(e);
    }
  }
  const deleteOldPicture = async () => {
    const imageRef = st.ref(`/${auth.currentUser.email}/Avatar/`);
    try {
      await imageRef.listAll().then(function (res) {
        res.items.forEach(function (itemRef) {
          itemRef.delete();
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  return <Box backgroundColor="#02020B" h="100%">
    <VStack space={3} backgroundColor="#686963" alignItems="center" justifyContent="center" w="100%" h="100%">
      <Button backgroundColor="#8aa29e" marginTop="5" onPress={confirmMail}>
        <HStack>
          <Icon as={<Entypo name="email" />} marginRight="2" size={44} color="#f1edee" />
          <Text w={{ base: '72%' }} textAlign="center" fontSize="20px" color="#f1edee" bold>
            Zmiana e-mail
          </Text>
        </HStack>
      </Button>
      <Button backgroundColor="#8aa29e" marginTop="5" onPress={confirmPassword}>
        <HStack>
          <Icon as={<MaterialIcons name="vpn-key" />} marginRight="2" size={44} color="#f1edee" />
          <Text w={{ base: '72%' }} textAlign="center" fontSize="20px" color="#f1edee" bold>
            Zmiana hasła
          </Text>
        </HStack>
      </Button>
      <Button backgroundColor="#8aa29e" marginTop="5" onPress={loadPicture}>
        <HStack>
          <Icon as={<AntDesign name="picture" />} marginRight="2" size={44} color="#f1edee" />
          <Text w={{ base: '72%' }} textAlign="center" fontSize="20px" color="#f1edee" bold>
            Zmiana avataru
          </Text>
        </HStack>
      </Button>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Podaj nowy adres e-mail</Dialog.Title>
        <Dialog.Input placeholder="Adres e-mail" onChangeText={setEmail} />
        <Dialog.Button label="Anuluj" onPress={handleCancel} />
        <Dialog.Button label="Zatwierdź" onPress={changeMail} />
      </Dialog.Container>
    </VStack>
  </Box>

}

export default ChangeSettings;
