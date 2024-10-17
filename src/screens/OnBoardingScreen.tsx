import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { setItem } from "../utils/asyncstorage";
import { StatusBar } from "expo-status-bar";
import { NavigationProps } from "../router/Router";

const { width, height } = Dimensions.get("window");

const OnBoardingScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  const handleDone = () => {
    navigation.navigate("GetStarted");
    setItem("onboarded", "1");
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity className="p-3 bg-zinc-400 rounded-full" {...props}>
        <Text className="text-black">Done</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1">
      <StatusBar backgroundColor="transparent" />
      <Onboarding
        onDone={handleDone}
        titleStyles={{ fontWeight: "bold" }}
        subTitleStyles={{ fontSize: 20, color: "#A9A9A9", fontWeight: "bold" }}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        containerStyles={{ padding: 15 }}
        pages={[
          {
            backgroundColor: "lightgray",
            image: (
              <View style={{ width, height, position: "relative" }}>
                <Image
                  resizeMode="cover"
                  source={require("../../assets/images/res4.jpeg")}
                />
                <Text className="text-white text-center w-full text-5xl absolute bottom-10 left-0">
                  Discover Your Creative Vision
                </Text>
              </View>
            ),
            title: "Discover Your Creative Vision",
            subtitle: "",
          },
          {
            backgroundColor: "#fff",
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../../assets/lottie/design.json")}
                  autoPlay
                  style={styles.lottieImg}
                  loop
                />
              </View>
            ),
            title: "Produce as you desire",
            subtitle:
              "Embrace the freedom to ignite your creativity and produce stunning visuals as you desire.",
          },
          {
            backgroundColor: "#7E60BF",
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../../assets/lottie/create.json")}
                  autoPlay
                  style={styles.lottieImg}
                  loop
                />
              </View>
            ),
            title: "Boost Productivity",
            subtitle:
              "Let each swipe empower your workflow, transforming visions into reality and igniting your creative spark.",
          },
        ]}
      />
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  lottie: { width: width * 0.9, height: width },
  lottieImg: { flex: 1 },
  backgroundImage: {
    width,
    height: "100%",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
