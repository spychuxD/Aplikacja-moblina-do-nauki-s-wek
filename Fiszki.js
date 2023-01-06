import React, { useState, useRef } from 'react';
import { Animated, PanResponder, StyleSheet} from "react-native";
import { Box, FlatList, Button, Icon, Progress, Avatar, View, HStack, VStack, Text, Spacer, Center, NativeBaseProvider, Divider} from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
const data = [{
    id: 1,
    quest: "Ocena za proejkt",
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

const Fiszki = (props) => {
    const [rotateValue,setRotate] = useState(new Animated.Value(0));
    const [count, setCount] = useState(1);
    
    const incrementCount = () => {
        // Update state with incremented value
        if (count < data.length) {
            setCount(count + 1);
        }
        else if(count === (data.length)){
            props.navigation.goBack();
        }
    };
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value
                });
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: pan.x, dy: pan.y }
                ],
                {useNativeDriver: false}
            ),
            onPanResponderRelease: () => {
                pan.flattenOffset();
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false
                }).start();
                Animated.timing(rotateValue, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: false,
                  }).start();
            }
        })
    ).current;
    const rotate = rotateValue.interpolate({
        inputRange: [0,1],
        outputRange: ["180deg", "0deg"],
      }
      );
    return <VStack space={4} backgroundColor="#02020B" alignItems="center" justifyContent="space-between" w="100%" h="100%">
        <Box w="90%" maxW={400}>
            <Text alignSelf='center' m="5" color="#f1edee">{count}/{data.length}</Text>
            <Progress value={(count) / data.length * 100} mx="4" />
        </Box>
        <Animated.View
            style={{
                transform: [{ translateX: pan.x }, {translateY: pan.y}],
                //,{ rotate }
            }}
            {...panResponder.panHandlers}
        >
            
            <View alignItems="center" justifyContent="center" style={styles.box} ><Text  fontSize="30px" color="#02020B">{data[count-1].quest}</Text></View>
        </Animated.View>
        <HStack>
        <Button borderRadius="15" m="10"w={{base: '35%'}} h={60} alignItems="center" backgroundColor="#8aa29e" onPress={incrementCount}>
            Nie umiem
        </Button>
        <Button borderRadius="15" m="10" w={{base: '35%'}} h={60} alignItems="center" backgroundColor="#8aa29e" onPress={incrementCount}>
            Umiem
        </Button>
        </HStack>
    </VStack>
};
const styles = StyleSheet.create({
    box: {
        height: 450,
        width: 280,
        backgroundColor: "#f1edee",
        borderRadius: 15
    }
});
export default Fiszki;
