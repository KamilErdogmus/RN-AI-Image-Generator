import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ImageDetail from "../screens/ImageDetail";
import GetStarted from "../screens/GetStarted";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import { useEffect, useState } from "react";
import { getItem } from "../utils/asyncstorage";
import LibraryScreen from "../screens/LibraryScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type RootStackParamList = {
  Home: undefined;
  Onboarding: undefined;
  ImageDetail: {
    image: { generated_image: string };
    prompt: string;
    ratioWidth: number;
    ratioHeight: number;
  };
  GetStarted: undefined;
  Library: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = () => {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem("onboarded");
    if (onboarded === "1") {
      setShowOnboarding(false);
    } else setShowOnboarding(true);
  };

  if (showOnboarding === null) return null;
  return (
    <Stack.Navigator
      initialRouteName={showOnboarding ? "Onboarding" : "GetStarted"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
      <Stack.Screen name="ImageDetail" component={ImageDetail} />
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Library" component={LibraryScreen} />
    </Stack.Navigator>
  );
};

export default Router;
