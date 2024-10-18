import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import BTN from "../components/BTN";
import { useNavigation } from "@react-navigation/native";
import { getItem, removeItem } from "../utils/asyncstorage";
import { StatusBar } from "expo-status-bar";
import { NavigationProps } from "../router/Router";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GetStarted = () => {
  const navigation = useNavigation<NavigationProps>();
  const [empty, setEmpty] = useState<boolean>(false);

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  const startAnimation = () => {
    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
    translateY.value = withTiming(0, {
      duration: 1500,
      easing: Easing.inOut(Easing.ease),
    });
  };

  useEffect(() => {
    const checkCache = async () => {
      const images = await getItem("images");
      if (images) {
        setEmpty(false);
      }
    };

    checkCache();

    const unsubscribe = navigation.addListener("focus", () => {
      opacity.value = 0;
      translateY.value = 50;

      startAnimation();
    });

    return unsubscribe;
  }, [navigation]);

  const handleResetCache = async () => {
    Alert.alert(
      "Are you sure?",
      "This action will reset the cache.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              navigation.push("Onboarding");
            } catch (error) {
              console.error("Error resetting cache:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <ImageBackground
      className="flex-1"
      resizeMode="cover"
      source={require("../../assets/images/res.jpeg")}
    >
      <StatusBar backgroundColor="transparent" style="light" />
      <LinearGradient
        className="flex-1"
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0, y: 0.7 }}
        colors={["transparent", "#fff"]}
      >
        <View className="h-[60%]" />
        <View className="text-center items-center flex-1 justify-center">
          <Animated.View style={animatedStyle}>
            <Text className="text-2xl font-bold mx-2 text-center text-black/80">
              Spark Your Imagination with Captivating Imagery
            </Text>
            <Text className="text-[16] font-bold mt-4 text-neutral-600">
              Explore the depths of your creativity and experience the joy of
              transforming your concepts into stunning realities.
            </Text>
          </Animated.View>
          <BTN
            title="Get Started"
            onPress={() => navigation.navigate("Home")}
          />
          {!empty && (
            <TouchableOpacity
              onPress={handleResetCache}
              className="bg-red-500 rounded-full flex-row p-2 mt-8 w-[20%] justify-center items-center"
            >
              <Text className="text-white">Reset</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default GetStarted;
