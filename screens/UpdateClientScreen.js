import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const UpdateClientScreen = ({ route, navigation }) => {
  const { client, onUpdateClient } = route.params;
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);

  const handleUpdate = () => {
    if (!name || !email) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    const updatedClient = { ...client, name, email };

    onUpdateClient(updatedClient);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar Cliente</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Nome do Cliente"
        placeholderTextColor="#999"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Email do Cliente"
        placeholderTextColor="#999"
        keyboardType="email-address"
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

export default UpdateClientScreen;
