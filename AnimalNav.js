import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AnimalHealthScreen from './screens/AnimalHealthScreen';
import ListAnimalScreen from './screens/ListAnimalScreen';
import AnimalDetailScreen from './screens/AnimalDetailScreen';



export default function AnimalNav() {
 
    const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName='Animal Health' screenOptions={{headerBackTitle: "Back"}}>
        <Stack.Screen name="Animal Health" component={AnimalHealthScreen} />
        <Stack.Screen name="List of Animals" component={ListAnimalScreen} options={({ route }) => ({ title: route.params?.title ?? 'List of Animals' })}/>
        <Stack.Screen name="Animal Detail" component={AnimalDetailScreen} options={({ route }) => ({ title: route.params?.name ?? 'Animal Detail' })}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})