import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

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