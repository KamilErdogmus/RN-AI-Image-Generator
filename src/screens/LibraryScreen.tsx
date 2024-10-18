import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getItem } from "../utils/asyncstorage";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import uuid from "react-native-uuid";
import ImageViewing from "react-native-image-viewing";
import { NavigationProps } from "../router/Router";

const screenWidth = Dimensions.get("window").width;
const numCol = 3;
const imageSize = (screenWidth - (numCol + 1) * 2) / numCol - 18;

const LibraryScreen = () => {
  const [images, setImages] = useState<string[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const savedImages = await getItem("images");
        if (savedImages) {
          const parsedImages = JSON.parse(savedImages);
          setImages(parsedImages);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const renderItems = ({ item, index }: { item: string; index: number }) => {
    return (
      <TouchableOpacity
        className="m-2 border-zinc-500/60 border-2 rounded-md"
        onPress={() => {
          setSelectedImageIndex(index);
          setVisible(true);
        }}
      >
        <Image
          source={{ uri: item }}
          style={{ borderRadius: 4, width: imageSize, height: imageSize }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={["#CAF5FF", "#3572EF"]}
      className="flex-1"
    >
      <StatusBar backgroundColor="transparent" />
      <SafeAreaView className="flex-1">
        <View className="flex-row mx-4 justify-between items-center">
          <Pressable
            onPress={() => navigation.goBack()}
            className="p-2 border rounded-full"
          >
            <AntDesign name="arrowleft" size={27} color={"#5356FF"} />
          </Pressable>

          <Text className="text-xl font-bold text-black mr-10">
            My Creations
          </Text>
          <Pressable
            onPress={() => navigation.navigate("Home")}
            className="p-2"
          >
            <Ionicons name="home-sharp" size={27} color={"#090909"} />
          </Pressable>
        </View>
        {images.length == 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-xl">You haven't generated any images.</Text>
          </View>
        ) : (
          <View className="flex-1">
            <FlatList
              data={images}
              renderItem={renderItems}
              keyExtractor={() => String(uuid.v4())}
              numColumns={numCol}
              className="flex-1"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 20 }}
            />
            <ImageViewing
              images={images.map((uri) => ({ uri }))}
              imageIndex={selectedImageIndex}
              animationType={"fade"}
              presentationStyle={"overFullScreen"}
              visible={visible}
              onRequestClose={() => setVisible(false)}
            />
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LibraryScreen;
