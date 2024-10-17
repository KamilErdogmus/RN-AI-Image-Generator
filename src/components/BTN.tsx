import { Text, TouchableOpacity } from "react-native";
import React from "react";

interface IBtnProps {
  title: string;
  onPress?: () => void;
  isDisabled?: boolean;
}

const BTN = ({ title, onPress, isDisabled }: IBtnProps) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPress}
      accessible={true}
      accessibilityLabel={title}
      className={` w-[95%] mt-8 py-3 rounded-full ${
        isDisabled ? " bg-zinc-300 border border-primary " : "bg-primary"
      } `}
    >
      <Text className="text-2xl text-center text-white font-semibold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default BTN;
