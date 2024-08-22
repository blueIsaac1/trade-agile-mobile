import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const existingUsers = await AsyncStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];
      const user = users.find(user => user.username === username && user.password === password);

      if (user) {
        const isAdmin = username === 'admin';
        if (isAdmin) {
          navigation.navigate('Início', { isAdmin });
        } else {
          navigation.navigate('Produtos');
        }
      } else {
        Alert.alert('Erro', 'Nome de usuário ou senha inválidos');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao verificar usuário');
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/tradeagile/logo.png')} style={styles.logo} />
      <Text style={styles.headerText}>Login</Text>
      <TextInput
        placeholder="Usuário"
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Cadastre-se')}
        onPressIn={() => setIsHovered(true)} // Simula hover no touch
        onPressOut={() => setIsHovered(false)} // Simula hover no touch
      >
        <Text style={[styles.registerText, isHovered && styles.hoveredText]}>
          Não tem uma conta? Cadastre-se
        </Text>
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
  logo: {
    width: 200,
    height: 100,
    marginBottom: 50,
    borderRadius: 10,
    borderWidth: 2, // Borda da imagem
    borderColor: '#ffde59', // Cor da borda
    shadowColor: '#000', // Cor da sombra
    shadowOffset: { width: 0, height: 3 }, // Deslocamento da sombra
    shadowOpacity: 0.3, // Opacidade da sombra
    shadowRadius: 6, // Radius da sombra
    elevation: 5, // Elevação para Android
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
    paddingVertical: 12,
    paddingHorizontal: 24,
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
    textAlign: 'center',
  },
  registerText: {
    color: 'white',
    marginTop: 20,
    fontSize: 16,
  },
  hoveredText: {
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
