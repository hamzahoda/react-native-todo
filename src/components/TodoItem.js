import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TodoItem = ({ item, onToggle, onDelete }) => (
  <View style={styles.row}>
    <TouchableOpacity onPress={() => onToggle(item.id)}>
      <Text style={[styles.text, item.done && styles.done]}>
        {item.text}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onDelete(item.id)}>
      <Text style={styles.delete}>✕</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  text: { fontSize: 16 },
  done: { textDecorationLine: "line-through", color: "#888" },
  delete: { color: "red", fontWeight: "bold" },
});

export default TodoItem;
