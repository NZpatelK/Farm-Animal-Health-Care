import {StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
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
     
        <FlatList
            data={animalData}
            style={{ height: "100%" }}
            onViewableItemsChanged={onViewableItemsChanged}
            renderItem={({ item }) => {
                return (
                    <ListItem item={item} viewableItems={viewableItem}>
                        <TouchableOpacity onPress={() => nav.navigate('Animal Detail', { name: item.type + ": " + item.tag_number, item })}>
                            <View>
                                <Text>Animal Type: {item.type}</Text>
                                <Text>Tag number: {item.tag_number}</Text>
                                <Text>Health: {item.health}%</Text>
                            </View>
                        </TouchableOpacity>
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