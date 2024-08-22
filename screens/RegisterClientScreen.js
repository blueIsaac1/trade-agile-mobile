import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddClientScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleAddClient = async () => {
    try {
      const existingClients = await AsyncStorage.getItem('clients');
      const clients = existingClients ? JSON.parse(existingClients) : [];
      
      if (clients.some(client => client.email === email)) {
        Alert.alert('Erro', 'Cliente já cadastrado com este e-mail');
        return;
      }

      const newClient = {
        id: Date.now().toString(), // Gerar um ID único
        name,
        email
      };

      clients.push(newClient);
      await AsyncStorage.setItem('clients', JSON.stringify(clients));
      Alert.alert('Sucesso', 'Cliente cadastrado com sucesso');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao cadastrar cliente');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Cliente</Text>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="white"
      />
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        placeholderTextColor="white"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddClient}>
        <Text style={styles.buttonText}>Cadastrar</Text>
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
  },
  input: {
    width: '100%',
    padding: 10,
    margin: 10,
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

export default AddClientScreen;
