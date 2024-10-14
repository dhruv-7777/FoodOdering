import { StyleSheet, Image, Pressable } from 'react-native';
import Colors from '@/src/constants/Colors';
import products from '@/assets/data/products';
import { Text, View } from './Themed';
import { Product } from '../types';
import { Link } from 'expo-router';

type ProductListItemProps = {
    product: Product;
}
export const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

const ProductListItems = ({product}: ProductListItemProps) => {
  return (
    <Link href = {`/menu/${product.id}`} asChild>
    <Pressable style={styles.container}>
      <Image source={{ uri: product.image || defaultPizzaImage}} style={styles.image} resizeMode='contain'/>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      
    </Pressable>
    </Link>
  );
};

export default ProductListItems

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    maxWidth: '50%'
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
});
