import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { useSharedValue } from 'react-native-reanimated';
import ListItem from '../components/ListItem';
import ModalPoup from '../components/ModalPoup';

export default function AnimalDetailScreen() {
    const route = useRoute();
    const animalData = route.params.item;
    const viewableItem = useSharedValue([]);
    const [modalData, setModalData] = useState("hello");
    const [visible, setVisible] = useState(false);

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        viewableItem.value = viewableItems;
    }, []);

    return (
        <View>
            <Text>Tag number: {animalData.tag_number}</Text>
            <Text>Date of Brith: {animalData.dob}</Text>
            <Text>Health: {animalData.health}%</Text>


            {Array.isArray(animalData.medicalHistory) && (animalData.medicalHistory.length != 0) ? (
                <FlatList
                    data={animalData.medicalHistory}
                    style={{ height: "100%" }}
                    onViewableItemsChanged={onViewableItemsChanged}
                    renderItem={({ item }) => {
                        return (
                            <ListItem item={item} viewableItems={viewableItem}>
                                <TouchableOpacity onPress={() => setModalData(item.medicalResaon) & setVisible(true)}>
                                    <View>
                                        <Text>Date: {item.recordDate}</Text>
                                        <Text>Name: {item.name}</Text>
                                        <Text>click for more Information</Text>
                                    </View>
                                </TouchableOpacity>
                            </ListItem>
                        )
                    }}
                />) : <Text> No medicial record</Text>}

            <ModalPoup visible={visible}>
                <View style={{ alignItems: 'center' }}>
                    <Text>{modalData}</Text>
                    <Button title="Close" onPress={() => setVisible(false)} />
                </View>
            </ModalPoup>



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