import { useState } from 'react';
import { View, TextInput, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';

import { useNavigation } from '@react-navigation/native';

//importando axios
import api from '../src/axios/api'

export default function Login() {
  // constante de nevegacao
  const navigation = useNavigation();

  // Definindo constantes
  const [usuario, setUsuario] = useState();
  const [senha, setSenha] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [mensagemModal, setMensagemModal] = useState('');

  const telaCadastro = () => {
    navigation.navigate('paginas/TelaCadastro');
  }

  const validarLogin = async () => {
    if (!usuario || !senha || usuario.trim() === '' || senha.trim() === '') {
      setMensagemModal('Por favor, preencha todos os campos.');
      setModalVisible(true);
      return;
    }

    try {
      const response = await api.get('/validar-login', {
        params: {
          usuario: usuario,
          senha: senha
        }
      });

      if (response.status === 200) {
        console.log('Login válido');
        
        navigation.navigate('paginas/Home'); // Navega para o Drawer (Home)
      } else {
        setMensagemModal('Usuário ou senha incorretos.');
        setModalVisible(true);
      }

      console.log('Resposta:', response.data);
    }
    catch (error) {
      console.error('Erro:', error);
      setMensagemModal('Não foi possível conectar. Tente novamente mais tarde.');
      setModalVisible(true);
    }
  };

  // Funções para links
  const esqueciSenha = () => {
    // Ação de redirecionamento ou modal
    alert('Acesse o link para recuperar a senha.');
    // Exemplo de redirecionamento para uma URL:
    // Linking.openURL('https://www.seusite.com/recuperar-senha');
  };

  const faleConosco = () => {
    // Ação de redirecionamento ou modal
    alert('Entre em contato conosco pelo e-mail: suporte@seusite.com');
    // Exemplo de redirecionamento para email:
    // Linking.openURL('mailto:suporte@seusite.com');
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTexto}>{mensagemModal}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalBotao}>
              <Text style={{ color: '#fff' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Image
        source={require("../src/assets/logo2.png")}
        style={styles.logo}
      />

      <Text style={styles.text}>Bem-Vindo ao Crunchyroll de ADS!</Text>

      <TextInput
        style={styles.input}
        onChangeText={value => setUsuario(value)}
        placeholder="Digite o usuário"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        onChangeText={value => setSenha(value)}
        placeholder="Digite a senha"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.botaoLogin} onPress={validarLogin}>
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoCadastro} onPress={telaCadastro}>
        <Text>NOVA CONTA</Text>
      </TouchableOpacity>

      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={esqueciSenha}>
          <Text style={styles.linkText}>Esqueci a senha</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={faleConosco}>
          <Text style={styles.linkText}>Fale conosco</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#504b3c",
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    marginTop: -150,
  },
  input: {
    height: 45,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff'
  },
  text: {
    fontFamily: "Cochin",
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ee6a2d'
  },
  botaoLogin: {
    alignItems: 'center',
    backgroundColor: '#ee6a2d',
    padding: 10,
    width: "80%",
    height: 45,
    borderRadius: 10,
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 30
  },
  botaoCadastro: {
    alignItems: 'center',
    backgroundColor: '#416f4b',
    padding: 10,
    width: "80%",
    height: 45,
    marginTop: 10,
    color: "#ffffff",
    borderRadius: 10,
    fontWeight: 'bold',
    fontSize: 20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%'
  },
  modalTexto: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333'
  },
  modalBotao: {
    backgroundColor: '#ee6a2d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  linksContainer: {
    marginTop: 20
  },
  linkText: {
    color: '#ee6a2d',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginVertical: 5,
    textAlign: "center"
  }
})
