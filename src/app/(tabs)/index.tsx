import { StyleSheet, Image } from 'react-native';
import Colors from '@/src/constants/Colors';
import products from '@/assets/data/products';
import { Text, View } from '../../components/Themed';
import ProductListItems from '../../components/ProductListItems';

const product = products[0];

export default function TabOneScreen() {
  return (
    <View>
      <ProductListItems product={product} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
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
