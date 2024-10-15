import { Stack, useLocalSearchParams,useRouter } from 'expo-router';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native'
import products from "assets/data/products";
import { useState } from 'react';
import Button from "../../../components/Button";
import { useCart } from '@/src/provider/CartProvider'; 
import { PizzaSize } from '@/src/types';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']
const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams()

  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')
  const { addItem } = useCart()
 

  const product = products.find((p) => p.id.toString() === id)
  if (!product) {
    return <Text>Product Not Found</Text>
  }
  const addtoCart =() => {

    addItem(product, selectedSize)
    router.push('/cart')
  }
  const defaultPizzaImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} resizeMode='contain' />
      <Text>Select Sizes</Text>
      <View style={styles.sizes}>
        {
          sizes.map(size => (
            <Pressable
              onPress={() => {
                setSelectedSize(size);
              }}
              style={[
                styles.size,
                {
                  backgroundColor: selectedSize === size ? 'gainsboro' : 'white',
                },
              ]} key={size} >
              <Text style={[
                styles.sizeText,
                {
                  color: selectedSize === size ? 'black' : 'gray',
                },
              ]}> {size}</Text>
            </Pressable>
          ))
        }
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addtoCart} text="Add to Cart"/>
    </View>
  );
}
export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  title: {},
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 90,
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',

  }

});
