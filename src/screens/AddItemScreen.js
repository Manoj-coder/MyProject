import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/slices/itemsSlice.js';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { moderateScale } from '../utils/responsive';

const AddItemScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (name.trim()) {
            dispatch(addItem({ name }));
            navigation.goBack();
        } else {
            alert('Name is required');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter Item Name"
            />
            <Button title="Add Item" onPress={handleSubmit} />
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
});

export default AddItemScreen;
