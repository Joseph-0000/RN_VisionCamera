import React from 'react';
import { View, Text, Button } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default function ImageUploader() {
  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  const pickMultipleImages = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then(images => {
      console.log(images);
    });
  };

  const pickVideo = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      console.log(video);
    });
  };

  return (
    <View>
      <Button title="Pick Image" onPress={pickImage} />
      <Button title="Pick Multiple Images" onPress={pickMultipleImages} />
      <Button title="Pick Video" onPress={pickVideo} />
    </View>
  );
}
