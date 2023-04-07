import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View} from "react-native";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";

/**
 * This class is to create a ring signal when user try to scan the animal 
 * then ring signal animation while scanning and fetch data about specific animal 
 * 
 * Currently they set timer for tempoery while when get acutal product to connect the animal 
 * then the timer will change with acutal scanner feature. 
 * 
 * @returns animation the ring signal
 */

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
          duration: 4000, // This is temperory to set timer.
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
  const [animalData] = useState(require("../data/AnimalData.json"));
  const [timeoutId, setTimeoutId] = useState(null);

  const selectRandomItem = () => {
    const randomIndex = Math.floor(Math.random() * animalData.length); // This is random generate to get the data from json. in the future will get acutal data from scan the anumal.
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
      {/* This ring tag has different size of the ring. each tag will scale the ring. 0 = small ring and 3500 = bigger ring*/}
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
