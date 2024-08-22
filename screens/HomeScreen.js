import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ route, navigation }) => {
  const { isAdmin, username } = route.params; // Recebe username do params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MENU DE AÇÕES</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Produtos (Admin)')}
      >
        <Text style={styles.buttonText}>Ver Produtos</Text>
      </TouchableOpacity>
      {isAdmin && (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Lista de Clientes')}
          >
            <Text style={styles.buttonText}>Ver Clientes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Lista de Fornecedores')}
          >
            <Text style={styles.buttonText}>Ver Fornecedores</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Registro de Fornecedores')}
          >
            <Text style={styles.buttonText}>Cadastrar Fornecedores</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Registro de Produtos')}
          >
            <Text style={styles.buttonText}>Cadastrar Produtos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Registro de Clientes')}
          >
            <Text style={styles.buttonText}>Cadastrar Cliente</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Galeria de Imagens')}
          >
            <Text style={styles.buttonText}>Galeria de Imagens</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E5E8B', // Cor de fundo similar às outras telas
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ffde59',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#004AAD',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
