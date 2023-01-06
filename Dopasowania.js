import React, { useState, useEffect } from 'react';
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

const Dopasowania = (props) => {
    
    const [count, setCount] = useState(0);
    const [yourAns, setAns] = useState('');
    const numbers = [];
    const seen = [];
    useEffect(() => {
        for (let i = 0; i < 10; i++) {
            let war = Math.floor(Math.random() * 3) + 0;
            
            seen.push(war);
            numbers.push(war);
        }
        const numbersAns = [];
        const seenAns = [];
        for (let i = 0; i < 10; i++) {
            let war = Math.floor(Math.random() * 3) + 0;
            
            seenAns.push(war);
            numbersAns.push(war);
        }
      }, []);
    
    return <Box backgroundColor="#02020b" h="100%">
    <FlatList data={data} renderItem={({item}) =><Box alignItems="center" justifyContent="center"  pl={["4", "4"]} pr={["5", "5"]} py="8">
    <HStack backgrundColor="#02020B">
            <Button borderRadius="15" m="5" w={{base: '35%'}} alignItems="center" backgroundColor="#8aa29e">
                <Text fontSize="20px" color="#f1edee">{item.quest}</Text>
            </Button>
            <Button borderRadius="15" m="5" w={{base: '35%'}}  alignItems="center" backgroundColor="#8aa29e">
                <Text fontSize="20px" color="#f1edee">{item.ans}</Text>
            </Button>
        </HStack>
        </Box>} keyExtractor={item => item.id} />
        </Box> 
};

export default Dopasowania;
