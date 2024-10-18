# AI Image Generator in React Native-EXPO

## Description

This is an AI Image Generator app built using React Native-EXPO. The app allows users to generate AI images based on their input and includes several key features to enhance user experience:

- Generate images in the most preferred sizes for various use cases.
- Download the generated images to the device's local storage.
- Share the generated images through different platforms.
- Regenerate images based on user input.
- View generated images in detail with zoom functionality.
- Edit the prompt used for image generation.
- Save generated images to **Async Storage** for persistent use.
- View, manage, and delete saved images from storage.
- **Efficient performance**: Optimized for fast image generation and smooth navigation, even with large datasets or image collections.

The app utilizes a powerful AI image generation API, which allows users to create unique images based on descriptive prompts. This API handles requests efficiently, ensuring fast response times and high-quality output, making it easy for users to explore their creativity.

## Libraries and Tools

- **typescript**: Enhances development with static typing, improving error detection, maintainability, reliability, and refactoring ease.
- **nativewind**: Enables utility-based styling similar to Tailwind CSS for React Native components.
- **@expo/vector-icons**: Provides customizable icons used throughout the app for UI components.
- **@react-native-async-storage/async-storage**: For persistent storage to save user data, such as image bookmarks.
- **@react-navigation/native**: Core navigation library for managing screen transitions.
- **@react-navigation/native-stack**: Provides stack-based navigation, allowing screens to be pushed and popped.
- **expo-file-system**: Provides access to the device’s file system for downloading and saving images.
- **expo-linear-gradient**: Used for creating gradient effects in the app's UI.
- **expo-media-library**: Allows the app to save and access images from the device's media library.
- **expo-sharing**: Enables sharing images to other apps or platforms.
- **expo-status-bar**: Manages the appearance of the device’s status bar.
- **axios**: Used for making HTTP requests to the AI image generation API.
- **lottie-react-native**: Handles animations in the app, like loading spinners or splash screens.
- **react-native-dotenv**: Manages environment variables securely in the app.
- **react-native-image-viewing**: Provides a full-screen image viewing experience with zooming and swiping functionalities.
- **react-native-onboarding-swiper**: Implements onboarding screens for first-time users.
- **react-native-reanimated**: Used for creating fluid animations and transitions.
- **react-native-safe-area-context**: Ensures the app content is rendered within safe areas like notches and status bars.
- **react-native-screens**: Optimizes navigation performance by using native screen components.
- **react-native-toast-message**: Displays in-app toast messages for user feedback (e.g., success or error notifications).
- **react-native-uuid**: Generates unique identifiers for images and other elements within the app.

## Preview

![](/assets/G_AI-Img_Generator.gif)

## API

[API Documentation](https://rapidapi.com/rphrp1985/api/chatgpt-42)

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/KamilErdogmus/RN-AI-Image-Generator.git
```

2. Navigate to the project directory:

```bash
cd your-repository
```

3. Install dependencies:

#### Using npm

```bash
npm install
```

#### Using yarn

```bash
yarn install
```

If you're using MacOS, navigate to the ios folder and install CocoaPods dependencies:

```bash
cd ios
```

```bash
 pod install
```

```bash
 cd ..
```

## Step 1: Start the Metro Server

First, you'll need to start **Metro**, the JavaScript _bundler_ that comes with React Native.

To start Metro, run the following command from the _root_ of your React Native project:

#### Using npm

```bash
npx expo start
```

#### Using Yarn

```bash
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

#### Using npm

```bash
npx expo run android
```

#### Using Yarn

```bash
yarn android
```

### For iOS

##### using npm

```bash
npx expo run ios
```

#### Using Yarn

```bash
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
