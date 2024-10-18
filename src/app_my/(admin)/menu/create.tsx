import Button from '../../../components/Button';

import Colors from '../../../constants/Colors';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';


import * as FileSystem from 'expo-file-system';
import { randomUUID } from 'expo-crypto';


const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(
        typeof idString === 'string' ? idString : idString?.[0]
    );
    const isUpdating = !!idString;

    const resetFields = () => {
        setName('');
        setPrice('');
    };
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const validateInput = () => {
        setErrors('');
        if (!name) {
            setErrors('Name is required');
            return false;
        }
        if (!price) {
            setErrors('Price is required');
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setErrors('Price is not a number');
            return false;
        }
        return true;
    };
    const onCreate = async () => {
        if (!validateInput()) {
            return;
        }
        resetFields();
    };
    const onUpdate = async () => {
        if (!validateInput()) {
            return;
        }
    };
    const onSubmit = () => {
        if (isUpdating) {
            // update
            onUpdate();
        } else {
            onCreate();
        }
    };
    const onDelete = () => {

    };

    const confirmDelete = () => {
        Alert.alert('Confirm', 'Are you sure you want to delete this product', [
            {
                text: 'Cancel',
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete,
            },
        ]);
    };
    const defaultPizzaImage =
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{ title: 'Create Product' }}
            />



            <Image
                source={{ uri: image || defaultPizzaImage }}
                style={styles.image}
            />
            <Text onPress={pickImage} style={styles.textButton}>
                Select Image
            </Text>


            <Text style={styles.label}> Name </Text>
            <TextInput
                placeholder="Name"
                style={styles.input}
            />
            <Text style={styles.label}>Price ($)</Text>
            <TextInput
                placeholder="9.99"
                style={styles.input}
                keyboardType="numeric"
            />
            <Text style={{ color: 'red' }}>{errors}</Text>
            <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Create'} />
            {isUpdating && (
                <Text onPress={confirmDelete} style={styles.textButton}>
                    Delete
                </Text>
            )}
        </View>
    );
};

export default CreateProductScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },

    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    label: {
        color: 'gray',
        fontSize: 16,
    },
});