import {
  Text,
  ScrollView,
  View,
  Pressable,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import BTN from "../components/BTN";
import { useNavigation } from "@react-navigation/native";
import { generateImage } from "../utils/api";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import Length from "../components/Length";
import { StatusBar } from "expo-status-bar";
import { NavigationProps } from "../router/Router";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface Size {
  width: number;
  height: number;
}

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [textLength, setTextLength] = useState<number>(0);
  const [selectedRatio, setSelectedRatio] = useState<string>(
    aspectRationData[0].ratio
  );
  const [size, setSize] = useState<Size>({
    width: aspectRationData[0].width,
    height: aspectRationData[0].height,
  });

  const handleTextChange = (str: string) => {
    if (str.trim().length <= 250) {
      setText(str);
      setTextLength(str.trim().length);
    }
  };

  const handleSelectRatio = (ratio: IAspectRatioProps) => {
    setSelectedRatio(ratio.ratio);
    setSize({ width: ratio.width, height: ratio.height });
  };

  const handleGenerate = async () => {
    if (text.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Please enter a prompt.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const imageData = await generateImage(text, size.width, size.height);
      navigation.push("ImageDetail", {
        image: imageData,
        prompt: text,
        ratioWidth: size.width,
        ratioHeight: size.height,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={["#CAF5FF", "#3572EF"]}
      className="flex-1"
    >
      <StatusBar backgroundColor="#f7f7f7da" />
      <SafeAreaView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-4 bg-[#f7f7f7da]"
        >
          {isLoading ? (
            <View className="flex-1 h-[800] justify-center items-center">
              <ActivityIndicator size="large" color="#5356FF" />
              <Animated.Text
                style={[
                  { fontSize: 32, color: "#000", zIndex: 20 },
                  animatedStyle,
                ]}
              >
                Generating Image...
              </Animated.Text>
            </View>
          ) : (
            <View className="flex-1">
              <View className="my-5 flex flex-row justify-between items-center">
                <View className="flex-row items-center justify-center gap-6">
                  <Pressable
                    onPress={() => navigation.navigate("GetStarted")}
                    className="border rounded-full p-1 border-black/60"
                  >
                    <AntDesign name="arrowleft" size={27} color={"#5356FF"} />
                  </Pressable>

                  <Pressable onPress={() => navigation.navigate("Library")}>
                    <MaterialIcons
                      name="photo-library"
                      size={27}
                      color={"#5356FF"}
                    />
                  </Pressable>
                </View>

                <View className="flex-row gap-x-4 items-center justify-center">
                  <View>
                    <FontAwesome name="bell" size={24} color="black" />
                    <View className="absolute z-30 scale-50 -top-px -right-1 w-4 h-4 rounded-full bg-red-600" />
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="bg-[#7C00FE] flex-row gap-x-1 p-1 justify-center items-center px-2 rounded-full"
                  >
                    <FontAwesome6 name="crown" size={20} color="white" />
                    <Text className="text-base text-white font-bold">
                      PREMIUM
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="h-[40vh] rounded-3xl bg-white drop-shadow-md p-4 relative">
                <View className="flex-row items-center justify-between border-b border-zinc-600">
                  <Text className="text-xl">Enter Prompt</Text>
                  <TouchableOpacity
                    className="bg-primary rounded-full p-[3]"
                    onPress={() => {
                      setText("");
                      setTextLength(0);
                    }}
                  >
                    <Text className="text-white font-semibold">
                      Clear Prompt
                    </Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  placeholder="Type a prompt..."
                  style={{ textAlignVertical: "top" }}
                  multiline
                  className="text-lg rounded-lg flex-wrap pt-2 to-black/90 w-full h-[70%]"
                  placeholderTextColor={"#adadad"}
                  defaultValue={text}
                  onChangeText={handleTextChange}
                />
                <Length num={textLength} />
              </View>
              <View className="flex-row mt-5 justify-around">
                {addons.map((item) => (
                  <View
                    key={item.id}
                    className="flex-row border border-zinc-400 bg-primary/10 items-center gap-x-3 px-4 py-3 rounded-2xl shadow"
                  >
                    <View>{item.icon}</View>
                    <Text className="text-zinc-700">{item.title}</Text>
                  </View>
                ))}
              </View>
              <View className="my-5 rounded-xl drop-shadow-sm pt-3 pb-5 px-4">
                <Text className="text-black text-xl my-3 capitalize font-semibold">
                  Aspect Ratio
                </Text>
                <View className="flex-row gap-5 flex-wrap">
                  {aspectRationData.map((item) => (
                    <Pressable
                      key={item.id}
                      className={`${
                        item.ratio === selectedRatio
                          ? "bg-primary border"
                          : "bg-black/5"
                      } justify-center items-center rounded-md py-2 px-3 w-[27%]`}
                      onPress={() => handleSelectRatio(item)}
                    >
                      <Text
                        className={`${
                          item.ratio === selectedRatio
                            ? "text-white"
                            : "text-black"
                        } self-center font-medium text-sm`}
                      >
                        {item.ratio}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
              <View>
                <BTN title="Generate" onPress={handleGenerate} />
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;

const addons = [
  {
    id: 1,
    title: "Add Photo",
    icon: <Ionicons name="image-outline" size={24} color={"#adadad"} />,
  },
  {
    id: 2,
    title: "Inspiration",
    icon: <FontAwesome6 name="lightbulb" size={24} color={"#adadad"} />,
  },
];

interface IAspectRatioProps {
  id: number;
  width: number;
  height: number;
  ratio: string;
}

const aspectRationData: IAspectRatioProps[] = [
  { id: 1, width: 1080, height: 1080, ratio: "1080x1080" },
  { id: 2, width: 720, height: 1280, ratio: "720x1280" },
  { id: 3, width: 720, height: 480, ratio: "720x480" },
  { id: 4, width: 800, height: 400, ratio: "800x400" },
  { id: 5, width: 1250, height: 1000, ratio: "1250x1000" },
  { id: 6, width: 832, height: 1216, ratio: "832x1216" },
];
