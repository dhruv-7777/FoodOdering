// import { ActivityIndicator, FlatList, Text } from 'react-native';
// import ProductListItem from '@/src/components/ProductListItems';
// import { useProductList } from '@/src/api/products';
// import products from '@/assets/data/products';

// export default function MenuScreen() {
//   // const { data: productss, error, isLoading } = useProductList();
//   // console.log(products);
//   const product = products[0];

//   // if (isLoading) {
//   //   return <ActivityIndicator />;
//   // }

//   // if (error) {
//   //   return <Text>Failed to fetch products</Text>;
//   // }

//   return (
//     <FlatList
//       data={product}
//       renderItem={({ item }) => <ProductListItem product={item} />}
//       numColumns={2}
//       contentContainerStyle={{ gap: 10, padding: 10 }}
//       columnWrapperStyle={{ gap: 10 }}
//     />
//   );
// }


import { ActivityIndicator, FlatList, Text } from 'react-native';
import ProductListItem from '@/src/components/ProductListItems';
import products from '@/assets/data/products';

export default function MenuScreen() {
  const product = products; 

  return (
    <FlatList
      data={product} // Ensure 'data' is an array
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}  // Ensure each item has a unique key
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
