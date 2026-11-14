import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Mensagem({ mensagem, recebida }) {
  return (
    <View style={recebida ? styles.esquerda : styles.direita}>
      <View style={[styles.balao, recebida ? styles.recebida : styles.enviada]}>
        <Text>{mensagem}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  esquerda: {
    alignItems: "flex-start",
    marginVertical: 4,
    marginHorizontal: 8,
  },
  direita: {
    alignItems: "flex-end",
    marginVertical: 4,
    marginHorizontal: 8,
  },
  balao: {
    padding: 8,
    borderRadius: 4,
  },
  recebida: {
    backgroundColor: "#e0e0e0",
  },
  enviada: {
    backgroundColor: "#dcf8c6",
  },
});
