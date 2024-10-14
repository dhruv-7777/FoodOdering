import {StyleSheet, View, Text} from 'react-native'


const ProductDetailScreen = () => {
    console.warn("Redirected")
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Product Detail Screen</Text>
           
        </View>
    );
}
export default ProductDetailScreen;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 10,
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
   
  });
  