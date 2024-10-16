import {View, Text, Platform,FlatList, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import CartListItem from '../components/CartListitems';
import Button from '../components/Button';
import { useCart } from '../provider/CartProvider';

const CartScreen = () => {
    const { items, total } = useCart()
    return (
        <View>
            <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{gap:10, padding:10}}
       
      />

        <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '500', color: 'white' }}>
        Total: ${total}
      </Text>
      <Button  text="Checkout" />
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

export default CartScreen