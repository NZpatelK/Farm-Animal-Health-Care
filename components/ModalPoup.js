import { Modal, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Animated from 'react-native-reanimated';


/*
This class is Modal pop up. 
When user click something then modal will popup

visible = this value is boolean. when user click then visible will be true then modal will pop up. 
When user close the modal then visible will false and modal will close. 
*/

export default function ModalPoup({ visible, children }) {
    const [showModal, setShowModal] = useState(visible);
    const scaleValue = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        toggleModal();
    }, [visible]);

    // This fuction is to control the modal when user press open or close.
    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }).start();
        }
    };
    
    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBackGround}>
                <View style={styles.modalContainer}>
                    {children}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
    }
})