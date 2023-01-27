import React, { useState, useEffect, useLayoutEffect} from 'react';
import {View } from 'react-native';
import { Box, FlatList, Button, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import { useNavigation} from '@react-navigation/core';
import { st,auth, } from './firebase';

const ProfileScreen = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [check,setCheck] = useState(false);
  const startDate = selectedStartDate
    ? selectedStartDate.format('YYYY-MM-DD').toString()
    : '';
    const getImages = async () => {
      setCheck(false);
      const imageRef = st.ref(`/${auth.currentUser.email}/Avatar/`);
      const imageList = await imageRef.listAll();
      const imagesData = await Promise.all(
        imageList.items
          .filter(item => item.name.endsWith('.jpg') || item.name.endsWith('.jpeg') || item.name.endsWith('.png'))
          .map(async item => {
          const imageURL = await item.getDownloadURL();
          return { uri: imageURL};
        })
      );
      setImages(imagesData);
      setCheck(true);
    };
    useEffect(()=> {
      getImages();
      const unsubscribe = navigation.addListener('focus', () => {
        getImages();
    });
    return unsubscribe;
    }, []);

  return (
    <View>
      {check ?(
    <Box backgroundColor="#FFFFFF" h="100%">
      <VStack>
        <Avatar alignSelf="center" size="200px" source={{
          uri: images[0].uri
        }} />
      </VStack>
      <Text marginBottom="10" style={{ textAlignVertical: "center", textAlign: "center" }} fontSize="20px" color="#02020b" bold >
        {auth.currentUser?.email}
      </Text>

      <CalendarPicker
        onDateChange={setSelectedStartDate}
        weekdays={['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz']}
        months={['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']}
        previousTitle="Poprzedni"
        nextTitle="Następny"
        todayBackgroundColor="#49C77D"
        selectedDayColor="#E8DEE5"
        selectedDayTextColor="#C02411"
      />
    </Box>
    ) : null}
    </View>

  )
}

export default ProfileScreen;