// src/components/Item.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Item = ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(item.id)} style={styles.container}>
            <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#f9c2ff',
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
    },
});

export default Item;
