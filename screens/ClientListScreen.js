import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClientListScreen = ({ navigation }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const existingClients = await AsyncStorage.getItem('clients');
        if (existingClients) {
          const parsedClients = JSON.parse(existingClients);
          console.log('Clients loaded:', parsedClients); // Verifique os dados carregados
          setClients(parsedClients);
        } else {
          console.log('No clients found'); // Caso não haja dados
        }
      } catch (error) {
        console.error('Failed to load clients', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleEdit = (client) => {
    navigation.navigate('Atualizar Cliente', {
      client,
      onUpdateClient: updatedClient => {
        setClients(prevClients => prevClients.map(c => 
          c.id === updatedClient.id ? updatedClient : c
        ));
      }
    });
  };

  const handleDelete = (clientId) => {
    Alert.alert(
      'Excluir Cliente',
      'Tem certeza de que deseja excluir este cliente?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              const existingClients = await AsyncStorage.getItem('clients');
              let clients = existingClients ? JSON.parse(existingClients) : [];
              clients = clients.filter(client => client.id !== clientId);
              await AsyncStorage.setItem('clients', JSON.stringify(clients));
              setClients(clients);
              Alert.alert('Sucesso', 'Cliente excluído com sucesso');
            } catch (error) {
              Alert.alert('Erro', 'Falha ao excluir cliente');
              console.error('Failed to delete client', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>Nome: {item.name}</Text>
      <Text style={styles.email}>Email: {item.email}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={() => handleEdit(item)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDelete(item.id)}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={clients}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum cliente cadastrado.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: '#DD4E50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
  },
});

export default ClientListScreen;
