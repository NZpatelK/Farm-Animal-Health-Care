import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { ScrollView } from 'react-native';
import { ANIMAL_PATH } from '@env'

export default function AnimalHealthScreen() {

    const nav = useNavigation();
    const [animalData, setAnimalData] = useState([{}]);
    const [animalsType] = useState(["Cow", "Pig", "Sheep"]);

    const [cowData, setCowData] = useState([{}]);
    const [pigData, setPigData] = useState([{}]);
    const [sheepData, setSheepData] = useState([{}]);

    useEffect(() => {
        axios.get(ANIMAL_PATH)
            .then(response => {
                const getData = response.data;

                setAnimalData(getData);

            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const avreageOverallHealth = (petData) => {

        const totalValue = petData.reduce((sum, currentValue) => {
            return sum + currentValue.health;
        }, 0);

        return totalValue / petData.length;
    }

    const healthCategory = (data, minVal, maxVal) => {

        return data.filter(item => {
            return (item.health >= minVal && item.health <= maxVal);
        });
    }

    const outputAnimalsInfo = animalsType.map((item, index) => {

        const fetchData = animalData.filter(data => {
            return data.type === item;
        });

        return (
            <View style={styles.card} key={index}>
                <Text>{item}</Text>
                <Text> Population: {fetchData.length} </Text>
                <Text> Overall Health: {avreageOverallHealth(fetchData).toFixed(0)}% </Text>
                <Text style={{ color: 'red' }}> Critial: {healthCategory(fetchData, 20, 40).length}</Text>
                <Text style={{ color: '#bf9404' }}> Medium: {healthCategory(fetchData, 41, 70).length}</Text>
                <Text style={{ color: 'green' }}> Healthy: {healthCategory(fetchData, 71, 100).length}</Text>

            </View>)
    })


    return (
        <ScrollView>
            <View>
                {Array.isArray(animalData) ? outputAnimalsInfo : (<Text> No data </Text>)}
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