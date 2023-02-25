import { StyleSheet, Text, View, TouchableHighlight, FlatList } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSharedValue } from 'react-native-reanimated';
import ListItem from '../components/ListItem';

export default function AnimalHealthScreen() {

    const nav = useNavigation();
    const [animalData, setAnimalData] = useState([{}]);
    const viewableItem = useSharedValue([]);
    const [animalsType] = useState(["Cow", "Pig", "Sheep"]);

    useEffect(() => {
        setAnimalData(require("../data/AnimalData.json"));
    }, []);

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        viewableItem.value = viewableItems;
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

    const outputAnimalsInfo = () => {

        const animalArray = [];

        animalsType.map((item, index) => {

            const fetchData = animalData.filter(data => {
                return data.type === item;
            });

            let animalObject = {}
            animalObject.id = index;
            animalObject.type = item;
            animalObject.population = fetchData.length;
            animalObject.overallHealth = avreageOverallHealth(fetchData).toFixed(0)
            animalObject.critial = healthCategory(fetchData, 20, 40).length;
            animalObject.medium = healthCategory(fetchData, 41, 70).length;
            animalObject.healthy = healthCategory(fetchData, 71, 100).length;
            animalObject.animalData = fetchData;

            animalArray.push(animalObject);
        })

        return animalArray
    }


    return (

        <View>
            <FlatList
                data={outputAnimalsInfo()}
                style={{ height: "100%" }}
                onViewableItemsChanged={onViewableItemsChanged}
                renderItem={({ item }) => {
                    return (
                        <ListItem item={item} viewableItems={viewableItem}>
                            <TouchableHighlight onPress={() => nav.navigate('List of Animals', { title: (item.type), fetchData: (item.animalData) })}>
                                <View>
                                <Text>{item.type}</Text>
                                <Text> Population: {item.population} </Text>
                                <Text> Overall Health: {item.overallHealth}% </Text>
                                <Text style={{ color: 'red' }}> Critial: {item.critial}</Text>
                                <Text style={{ color: '#bf9404' }}> Medium: {item.medium}</Text>
                                <Text style={{ color: 'green' }}> Healthy: {item.healthy}</Text>
                                </View>
                            </TouchableHighlight>
                        </ListItem>
                    );
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 100,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        marginTop: 20,
    }
})