// RegisterSupplierScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterSupplierScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const handleRegister = async () => {
    if (!name || !contact) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    try {
      const existingSuppliers = await AsyncStorage.getItem('suppliers');
      const suppliers = existingSuppliers ? JSON.parse(existingSuppliers) : [];

      if (suppliers.some(supplier => supplier.name === name)) {
        Alert.alert('Erro', 'Fornecedor já cadastrado');
        return;
      }

      const newSupplier = { id: Date.now().toString(), name, contact }; // Gerar um ID único
      suppliers.push(newSupplier);
      await AsyncStorage.setItem('suppliers', JSON.stringify(suppliers));
      Alert.alert('Sucesso', 'Fornecedor cadastrado com sucesso');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao cadastrar fornecedor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Fornecedor</Text>
      <TextInput
        placeholder="Nome do Fornecedor"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="white"
      />
      <TextInput
        placeholder="Contato"
        value={contact}
        onChangeText={setContact}
        style={styles.input}
        placeholderTextColor="white"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar Fornecedor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E5E8B',
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
});

export default RegisterSupplierScreen;
