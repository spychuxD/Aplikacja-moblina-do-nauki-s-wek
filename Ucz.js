import React, { useState, useRef } from 'react';
import { Animated, PanResponder, StyleSheet} from "react-native";
import { Box, FlatList, Button, Icon, Progress, Avatar, View, HStack, VStack, Text, Input,Spacer, Center, NativeBaseProvider, Divider} from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
const data = [{
    id: 1,
    quest: "Ocena za projekt",
    ans: "5.0",
}, {
    id: 2,
    quest: "ala ma",
    ans: "kota",
}, {
    id: 3,
    quest: "czlowiek",
    ans: "ssak",
},{
    id: 4,
    quest: "kolor",
    ans: "czerwony",
},];

const Ucz = (props) => {
    const [count, setCount] = useState(0);
    const [yourAns, setAns] = useState('');
    const Check = () => {
        if(yourAns === data[count].ans)
        {
            if (count < (data.length-1)) {
                setCount(count + 1);
                setAns('');
            }
            else if(count === (data.length-1)){
                props.navigation.goBack();
            }
            
        }
    }
    return <VStack space={4} backgroundColor="#02020B" alignItems="center" justifyContent="center" w="100%" h="100%">
        <Text m="10" fontSize="30px" color="#f1edee" bold>{data[count].quest}</Text>
        <Input onChangeText={text => setAns(text)}
          w={{
            base: '75%',
            md: '25%',
          }}
          fontSize="20px"
          placeholder="Wpisz odpowiedź"
          borderColor="#8aa29e"
          backgroundColor="#f1edee"
          color="#686963"
        />
        <Button borderRadius="15" m="10" w={{base: '35%'}} h={60} alignItems="center" backgroundColor="#8aa29e" onPress={Check}>
            <Text fontSize="25px" color="#f1edee" bold>OK</Text>
        </Button>
    </VStack>
};

export default Ucz;
