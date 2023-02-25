import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';

export default function AnimalDetailScreen() {
    const route = useRoute();
    const animalData = route.params.item;

    return (
        <View>
            <View>
                <Text>Tag number: {animalData.tag_number}</Text>
                <Text>Date of Brith: {animalData.dob}</Text>
                <Text>Health: {animalData.health}%</Text>
            </View>
            <ScrollView>
                <View>
                    {Array.isArray(animalData.medicalHistory) && (animalData.medicalHistory.length != 0) ? animalData.medicalHistory.map (record => (
                        <View style={styles.card} >
                            <Text>Date: {record.recordDate}</Text>
                            <Text>Name: {record.name}</Text>
                            <Text>Issue: {record.medicalResaon}</Text>
                        </View>
                    )) : <Text> No medicial record</Text>

                    }
                </View>
            </ScrollView>
        </View>
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