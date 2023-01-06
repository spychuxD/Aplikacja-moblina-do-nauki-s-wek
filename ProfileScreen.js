import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Box, FlatList, Button, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import { auth } from './firebase';

const ProfileScreen = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const startDate = selectedStartDate
    ? selectedStartDate.format('YYYY-MM-DD').toString()
    : '';
  return (
    <Box backgroundColor="#FFFFFF" h="100%">
      <VStack>
        <Avatar alignSelf="center" size="200px" source={{
          uri: "https://i.postimg.cc/G2vx7jCm/gdfgdf.png"
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
  )
}

export default ProfileScreen;