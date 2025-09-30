import React, { useState, useMemo } from "react";
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import useTodoStore from "../store/todoStore";
import ReorderableList from "../../../components/ReorderableList";
import TodoItem from "../../../components/TodoItem";
import { useThemeStore } from "../store/themeStore";
import { palettes } from "../../../theme/colors";
import { Sun, Moon } from "lucide-react-native";

export default function TodoScreen() {
  const { todos, addTodo, toggleTodo, deleteTodo, reorderTodos } = useTodoStore();
  const { theme, toggleTheme } = useThemeStore();
  const C = palettes[theme];
  const [text, setText] = useState("");

  const s = useMemo(() => makeStyles(C), [C]);

  const handleAdd = () => {
    const t = text.trim();
    if (t) { addTodo(t); setText(""); }
  };

  const sortedTodos = useMemo(
    () => [...todos.filter((t) => !t.done), ...todos.filter((t) => t.done)],
    [todos]
  );

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>My Todos</Text>

        <View style={s.right}>
          <Text style={s.muted}>Theme</Text>
         

          <TouchableOpacity onPress={toggleTheme} style={{ padding: 8 }}>
            {theme === "dark" ? (
                <Sun size={22} color={C.accent} />
            ) : (
                <Moon size={22} color={C.accent} />
            )}
            </TouchableOpacity>

        </View>

        <View style={s.inputRow}>
          <TextInput
            style={s.input}
            value={text}
            onChangeText={setText}
            placeholder="Add a task..."
            placeholderTextColor={C.textMuted}
            returnKeyType="done"
            onSubmitEditing={handleAdd}
          />
          <Button title="Add" onPress={handleAdd} color={C.accent} />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <ReorderableList
          items={sortedTodos}
          itemHeight={56}
          onOrderChange={reorderTodos}
          renderItem={({ item, dragHandleProps }) => (
            <TodoItem
              item={item}
              dragHandleProps={dragHandleProps}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              theme={theme}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (C) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: C.bg },
    header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
    title: { fontSize: 20, fontWeight: "700", color: C.text, marginBottom: 8 },
    right: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
    muted: { color: C.textMuted },
    inputRow: { flexDirection: "row", gap: 8 },
    input: {
      flex: 1, height: 44, borderRadius: 12, paddingHorizontal: 12,
      backgroundColor: C.inputBg, borderWidth: 1, borderColor: C.inputBorder, color: C.text,
    },
  });
