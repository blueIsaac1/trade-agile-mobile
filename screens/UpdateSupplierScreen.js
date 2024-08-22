import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateSupplierScreen = ({ route, navigation }) => {
  const { supplier, onUpdateSupplier } = route.params;
  const [name, setName] = useState(supplier.name);
  const [contact, setContact] = useState(supplier.contact);

  const handleUpdate = async () => {
    if (!name || !contact) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    const updatedSupplier = { ...supplier, name, contact };

    try {
      const existingSuppliers = await AsyncStorage.getItem('suppliers');
      const suppliers = existingSuppliers ? JSON.parse(existingSuppliers) : [];
      const index = suppliers.findIndex(s => s.id === supplier.id);
      if (index !== -1) {
        suppliers[index] = updatedSupplier;
        await AsyncStorage.setItem('suppliers', JSON.stringify(suppliers));
        onUpdateSupplier(updatedSupplier);
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Fornecedor não encontrado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao atualizar fornecedor.');
      console.error('Failed to update supplier', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar Fornecedor</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Nome do Fornecedor"
        placeholderTextColor="#999"
      />
      <TextInput
        value={contact}
        onChangeText={setContact}
        style={styles.input}
        placeholder="Contato"
        placeholderTextColor="#999"
      />
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
    backgroundColor: '#007BFF', // Cor do botão
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UpdateSupplierScreen;
