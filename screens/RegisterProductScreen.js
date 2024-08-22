import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const RegisterProductScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const existingSuppliers = await AsyncStorage.getItem('suppliers');
        const suppliers = existingSuppliers ? JSON.parse(existingSuppliers) : [];
        setSuppliers(suppliers);
      } catch (error) {
        console.error('Failed to load suppliers', error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleRegisterProduct = async () => {
    if (!name.trim() || !price.trim() || !supplierId) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber)) {
      Alert.alert('Erro', 'O preço deve ser um número válido');
      return;
    }

    try {
      const existingProducts = await AsyncStorage.getItem('products');
      const products = existingProducts ? JSON.parse(existingProducts) : [];

      const newProduct = { id: Date.now().toString(), name, price: priceNumber, supplierId, imageUrl };
      products.push(newProduct);
      await AsyncStorage.setItem('products', JSON.stringify(products));
      Alert.alert('Sucesso', 'Produto cadastrado com sucesso');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao cadastrar produto');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Produto</Text>
      <TextInput
        placeholder="Nome do Produto"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="white"
      />
      <TextInput
        placeholder="Preço"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor="white"
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={supplierId}
          style={styles.picker}
          onValueChange={(itemValue) => setSupplierId(itemValue)}
        >
          <Picker.Item label="Selecione um Fornecedor" value="" color="#1E5E8B"/>
          {suppliers.map(supplier => (
            <Picker.Item key={supplier.id} label={supplier.name} value={supplier.id} />
          ))}
        </Picker>
      </View>
      <TextInput
        placeholder="URL da Imagem"
        value={imageUrl}
        onChangeText={setImageUrl}
        style={styles.input}
        placeholderTextColor="white"
      />
      {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.image} /> : null}
      <TouchableOpacity style={styles.button} onPress={handleRegisterProduct}>
        <Text style={styles.buttonText}>Cadastrar Produto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E5E8B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffde59',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ffde59',
    borderRadius: 15,
    backgroundColor: '#1E5E8B',
    color: 'white',
    elevation: 2,
    shadowColor: '#ffde59',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#1E5E8B',
    borderColor: '#ffde59',
    borderWidth: 1,
    borderRadius: 15,
    color: 'white',
    
  },
  button: {
    backgroundColor: '#ffde59',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 20,
  },
  buttonText: {
    color: '#004AAD',
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

export default RegisterProductScreen;
