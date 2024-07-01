// src/screens/ItemDetailScreen.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItem, removeItem } from '../store/slices/itemsSlice.js';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { moderateScale } from '../utils/responsive';
const ItemDetailScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const dispatch = useDispatch();

    const item = useSelector(state => state.items?.items?.find(item => item.id === id)) ?? null;

    useEffect(() => {
        if (!item) {
            dispatch(fetchItem(id));
        }
    }, [dispatch, id, item]);

    if (!item) {
        return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('EditItem', { id })} style={styles.editButton} />
            <Button
                title="Delete"
                onPress={() => {
                    dispatch(removeItem(id));
                    navigation.goBack();
                }}
                style={styles.deleteButton}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: moderateScale(20),
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemName: {
        fontSize: moderateScale(20),
        marginBottom: moderateScale(20),
    },
    editButton: {
        width: moderateScale(150),
        height: moderateScale(40),
        backgroundColor: '#007bff',
        borderRadius: moderateScale(5),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: moderateScale(10),
    },
    deleteButton: {
        width: moderateScale(150),
        height: moderateScale(40),
        backgroundColor: '#dc3545',
        borderRadius: moderateScale(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ItemDetailScreen;
