import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ListAnimalScreen() {
    return (
        <View>
            {/* {Array.isArray(pigData) && pigData.map(animal => (
                    <View key={animal.id} style={styles.card}>
                        <Text>Animal Type: {animal.type}</Text>
                        <Text>Tag number: {animal.tag_number}</Text>
                        <Text>Health: {animal.health}%</Text>
                    </View>
                ))} */}
            <Text>ListAnimalScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({})