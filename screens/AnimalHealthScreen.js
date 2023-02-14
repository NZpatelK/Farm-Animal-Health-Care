import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { ScrollView } from 'react-native';
import { ANIMAL_PATH } from '@env'

export default function AnimalHealthScreen() {

    const nav = useNavigation();
    const [animalData, setAnimalData] = useState([{}]);

    useEffect(() => {
        axios.get(ANIMAL_PATH)
            .then(response => {
                setAnimalData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    return (
        <ScrollView>
            <View>
                {Array.isArray(animalData) && animalData.map(animal => (
                    <View id={animal.id} style={styles.card}>
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