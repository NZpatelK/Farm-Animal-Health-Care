import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


//This Dashboard Screen
//This screen will dsiplay all different chart and data of farm and farm animal. 
//This screen I am not foucs on it and I am more foucs on montioring the farm animal. 
//In the future will come to this.
export default function DashboardScreen() {
  return (
    <View style={styles.container}>
    <Text style={styles.text}>Dashboard is Coming Soon</Text>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
text: {
  textAlign: 'center',
  fontSize: 24
},})