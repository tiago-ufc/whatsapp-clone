import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import Mensagem from "../components/Mensagem";
import mensagemService from "../services/MensagemService";

export default function ChatScreen({ route, navigation }) {
  const { contatoId, nome } = route.params;
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    navigation.setOptions({ title: nome });
    setMensagens(mensagemService.getMensagens(contatoId));
  }, [contatoId, nome]);

  const handleEnviar = () => {
    if (!texto.trim()) return;

    mensagemService.enviarMensagem(contatoId, texto);
    setMensagens([...mensagemService.getMensagens(contatoId)]);
    setTexto("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Mensagem mensagem={item.texto} recebida={item.recebida} />
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma mensagem..."
          value={texto}
          onChangeText={setTexto}
        />
        <Button title="Enviar" onPress={handleEnviar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
  },
});
