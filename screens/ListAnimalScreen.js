import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSharedValue } from 'react-native-reanimated';
import ListItem from '../components/ListItem';

/*
This class is display list of informatm of animal from specifc animal type
*/

export default function ListAnimalScreen() {
    const nav = useNavigation();
    const route = useRoute();
    const viewableItem = useSharedValue([])
    const animalData = route.params.fetchData; // This data from AnimalHealthScreen

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        viewableItem.value = viewableItems;
    }, []);

    return (
        <View>
            <FlatList
                data={animalData}
                style={{ height: "90%" }}
                onViewableItemsChanged={onViewableItemsChanged}
                renderItem={({ item }) => {
                    return (
                        <ListItem item={item} viewableItems={viewableItem}>
                            <TouchableOpacity onPress={() => nav.navigate('Animal Detail', { name: item.type + ": " + item.tag_number, item })}>
                                <View style={styles.insideCard}>
                                    <Text style={styles.textboxSize}>Tag number: {item.tag_number}</Text>
                                    <Text style={styles.textboxSize}>Health: {item.health}%</Text>
                                </View>
                            </TouchableOpacity>
                        </ListItem>
                    )
                }}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    textboxSize: {
        fontSize: 16,
        marginVertical: 5
    },
    insideCard: {
        padding: 20

    },
})