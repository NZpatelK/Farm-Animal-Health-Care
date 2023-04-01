import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSharedValue } from 'react-native-reanimated';
import ListItem from '../components/ListItem';
import DonutChart from '../components/DonutChart';

/*
This screen is show information of each type of animal.
*/

export default function AnimalHealthScreen() {

    const nav = useNavigation();
    const [animalData, setAnimalData] = useState([{}]);
    const viewableItem = useSharedValue([]);
    const [animalsType] = useState(["Cow", "Pig", "Sheep"]); //Will add more type of animal in the future. 

    useEffect(() => {
        setAnimalData(require("../data/AnimalData.json")); //future will fetch data from the databse by using API.
    }, []);

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        viewableItem.value = viewableItems;
    }, []);

    //This function is to sort the data into the right Health category. 
    //There are three differet health type. Those types are critial, medium, healthy
    const healthCategory = (data, minVal, maxVal) => {

        return data.filter(item => {
            return (item.health >= minVal && item.health <= maxVal);
        });
    }


    //This is fetch all the data of the specifc anaimal type and calucate the total of the specifc animal type.
    // Output the display information about the specific animal type.      
    const outputAnimalsInfo = () => {

        const animalArray = [];

        animalsType.map((item, index) => {

            //This is get all the data of specifc anaimal type.
            const fetchData = animalData.filter(data => {
                return data.type === item;
            });

            let animalObject = {}
            animalObject.id = index;
            animalObject.type = item;
            animalObject.population = fetchData.length;
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
                style={{ height: "90%" }}
                onViewableItemsChanged={onViewableItemsChanged}
                renderItem={({ item }) => {
                    return (
                        <ListItem item={item} viewableItems={viewableItem}>
                            <TouchableOpacity onPress={() => nav.navigate('List of Animals', { title: (item.type), fetchData: (item.animalData) })}>
                                <Text style={styles.textHeader}> {item.type} </Text>
                                <View style={styles.insideCard}>

                                    <View>
                                        {item.population != 0 ? <DonutChart getGraphicData={[{ y: item.critial }, { y: item.medium }, { y: item.healthy }]} /> : null}
                                    </View>

                                    <View>
                                        <Text style={styles.textboxSize}>Population: {item.population} </Text>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red', marginRight: 5 }} />
                                            <Text style={{ fontSize: 16 }}>Critial: {item.critial}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#e6e300', marginRight: 5 }} />
                                            <Text style={{ fontSize: 16 }}>Medium: {item.medium}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center',  marginTop: 15 }}>
                                            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#00cc10', marginRight: 5 }} />
                                            <Text style={{ fontSize: 16 }}>Healthy: {item.healthy}</Text>
                                        </View>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        </ListItem>
                    );
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    insideCard: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    textHeader: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: "bold",
        paddingTop: 10
    },
    textboxSize: {
        fontSize: 16,
        marginVertical: 5
    }
})