import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Button,
  Modal,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import mensagemService from "../services/MensagemService";

export default function HomeScreen({ navigation }) {
  const usuarios = mensagemService.getUsuarios();
  const [usuarioLogado, setUsuarioLogadoState] = useState(
    mensagemService.getUsuarioLogado()
  );
  const [contatos, setContatos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);

  const carregarContatos = useCallback((userId) => {
    setContatos(mensagemService.getContatosComUltimaMensagem(userId));
  }, []);

  useFocusEffect(
    useCallback(() => {
      const atual = mensagemService.getUsuarioLogado();
      setUsuarioLogadoState(atual);
      carregarContatos(atual.id);
    }, [carregarContatos])
  );

  const trocarUsuario = (user) => {
    mensagemService.setUsuarioLogado(user.id);
    setUsuarioLogadoState(user);
    carregarContatos(user.id);
    setModalAberto(false);
  };

  const abrirConversa = (contato) => {
    navigation.navigate("ChatScreen", {
      contatoId: contato.id,
      nome: contato.nome,
    });
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.dropdown}
        onPress={() => setModalAberto(true)}
      >
        <Text>Perfil: {usuarioLogado.nome}</Text>
        <Button title="Trocar perfil" onPress={() => setModalAberto(true)} />
      </Pressable>

      <Modal visible={modalAberto} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalTitulo}>Selecione um usuário:</Text>
          {usuarios.map((user) => (
            <View key={user.id} style={styles.itemUsuario}>
              <Button
                title={user.nome}
                onPress={() => trocarUsuario(user)}
              />
            </View>
          ))}
          <View style={styles.itemUsuario}>
            <Button
              title="Cancelar"
              color="gray"
              onPress={() => setModalAberto(false)}
            />
          </View>
        </View>
      </Modal>
      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.itemContato}
            onPress={() => abrirConversa(item)}
          >
            <Text style={styles.nomeContato}>{item.nome}</Text>
            <Button
              title="Abrir"
              onPress={() => abrirConversa(item)}
            />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  itemUsuario: {
    marginVertical: 6,
  },
  itemContato: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  nomeContato: {
    fontSize: 16,
  },
});
