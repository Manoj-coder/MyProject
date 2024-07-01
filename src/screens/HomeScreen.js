// src/screens/HomeScreen.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../store/slices/itemsSlice.js';
import { View, FlatList, StyleSheet } from 'react-native';
import Item from '../components/Item';
import Button from '../components/Button';
import { moderateScale } from '../utils/responsive';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { items } = useSelector(state => state.items);
    const itemsStatus = useSelector((state) => state.items.status);
    const error = useSelector((state) => state.items.error);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <Item
                        item={item}
                        onPress={() => navigation.navigate('ItemDetail', { id: item.id })}
                    />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.flatListContent}
            />
            <Button title="Add New Item" onPress={() => navigation.navigate('AddItem')} style={styles.addButton} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingHorizontal: moderateScale(20),
        paddingTop: moderateScale(20),
    },
    flatListContent: {
        paddingBottom: moderateScale(10),
    },
    addButton: {
        marginTop: moderateScale(20),
        alignSelf: 'center',
        width: moderateScale(150),
        height: moderateScale(40),
        backgroundColor: '#007bff',
        borderRadius: moderateScale(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
