import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { ScrollView } from 'react-native';

export default function AnimalHealthScreen() {

    const nav = useNavigation();
    const [animalData, setAnimalData] = useState([{}]);

    useEffect(() => {
        axios.get("/Users/karanpatel/Desktop/Project/FarmAnimalHealthCare/FarmAnimalHealthCare/data/AnimalData.json")
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
                    <View>
                        <Text>{animal.health}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})