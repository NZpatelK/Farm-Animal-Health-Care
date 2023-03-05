import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSharedValue } from 'react-native-reanimated';
import ListItem from '../components/ListItem';
import ModalPoup from '../components/ModalPoup';

export default function AnimalDetailScreen() {
    const route = useRoute();
    const nav = useNavigation();
    const animalData = route.params.item;
    const viewableItem = useSharedValue([]);
    const [modalData, setModalData] = useState("hello");
    const [visible, setVisible] = useState(false);

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        viewableItem.value = viewableItems;
    }, []);

    return (
        <View>
            <View style={{ margin: 15 }}>
                <Text style={styles.textboxSize}>Tag number: {animalData.tag_number}</Text>
                <Text style={styles.textboxSize}>Date of Brith: {animalData.dob}</Text>
                <Text style={styles.textboxSize}>Health: {animalData.health}%</Text>
            </View>

            <View style={styles.line} />

            <View >
                <Text style={{ textAlign: "center", fontSize: 24 }}> Medicial Record History </Text>
            </View>

            {Array.isArray(animalData.medicalHistory) && (animalData.medicalHistory.length != 0) ? (
                <FlatList
                    data={animalData.medicalHistory}
                    style={{ height: "70%" }}
                    onViewableItemsChanged={onViewableItemsChanged}
                    renderItem={({ item }) => {
                        return (
                            <ListItem item={item} viewableItems={viewableItem}>
                                <TouchableOpacity onPress={() => setModalData(item.medicalResaon) & setVisible(true)}>
                                    <View style={styles.insideCard}>
                                        <Text style={styles.textboxSize}>Date: {item.recordDate}</Text>
                                        <Text style={styles.textboxSize}>Name: {item.name}</Text>
                                        <Text style={styles.textboxSize}>medicalResaon: this animal is experiencing bloating and digestive discomfort, possibly indicating rumen acidosis.</Text>
                                        <Text style={[{ textAlign: "center", marginTop: 10, color: "#005b99" }, styles.textboxSize]}>click for more Information</Text>
                                    </View>
                                </TouchableOpacity>
                            </ListItem>
                        )
                    }}
                />) : (

                <View style={styles.subHeaderTextContainer}>
                    <Text style={styles.subHeaderText}>No medicial record</Text>
                </View>



            )}

            <ModalPoup visible={visible}>
                <View style={{ alignItems: 'center' }}>
                    <Text>{modalData}</Text>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                        <Text style={{color: "#005b99", marginTop: 20}}>Close</Text>
                    </TouchableOpacity>
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
    },
    textboxSize: {
        fontSize: 16,
        marginVertical: 5,
    },
    insideCard: {
        padding: 20
    },
    line: {
        alignSelf: "center",
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        width: "95%",
        marginVertical: 10,
    },
    subHeaderTextContainer: {
        // alignSelf:"center",
        justifyContent: 'center',
        height: "50%",
        alignItems: "center"
    },
    subHeaderText: {
        fontSize: 20,
        fontWeight: 'bold'
    }

})