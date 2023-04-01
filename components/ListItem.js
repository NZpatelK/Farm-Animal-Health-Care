import { StyleSheet} from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import React from 'react'

/* 
This class is create the list with animation processing.
item = entire of the data
viewable = get amount of data which is able to display on screen becuase screen has limit space. it is part animation process
children =  display data from parent pass to here. 

Amination processing is when user scroll down or up then you can see new item pop up in the list with amination processing. 
*/

export default function ListItem({ item, viewableItems, children }) {

    // This funcation make Aniamted proccess. 
    const rStyle = useAnimatedStyle(() => {
        const isVisible = Boolean(
            viewableItems.value
                .filter((item) => item.isViewable)
                .find((viewableItems) => viewableItems.item.id === item.id)
        );

        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [
                {
                    scale: withTiming(isVisible ? 1 : 0.6),
                },
            ],
        };
    }, []);

    return (
        <Animated.View
            style={[styles.card,
                rStyle,
            ]}
        >
            {children} 
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '95%',
        backgroundColor: '#f7f7f7',
        alignSelf: 'center',
        borderRadius: 15,
        marginTop: 20,
        shadowColor: '#000000',
        shadowOffset: {width: 10, height: 12},
        shadowOpacity: 0.1,
        shadowRadius: 10,
    }
})