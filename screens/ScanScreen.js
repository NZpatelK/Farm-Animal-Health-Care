import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const Ring = ({ delay }) => {
  const ring = useSharedValue(0);

  const ringStyle = useAnimatedStyle(() => {
    return {
      opacity: 0.8 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [0, 4]),
        },
      ],
    };
  });

  useEffect(() => {
    const animation = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 4000,
        }),
        -1,
        false
      )
    );
    ring.value = animation;
    return () => {
      ring.value = 0;
    };
  }, []);


  return <Animated.View style={[styles.ring, ringStyle]} />;
};

export default function AnimatedRingExample() {
  const navigation = useNavigation();
  const [animalData, setAnimalData] = useState(require("../data/AnimalData.json"));
  const [timeoutId, setTimeoutId] = useState(null);

  const selectRandomItem = () => {
    const randomIndex = Math.floor(Math.random() * animalData.length);
    return animalData[randomIndex];
  };

  useFocusEffect(
    useCallback(() => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
  
      const newTimeoutId = setTimeout(() => {
        const item = selectRandomItem();
        navigation.navigate('Animals', { screen:"Animal Detail", params: {name: item.type + ": " + item.tag_number, item }});
      }, 3000);
  
      setTimeoutId(newTimeoutId);
    },[])
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Ring delay={0} />
      <Ring delay={500} />
      <Ring delay={1000} />
      <Ring delay={1500} />
      <Ring delay={2000} />
      <Ring delay={2500} />
      <Ring delay={3000} />
      <Ring delay={3500} />
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    position: "absolute",
    width: 1000,
    height: 1000,
    borderRadius: 500,
    borderColor: "#007AFF",
    borderWidth: 10,
  },
});
