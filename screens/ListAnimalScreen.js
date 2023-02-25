import { ScrollView, StyleSheet, Text, View, TouchableHighlight, FlatList } from 'react-native'
import React, { useCallback } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSharedValue } from 'react-native-reanimated';
import ListItem from '../components/ListItem';

export default function ListAnimalScreen() {
    const nav = useNavigation();
    const route = useRoute();
    const viewableItem = useSharedValue([])
    const animalData = route.params.fetchData;

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        viewableItem.value = viewableItems;
    }, []);


    return (
        // <ScrollView>
        //     <View>
        //         {Array.isArray(animalData) && animalData.map(animal => (
        //             <TouchableHighlight onPress={() => nav.navigate('Animal Detail', { name: animal.type + ": " + animal.tag_number, animal })} activeOpacity={1} underlayColor="grey" style={styles.card}>
        //                 <View key={animal.id}>
        // <Text>Animal Type: {animal.type}</Text>
        // <Text>Tag number: {animal.tag_number}</Text>
        // <Text>Health: {animal.health}%</Text>
        //                 </View>
        //             </TouchableHighlight>
        //         ))}
        //     </View>
        // </ScrollView>

        <FlatList
            data={animalData}
            style={{ height: "100%" }}
            onViewableItemsChanged={onViewableItemsChanged}
            renderItem={({ item }) => {
                return (
                    <ListItem item={item} viewableItems={viewableItem}>
                        <TouchableHighlight onPress={() => nav.navigate('Animal Detail', { name: item.type + ": " + item.tag_number, item })}>
                            <View>
                                <Text>Animal Type: {item.type}</Text>
                                <Text>Tag number: {item.tag_number}</Text>
                                <Text>Health: {item.health}%</Text>
                            </View>
                        </TouchableHighlight>
                    </ListItem>
                )
            }}
        />

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