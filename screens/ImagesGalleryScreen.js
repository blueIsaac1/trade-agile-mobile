import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const numColumns = 3;
const imageSize = width / numColumns - 20; // Ajuste do tamanho das imagens com margem

const ImagesGalleryScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const existingProducts = await AsyncStorage.getItem('products');
                if (existingProducts) {
                    setProducts(JSON.parse(existingProducts));
                }
            } catch (error) {
                console.error('Failed to load products', error);
            }
        };

        fetchProducts();
    }, []);

    // Função para obter a fonte da imagem
    const getImageSource = (url) => {
        return url ? { uri: url } : { url: '../assets/tradeagile/logo.png' }; // Imagem padrão se a URL não estiver disponível
    };

    const renderImage = (product) => (
        <View style={styles.imageContainer} key={product.id}>
            <Image
                source={getImageSource(product.imageUrl)} // Usando o primeiro URL da lista de imagens
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.imageText}>{product.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Galeria de Imagens</Text>
            <ScrollView contentContainerStyle={styles.grid}>
                {products.map(product => renderImage(product))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E5E8B', // Cor de fundo consistente com as outras telas
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFDE59', // Cor do título
        textAlign: 'center',
        marginVertical: 20,
    },
    imageContainer: {
        width: imageSize,
        marginBottom: 10,
        alignItems: 'center',
    },
    image: {
        width: imageSize,
        height: imageSize,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    imageText: {
        marginTop: 5,
        fontSize: 14,
        color: '#FFDE59', // Cor do nome do produto
        textAlign: 'center',
    },
});

export default ImagesGalleryScreen;
