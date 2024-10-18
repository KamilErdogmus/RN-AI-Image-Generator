import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import BTN from "../components/BTN";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { generateImage } from "../utils/api";
import Length from "../components/Length";
import ImageViewing from "react-native-image-viewing";
import { getItem, removeItem, setItem } from "../utils/asyncstorage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NavigationProps } from "../router/Router";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const ImageDetail = () => {
  const route = useRoute();
  const { image, prompt, ratioWidth, ratioHeight } = route.params as {
    image: { generated_image: string };
    prompt: string;
    ratioWidth: number;
    ratioHeight: number;
  };
  const navigation = useNavigation<NavigationProps>();
  const [action, setAction] = useState<boolean>(false);
  const [detailText, setDetailText] = useState<string>(prompt);
  const [textLength, setTextLength] = useState<number>(prompt.length);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [downloadedFileName, setDownloadedFileName] = useState<string | null>(
    null
  );

  const images = [{ uri: image.generated_image }];

  const handleTextChange = (str: string) => {
    if (str.trim().length <= 250) {
      setDetailText(str);
      setTextLength(str.trim().length);
    }
  };

  const handleDelete = async () => {
    if (image && image.generated_image) {
      const key = "images";

      const existingImages = await getItem(key);
      const imageArray = existingImages ? JSON.parse(existingImages) : [];

      const updatedImageArray = imageArray.filter(
        (img: string) => img !== image.generated_image
      );

      if (updatedImageArray.length > 0) {
        await setItem(key, JSON.stringify(updatedImageArray));
      } else {
        await removeItem(key);
      }

      navigation.goBack();
      Toast.show({
        type: "info",
        text1: "Image has been deleted!",
      });
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const imageData = await generateImage(
        detailText,
        ratioWidth,
        ratioHeight
      );
      navigation.push("ImageDetail", {
        image: imageData,
        prompt: detailText,
        ratioWidth: ratioWidth,
        ratioHeight: ratioHeight,
      });
    } catch (error) {
      console.error("Image generation failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadImage = async () => {
    try {
      const uri = image.generated_image;
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      const downloadsDirectory = `${FileSystem.documentDirectory}Downloads`;
      const directoryInfo = await FileSystem.getInfoAsync(downloadsDirectory);
      if (!directoryInfo.exists) {
        await FileSystem.makeDirectoryAsync(downloadsDirectory, {
          intermediates: true,
        });
      }

      const cleanedFileName =
        `downloadedImage_${new Date().getTime()}.jpg`.replace(/\s+/g, "_");
      setDownloadedFileName(cleanedFileName);

      const fileUri = `${downloadsDirectory}/${cleanedFileName}`;

      const { uri: localUri } = await FileSystem.downloadAsync(uri, fileUri);

      await MediaLibrary.createAssetAsync(localUri);
      Toast.show({
        type: "success",
        text1: "Image Saved",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Image has not been saved.",
      });
    }
  };

  const handleShare = async () => {
    try {
      if (!downloadedFileName) {
        return;
      }

      const fileUri = `${FileSystem.documentDirectory}Downloads/${downloadedFileName}`;

      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        return;
      }

      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error("Error during sharing:", error);
    }
  };

  const addQuery = async (uri: string) => {
    try {
      const existingImages = await getItem("images");
      let imageArray = existingImages ? JSON.parse(existingImages) : [];
      if (!imageArray.includes(uri)) {
        imageArray.unshift(uri);
        await setItem("images", JSON.stringify(imageArray));
      }
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  const handleQuery = async () => {
    const key = "images";

    if (image && image.generated_image) {
      const existingImages = await getItem(key);
      const imageArray = existingImages ? JSON.parse(existingImages) : [];

      if (!imageArray.includes(image.generated_image)) {
        await addQuery(image.generated_image);
        Toast.show({
          type: "success",
          text1: "Image saved successfully!",
        });
        setAction(true);
      } else {
        const updatedImageArray = imageArray.filter(
          (img: string) => img !== image.generated_image
        );

        if (updatedImageArray.length > 0) {
          await setItem(key, JSON.stringify(updatedImageArray));
        } else {
          await removeItem(key);
        }
        setAction(false);

        Toast.show({
          type: "info",
          text1: "The image has been deleted from your creations.",
        });
      }
    }
  };

  const handleActionPress = (itemId: number) => {
    switch (itemId) {
      case 1:
        handleQuery();
        break;
      case 2:
        handleDelete();
        break;
      case 3:
        handleShare();
        break;
      case 4:
        handleDownloadImage();
        break;
      default:
        break;
    }
  };

  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0, {
        duration: 1500,
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

  const clearPrompt = () => {
    setDetailText("");
    setTextLength(0);
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={["#CAF5FF", "#3572EF"]}
      className="flex-1 "
    >
      <StatusBar backgroundColor="transparent" />
      <SafeAreaView className="flex-1 bg-[#f7f7f7da]">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="flex-row mx-4 justify-between items-center">
            <Pressable
              onPress={() => navigation.navigate("Home")}
              className="border rounded-full p-2 border-black/60"
            >
              <AntDesign name="arrowleft" size={27} color={"#5356FF"} />
            </Pressable>
            <Text className="text-xl font-bold text-black mr-2">Result</Text>
            <Pressable
              onPress={() => navigation.navigate("Library")}
              className="p-2"
            >
              <MaterialIcons name="photo-library" size={27} color={"#5356FF"} />
            </Pressable>
          </View>

          <View className="h-[500] rounded-xl w-full  px-3 mt-2 justify-center items-center shadow-xl">
            {isLoading ? (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#0000ff" />
                <Animated.Text
                  style={[
                    { fontSize: 32, color: "#000", zIndex: 20 },
                    animatedStyle,
                  ]}
                >
                  Regenerating...
                </Animated.Text>
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  disabled={isLoading}
                  onPress={() => setVisible(true)}
                >
                  <Image
                    source={{ uri: images[0].uri }}
                    style={{
                      width: width * 0.9,
                      height: height * 0.9,
                      flex: 1,
                      borderRadius: 15,
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>

                <ImageViewing
                  images={images}
                  imageIndex={0}
                  visible={visible}
                  animationType={"fade"}
                  presentationStyle={"overFullScreen"}
                  onRequestClose={() => setVisible(false)}
                />
              </View>
            )}
          </View>
          <View className="mx-6 justify-center items-center">
            <BTN
              title="Regenerate"
              onPress={handleGenerate}
              isDisabled={isLoading}
            />

            <View className="h-fit w-full mt-3 shadow ">
              <View className="flex-row items-center justify-between">
                <Text className="text-xl">Your Prompt</Text>
                <TouchableOpacity
                  className="bg-primary rounded-full p-1"
                  onPress={clearPrompt}
                >
                  <Text className="text-white font-semibold">Clear Prompt</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                placeholder="Type a prompt..."
                style={{ textAlignVertical: "top" }}
                multiline
                className="rounded-lg flex-wrap text-black text-lg font-semibold pl-3 bg-white mt-2 pt-2 h-32"
                placeholderTextColor={"#adadad"}
                onChangeText={handleTextChange}
                value={detailText}
              />
              <Length num={textLength} />
            </View>

            <View className="flex-row w-full justify-center gap-x-5 mt-3 items-center">
              {controllersData.map((item) => (
                <Pressable
                  onPress={() => handleActionPress(item.id)}
                  key={item.id}
                  className={`shadow py-3 px-8 rounded-lg ${
                    item.id === 1 && action ? "bg-primary" : "bg-white"
                  }`}
                >
                  {item.icon(item.id === 1 && action)}
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ImageDetail;

const controllersData = [
  {
    id: 1,
    icon: (isSelected: boolean) => (
      <FontAwesome6
        name="bookmark"
        size={28}
        color={isSelected ? "#fff" : "#adadad"}
      />
    ),
  },
  {
    id: 2,
    icon: () => <Ionicons name="trash-outline" size={28} color="red" />,
  },
  {
    id: 3,
    icon: () => <Ionicons name="share-outline" size={28} color={"#adadad"} />,
  },
  {
    id: 4,
    icon: () => <AntDesign name="download" size={28} color={"#adadad"} />,
  },
];
