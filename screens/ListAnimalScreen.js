import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';

export default function ListAnimalScreen() {
    const route = useRoute();
    const animalData = route.params.fetchData;


    return (
        <ScrollView>
            <View>
                {Array.isArray(animalData) && animalData.map(animal => (
                    <View key={animal.id} style={styles.card}>
                        <Text>Animal Type: {animal.type}</Text>
                        <Text>Tag number: {animal.tag_number}</Text>
                        <Text>Health: {animal.health}%</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 5,
        padding: 10,
        borderColor: "black",
        width: "95%",
        borderWidth: 5
    }
})