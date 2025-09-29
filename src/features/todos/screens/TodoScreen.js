import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import useTodoStore from "../store/todoStore";
import TodoItem from "../../../components/TodoItem";

const TodoScreen = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, reorderTodos } =
    useTodoStore();
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  const sortedTodos = [
    ...todos.filter((t) => !t.done),
    ...todos.filter((t) => t.done),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Add a todo..."
        />
        <Button title="Add" onPress={handleAdd} />
      </View>

      <DraggableFlatList
        data={sortedTodos}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => reorderTodos(data)}
        renderItem={({ item, drag }) => (
          <View onLongPress={drag}>
            <TodoItem
              item={item}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  inputRow: {
    flexDirection: "row",
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    padding: 8,
    borderRadius: 5,
  },
});

export default TodoScreen;
