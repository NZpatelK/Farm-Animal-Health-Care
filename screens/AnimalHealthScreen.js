import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native';

export default function AnimalHealthScreen() {

    const nav = useNavigation();
    const [animalData, setAnimalData] = useState([{}]);
    const [animalsType] = useState(["Cow", "Pig", "Sheep"]);


    useEffect(() => {
        setAnimalData(require("../data/AnimalData.json"));
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
            <TouchableHighlight key={index} onPress={() => nav.navigate('List of Animals', { title: item , fetchData })} activeOpacity={1} underlayColor="grey" style={styles.card}>

                <View key={index}>
                    <Text>{item}</Text>
                    <Text> Population: {fetchData.length} </Text>
                    <Text> Overall Health: {avreageOverallHealth(fetchData).toFixed(0)}% </Text>
                    <Text style={{ color: 'red' }}> Critial: {healthCategory(fetchData, 20, 40).length}</Text>
                    <Text style={{ color: '#bf9404' }}> Medium: {healthCategory(fetchData, 41, 70).length}</Text>
                    <Text style={{ color: 'green' }}> Healthy: {healthCategory(fetchData, 71, 100).length}</Text>
                </View>

            </TouchableHighlight>)
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