// src/screens/EditItemScreen.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editItem, fetchItem } from '../store/slices/itemsSlice.js';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { moderateScale } from '../utils/responsive';

const EditItemScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const dispatch = useDispatch();

    // Use optional chaining and nullish coalescing operator to handle potential undefined state
    const item = useSelector(state => state.items.items.find(item => item.id === id)) ?? { name: '' };
    const [name, setName] = useState(item.name);

    useEffect(() => {
        // Fetch the item if it's not already in Redux state
        if (!item.name) {
            dispatch(fetchItem(id));
        }
    }, [dispatch, id, item.name]);

    const handleSubmit = () => {
        if (name.trim()) {
            dispatch(editItem({ id, updatedItem: { name } }))
                .then(() => {
                    navigation.goBack();
                })
                .catch((error) => {
                    console.error('Failed to update item:', error);
                });
        } else {
            alert('Name is required');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter Item Name"
                style={styles.input}
            />
            <Button title="Update Item" onPress={handleSubmit} style={styles.button} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
    },
    input: {
        width: '100%',
        height: moderateScale(40),
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: moderateScale(5),
        paddingHorizontal: moderateScale(10),
        marginBottom: moderateScale(20),
    },
    button: {
        width: '100%',
        height: moderateScale(40),
        backgroundColor: '#007bff',
        borderRadius: moderateScale(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EditItemScreen;
