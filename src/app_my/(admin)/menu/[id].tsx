import { Stack, useLocalSearchParams, useRouter, Link } from 'expo-router';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native'
import products from "assets/data/products";
import { useState } from 'react';
import Button from "../../../components/Button";
import Colors from '../../../constants/Colors';
import { useCart } from '@/src/provider/CartProvider';
import { PizzaSize } from '@/src/types';
import { FontAwesome } from '@expo/vector-icons';


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
  const addtoCart = () => {

    addItem(product, selectedSize)
    router.push('/cart')
  }
  const defaultPizzaImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';
  return (
    <View style={styles.container}>
      <Stack.Screen

        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} resizeMode='contain' />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',

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
