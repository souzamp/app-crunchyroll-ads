import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

import api from '../../src/axios/api'; // ajuste o caminho se necessário

export default function TelaCadastro() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = async () => {
    if (!nomeUsuario || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      console.log("Chegou aqui!")
      const response = await api.post('/cadastro-usuario', {
        nomeUsuario,
        senha
      });

      if (response.status === 201 || response.status === 200) {
        console.log("Sucesso', 'Cadastro realizado com sucesso!")
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        // Aqui você pode redirecionar para a tela de login
      } else {
        Alert.alert('Erro', 'Não foi possível cadastrar. Tente novamente.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Houve um problema com o cadastro.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Formulário de Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#ccc"
        onChangeText={setNomeUsuario}
        value={nomeUsuario}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#ccc"
        secureTextEntry
        onChangeText={setSenha}
        value={senha}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        placeholderTextColor="#ccc"
        secureTextEntry
        onChangeText={setConfirmarSenha}
        value={confirmarSenha}
      />

      <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#504b3c",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    color: '#ee6a2d',
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    height: 45,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10
  },
  botao: {
    backgroundColor: "#ee6a2d",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    width: '100%',
    alignItems: 'center'
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
