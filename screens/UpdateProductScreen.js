import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const UpdateProductScreen = ({ route, navigation }) => {
    const { product, onUpdateProduct } = route.params;
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price.toString());
    const [imageUrl, setImageUrl] = useState(product.imageUrl || '');

    const handleUpdate = () => {
        if (!name || isNaN(parseFloat(price))) {
            alert('Por favor, insira um nome válido e um preço.');
            return;
        }

        const updatedProduct = { ...product, name, price: parseFloat(price), imageUrl };
        onUpdateProduct(updatedProduct);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Atualizar Produto</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholder="Nome do Produto"
                placeholderTextColor="#999"
            />
            <TextInput
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                style={styles.input}
                placeholder="Preço"
                placeholderTextColor="#999"
            />
            <TextInput
                value={imageUrl}
                onChangeText={setImageUrl}
                style={styles.input}
                placeholder="URL da Imagem"
                placeholderTextColor="#999"
            />
            {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.image} /> : null}
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E5E8B', // Cor de fundo consistente com as outras telas
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFDE59', // Cor do título
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#FFDE59', // Cor da borda da entrada
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        backgroundColor: '#fff',
        color: '#000',
    },
    button: {
        backgroundColor: '#DD4E50', // Cor do botão consistente com as outras telas
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
});

export default UpdateProductScreen;
