import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logo = require('../assets/tradeagile/logo.png'); // Certifique-se de ajustar o caminho da logo conforme necessário

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const existingUsers = await AsyncStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];
      
      if (users.some(user => user.username === username)) {
        Alert.alert('Erro', 'Usuário já cadastrado');
        return;
      }

      users.push({ username, password });
      await AsyncStorage.setItem('users', JSON.stringify(users));
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao cadastrar usuário');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.headerText}>Cadastre-se</Text>
      <TextInput
        placeholder="Usuário para cadastrar"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholderTextColor="white"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="white"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
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
    backgroundColor: '#1E5E8B', // Cor de fundo similar à tela de login
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ffde59',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  headerText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 30, // Espaçamento entre o texto e os campos de entrada
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
    marginTop: 20,
  },
  button: {
    backgroundColor: '#ffde59',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 50,
  },
  buttonText: {
    color: '#004AAD',
    fontSize: 20,
  },
});

export default RegisterScreen;
