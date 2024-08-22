import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logo = require('../assets/tradeagile/logo.png');
const defaultImage = require('../assets/tradeagile/default.png'); // Imagem padrão

const ProductScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem('username');
                if (storedUsername) {
                    const trimmedUsername = storedUsername.trim().toLowerCase();
                    setUsername(trimmedUsername);
                    setIsAdmin(trimmedUsername === 'admin'); // Verifica se o usuário é admin
                }
            } catch (error) {
                console.error('Failed to load user data', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const existingProducts = await AsyncStorage.getItem('products');
                if (existingProducts) {
                    setProducts(JSON.parse(existingProducts));
                }
            } catch (error) {
                console.error('Failed to load products', error);
                Alert.alert('Erro', 'Falha ao carregar produtos');
            }
        };

        fetchProducts();

        // Configurar o intervalo para atualizar os produtos a cada 5 segundos
        const intervalId = setInterval(fetchProducts, 5000);

        // Limpar o intervalo ao desmontar o componente
        return () => clearInterval(intervalId);
    }, []);

    const handleAddToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        const quantity = quantities[product.id] || 1;
        if (existingProduct) {
            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: existingProduct.quantity + quantity }
                    : item
            );
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...product, quantity }]);
        }

        Alert.alert('Produto Adicionado', `Você adicionou ${quantity} ${product.name} ao carrinho.`);
    };

    const handleUpdateProduct = async (updatedProduct) => {
        try {
            const updatedProducts = products.map(product =>
                product.id === updatedProduct.id ? updatedProduct : product
            );
            setProducts(updatedProducts);
            await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
        } catch (error) {
            Alert.alert('Erro', 'Falha ao atualizar produto');
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const updatedProducts = products.filter(product => product.id !== productId);
            setProducts(updatedProducts);
            await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
        } catch (error) {
            Alert.alert('Erro', 'Falha ao excluir produto');
        }
    };

    const getImageSource = (imageUrl) => {
        if (imageUrl && imageUrl.startsWith('http')) {
            return { uri: imageUrl };
        } else {
            return defaultImage;
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.title}>Escolha seu produto</Text>
                </View>
                {products.length === 0 ? (
                    <Text style={styles.noProducts}>Nenhum produto disponível.</Text>
                ) : (
                    products.map((product) => (
                        <View key={product.id} style={styles.product}>
                            <Image source={getImageSource(product.imageUrl)} style={styles.image} />
                            <View style={styles.details}>
                                <Text style={styles.name}>{product.name}</Text>
                                <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
                                <TextInput
                                    placeholder="Quantidade"
                                    keyboardType="numeric"
                                    value={quantities[product.id]?.toString() || ''}
                                    onChangeText={(text) => setQuantities({ ...quantities, [product.id]: parseInt(text) || 1 })}
                                    style={styles.input}
                                />
                                <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(product)}>
                                    <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
                                </TouchableOpacity>
                                {isAdmin && (
                                    <View style={styles.adminActions}>
                                        <TouchableOpacity
                                            style={[styles.button, styles.adminButton]}
                                            onPress={() => navigation.navigate('UpdateProduct', { product, onUpdateProduct: handleUpdateProduct })}
                                        >
                                            <Text style={styles.buttonText}>Atualizar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.button, styles.adminButton]}
                                            onPress={() => handleDeleteProduct(product.id)}
                                        >
                                            <Text style={styles.buttonText}>Excluir</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
            <View style={styles.footer}>
                {isAdmin && (
                    <TouchableOpacity style={[styles.button, styles.adminButton]} onPress={() => navigation.navigate('RegisterProduct')}>
                        <Text style={styles.buttonText}>Cadastrar Produto</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={[styles.button, styles.galleryButton]}
                    onPress={() => navigation.navigate('Galeria de Imagens')}
                >
                    <Text style={styles.buttonText}>Galeria de Imagens</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.checkoutButtonStyle]}
                    onPress={() => navigation.navigate('Checkout', { cart, setCart, setQuantities })}
                >
                    <Text style={styles.buttonText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E5E8B', // Cor de fundo consistente com as outras telas
    },
    scrollContainer: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#FFDE59', // Cor da borda inferior do cabeçalho
        paddingBottom: 10,
    },
    logo: {
        width: 140,
        height: 80,
        marginRight: 10,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFDE59', // Cor do título
        flex: 1,
    },
    product: {
        flexDirection: 'row',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#FFDE59', // Cor da borda do produto
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#9eb9cc',
    },
    image: {
        width: 100,
        height: 100,
    },
    details: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E5E8B', // Cor do nome do produto
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: '#DD4E50', // Cor do preço
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#FFDE59', // Cor da borda da entrada
        borderRadius: 10,
        padding: 10,
        width: 100,
        marginBottom: 10,
        textAlign: 'center',
        backgroundColor: '#fff',
        color: '#000',
    },
    button: {
        backgroundColor: '#DD4E50',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderColor: '#FFDE59',
        backgroundColor: '#1E5E8B',
    },
    adminActions: {
        marginTop: 10,
    },
    adminButton: {
        backgroundColor: '#FFDE59', // Cor distinta para as ações de admin
    },
    noProducts: {
        textAlign: 'center',
        fontSize: 18,
        color: '#888',
    },
    galleryButton: {
        backgroundColor: '#1E5E8B', // Cor distinta para o botão da galeria de imagens
        marginBottom: 10,
    },
    checkoutButtonStyle: {
        backgroundColor: '#35a818', // Cor distinta para o botão de checkout
    },
});

export default ProductScreen;
