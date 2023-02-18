import { StyleSheet} from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import React from 'react'

export default function ListItem({ item, viewableItems, children }) {

    const rStyle = useAnimatedStyle(() => {
        const isVisible = Boolean(
            viewableItems.value
                .fiter((item) => item.isViewable)
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
            style={[
                {
                    height: 100,
                    width: '90%',
                    backgroundColor: '#78CAD2',
                    alignSelf: 'center',
                    borderRadius: 15,
                    marginTop: 20,
                },
                rStyle,
            ]}
        >
            {children}
        </Animated.View>
    )
}

const styles = StyleSheet.create({})