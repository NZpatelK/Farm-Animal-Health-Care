import { ScrollView, StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ListAnimalScreen() {
    const nav = useNavigation();
    const route = useRoute();
    const animalData = route.params.fetchData;


    return (
        <ScrollView>
            <View>
                {Array.isArray(animalData) && animalData.map(animal => (
                    <TouchableHighlight onPress={() => nav.navigate('Animal Detail', { name: animal.type + ": " + animal.tag_number, animal })} activeOpacity={1} underlayColor="grey" style={styles.card}>
                        <View key={animal.id}>
                            <Text>Animal Type: {animal.type}</Text>
                            <Text>Tag number: {animal.tag_number}</Text>
                            <Text>Health: {animal.health}%</Text>
                        </View>
                    </TouchableHighlight>
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