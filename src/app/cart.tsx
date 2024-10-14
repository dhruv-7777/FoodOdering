import {View, Text, Platform,FlatList, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import CartListItem from '../components/CartListitems';

import { useCart } from '../provider/CartProvider';

const CartScreen = () => {
    const { items } = useCart()
    return (
        <View>
            <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{gap:10, padding:10}}
       
      />
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

export default CartScreen