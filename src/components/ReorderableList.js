import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

export default function ReorderableList({
  items,
  itemHeight = 56,
  renderItem,
  onOrderChange,
}) {
  const N = items.length;

  const positions = useSharedValue(
    Object.fromEntries(items.map((it, i) => [String(it.id), i]))
  );

  React.useEffect(() => {
    positions.value = Object.fromEntries(items.map((it, i) => [String(it.id), i]));
  }, [items, positions]);

  const commitOrder = useCallback(
    (posObj) => {
      const next = [...items].sort(
        (a, b) => posObj[String(a.id)] - posObj[String(b.id)]
      );
      onOrderChange?.(next);
    },
    [items, onOrderChange]
  );

  return (
    <View style={{ height: N * itemHeight }}>
      {items.map((item) => (
        <ItemRow
          key={String(item.id)}
          item={item}
          N={N}
          itemHeight={itemHeight}
          positions={positions}
          renderItem={renderItem}
          commitOrder={commitOrder}
        />
      ))}
    </View>
  );
}

function ItemRow({ item, N, itemHeight, positions, renderItem, commitOrder }) {
  const id = String(item.id);
  const isActive = useSharedValue(false);
  const startY = useSharedValue(0);
  const dragY = useSharedValue(0);

  const swapObj = (obj, idA, idB) => {
    "worklet";
    const ia = obj[idA];
    const ib = obj[idB];
    const next = { ...obj, [idA]: ib, [idB]: ia };
    return next;
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      isActive.value = true;
      startY.value = positions.value[id] * itemHeight;
    })
    .onChange((e) => {
      dragY.value = e.translationY;

      const currentTop = startY.value + dragY.value;
      const newIndex = Math.max(
        0,
        Math.min(N - 1, Math.round(currentTop / itemHeight))
      );
      const curIndex = positions.value[id];
      if (newIndex !== curIndex) {
        const keys = Object.keys(positions.value);
        let otherId = null;
        for (let k of keys) {
          if (positions.value[k] === newIndex) {
            otherId = k;
            break;
          }
        }
        if (otherId) {
          positions.value = swapObj(positions.value, id, otherId);
        }
      }
    })
    .onFinalize(() => {
      dragY.value = withTiming(0, { duration: 150 });
      isActive.value = false;
      runOnJS(commitOrder)(positions.value);
    });

  const style = useAnimatedStyle(() => {
    const index = positions.value[id];
    const top = isActive.value
      ? startY.value + dragY.value
      : withTiming(index * itemHeight, { duration: 150 });

    return {
      position: "absolute",
      left: 0,
      right: 0,
      height: itemHeight,
      top,
      zIndex: isActive.value ? 10 : 0,
      transform: [{ scale: withTiming(isActive.value ? 1.02 : 1) }],
      shadowOpacity: isActive.value ? 0.1 : 0,
    };
  });

  const dragHandleProps = {
    wrap: (child) => <GestureDetector gesture={pan}>{child}</GestureDetector>,
  };

  return (
    <Animated.View style={[styles.rowWrap, style]}>
      {renderItem({ item, isActive, dragHandleProps })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  rowWrap: { backgroundColor: "transparent" },
});
