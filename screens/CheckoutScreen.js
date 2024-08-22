import React, { useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { jsPDF } from 'jspdf';
import * as FileSystem from 'expo-file-system';

const logo = require('../assets/tradeagile/logo.png');

const CheckoutScreen = ({ route, navigation }) => {
    const { cart, setCart, setQuantities } = route.params; // Recebe setCart e setQuantities
    const [paymentMethod, setPaymentMethod] = useState('cash');

    const calculateTotal = () => {
        let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        if (paymentMethod === 'card') {
            total += total * 0.01; // Adiciona 1% para pagamento com cartão
        }
        return total.toFixed(2);
    };

    const handlePayment = async () => {
        Alert.alert(
            'Pedido Finalizado',
            `Forma de pagamento: ${paymentMethod === 'cash' ? 'Dinheiro' : 'Cartão'}\nTotal: R$ ${calculateTotal()}`
        );

        try {
            await generatePDF();
            // Limpa o carrinho e as quantidades
            setCart([]); // Limpa o carrinho
            setQuantities({}); // Limpa as quantidades
            navigation.reset({
                index: 0,
                routes: [{ name: 'ProductScreen' }],
            });
        } catch (error) {
            console.error('Error generating PDF:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao gerar o PDF.');
        }
    };

    const generatePDF = async () => {
        try {
            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.text('Resumo do Pedido', 10, 10);

            doc.setFontSize(12);
            cart.forEach((item, index) => {
                doc.text(`${item.name} - ${item.quantity} x R$ ${item.price.toFixed(2)}`, 10, 20 + index * 10);
            });

            doc.text(`Total: R$ ${calculateTotal()}`, 10, 30 + cart.length * 10);
            doc.text(`Forma de pagamento: ${paymentMethod === 'cash' ? 'Dinheiro' : 'Cartão'}`, 10, 40 + cart.length * 10);
            doc.setFontSize(10);
            doc.text('Obrigado pela sua compra!', 10, 290);

            const pdfBase64 = doc.output('datauristring');
            const uri = FileSystem.documentDirectory + 'pedido.pdf';
            await FileSystem.writeAsStringAsync(uri, pdfBase64.split(',')[1], { encoding: FileSystem.EncodingType.Base64 });

            Alert.alert('Pedido Finalizado', `Resumo do pedido:\n${cart.map(item => `${item.name} - ${item.quantity} x R$ ${item.price.toFixed(2)}`).join('\n')}\nTotal: R$ ${calculateTotal()}\n\nPedido salvo em: ${uri}`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            throw error;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.title}>Resumo do Pedido</Text>
            </View>
            <FlatList
                data={cart}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemDetails}>Quantidade: {item.quantity}</Text>
                        <Text style={styles.itemDetails}>Preço unitário: R$ {item.price.toFixed(2)}</Text>
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
            />
            <Text style={styles.total}>Total: R$ {calculateTotal()}</Text>
            <View style={styles.paymentMethods}>
                <TouchableOpacity
                    style={[styles.paymentButton, paymentMethod === 'cash' && styles.selectedButton]}
                    onPress={() => setPaymentMethod('cash')}
                >
                    <Text style={styles.buttonText}>Pagar com Dinheiro</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.paymentButton, paymentMethod === 'card' && styles.selectedButton]}
                    onPress={() => setPaymentMethod('card')}
                >
                    <Text style={styles.buttonText}>Pagar com Cartão</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.finalizeButton} onPress={handlePayment}>
                <Text style={styles.finalizeButtonText}>Finalizar Pedido</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1E5E8B', // Cor de fundo consistente com o design geral
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffde59',
        textAlign: 'center',
    },
    listContainer: {
        marginBottom: 20,
    },
    item: {
        marginBottom: 12,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#1E5E8B', // Cor de fundo dos itens
        borderWidth: 1,
        borderColor: '#ffde59', // Cor da borda dos itens
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffde59',
    },
    itemDetails: {
        fontSize: 14,
        color: '#fff',
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffde59',
        marginVertical: 16,
        textAlign: 'center',
    },
    paymentMethods: {
        marginBottom: 20,
    },
    paymentButton: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#333',
        borderRadius: 5,
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: '#555',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
    finalizeButton: {
        padding: 15,
        backgroundColor: '#28a745',
        borderRadius: 5,
        alignItems: 'center',
    },
    finalizeButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CheckoutScreen;