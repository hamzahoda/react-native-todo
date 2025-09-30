import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { palettes } from "../theme/colors";

export default function TodoItem({ item, onToggle, onDelete, dragHandleProps, theme = "light" }) {
  const C = palettes[theme];
  const s = useMemo(() => makeStyles(C), [C]);

  const Handle = ({ children }) =>
    dragHandleProps?.wrap ? dragHandleProps.wrap(children) : children;

  return (
    <View style={s.row}>
      <Handle>
        <View style={s.handle}>
          <Text style={s.handleText}>≡</Text>
        </View>
      </Handle>

      <TouchableOpacity style={{ flex: 1 }} onPress={() => onToggle?.(item.id)} activeOpacity={0.7}>
        <Text style={[s.text, item.done && s.done]} numberOfLines={2}>
          {item.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDelete?.(item.id)} hitSlop={10}>
        <Text style={s.delete}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const makeStyles = (C) =>
  StyleSheet.create({
    row: {
      height: 56,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderColor: C.border,
      backgroundColor: C.card,
    },
    handle: { width: 28, alignItems: "center", justifyContent: "center", marginRight: 8 },
    handleText: { fontSize: 18, color: C.handle },
    text: { fontSize: 16, color: C.text },
    done: { color: C.done, textDecorationLine: "line-through" },
    delete: { color: C.delete, fontWeight: "600" },
  });
