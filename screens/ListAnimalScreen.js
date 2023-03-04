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
            onViewableItemsChanged={onViewableItemsChanged}
            renderItem={({ item }) => {
                return (
                    <ListItem item={item} viewableItems={viewableItem}>
                        <TouchableOpacity onPress={() => nav.navigate('Animal Detail', { name: item.type + ": " + item.tag_number, item })}>
                            <View style={styles.insideCard}>
                                {/* <Text style={styles.textboxSize}>Animal Type: {item.type}</Text> */}
                                <Text style={styles.textboxSize}>Tag number: {item.tag_number}</Text>
                                <Text style={styles.textboxSize}>Health: {item.health}%</Text>
                            </View>
                        </TouchableOpacity>
                    </ListItem>
                )
            }}
        />

    )
}

const styles = StyleSheet.create({
    textboxSize: {
        fontSize: "16px",
        marginVertical: 5
    },
    insideCard: {
        padding: 20

    },
})