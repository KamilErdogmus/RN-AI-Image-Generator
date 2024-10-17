import { View, Text } from "react-native";
import React from "react";

const Length = ({ num }: { num: number }) => {
  return (
    <View className="absolute bottom-3 right-3">
      <Text className="text-black text-lg">{num}/250</Text>
    </View>
  );
};

export default Length;
