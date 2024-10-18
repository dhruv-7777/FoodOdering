import { Text, FlatList, ActivityIndicator } from 'react-native';
import OrderListItem from '@/src/components/OrderListItem';
import { useMyOrderList } from '@/src/api/orders';
import orders from '@/assets/data/orders';

export default function OrdersScreen() {
  // const { data: orders, isLoading, error } = useMyOrderList();
  const order = orders

  // if (isLoading) {
  //   return <ActivityIndicator />;
  // }
  // if (error) {
  //   return <Text>Failed to fetch</Text>;
  // }

  return (
    <FlatList
      data={order}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
