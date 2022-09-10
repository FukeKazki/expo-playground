import { StatusBar } from 'expo-status-bar';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import * as ImageManipulator from "expo-image-manipulator";
import { useState } from 'react';

export default function App() {
  const [selectedImage, setSelectedImage] = useState<ImagePicker.ImageInfo>();

  const openImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('権限がないよ！')
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled) return;

    setSelectedImage(pickerResult);
  }

  const openShareDialog = async () => {
    if (!selectedImage) return;
    if (Platform.OS === 'web') return;

    const imageTmp = await ImageManipulator.manipulateAsync(selectedImage.uri);
    await Sharing.shareAsync(imageTmp.uri);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={{ uri: "https://i.imgur.com/TkIrScD.png" }} style={styles.logo} />
      <Text style={styles.instructions}>Hello Expo with @fukke0906</Text>
      <TouchableOpacity
        onPress={openImagePicker}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Pick a Photo</Text>
      </TouchableOpacity>

      {selectedImage && (
        <View>
          <Image
            source={{ uri: selectedImage.uri }}
            style={styles.thumbnail}
          />
          <TouchableOpacity
            onPress={openShareDialog}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    marginTop: 10,
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 20
  },
  thumbnail: {
    width: 300,
    height: 200,
    resizeMode: 'contain'
  }
});
