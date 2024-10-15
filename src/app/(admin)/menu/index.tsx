import { StyleSheet, FlatList } from 'react-native';
import Colors from '@/src/constants/Colors';
import products from '@/assets/data/products';
import { View } from '../../../components/Themed';
import ProductListItems from '../../../components/ProductListItems';

export default function TabOneScreen() {
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItems product={item} />}
        numColumns={2}
        contentContainerStyle={{gap:10, padding:10}}
        columnWrapperStyle ={{gap:10}}
      />
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
