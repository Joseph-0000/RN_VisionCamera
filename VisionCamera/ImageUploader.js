import React, { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';

export default function ImageUploader({ onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setSelectedImage(image.path); // Store the image path
    });
  };

  const pickVideo = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      console.log(video);
      setSelectedVideo(video.path); // Store the video path
    });
  };

  const removeImage = () => {
    setSelectedImage(null); // Clear the selected image
  };

  const removeVideo = () => {
    setSelectedVideo(null); // Clear the selected video
  };

  return (
    <View>
      
      <Button title="Pick Image"  onPress={pickImage} />
      <Button title="Pick Video" onPress={pickVideo} />
      <TouchableOpacity
        style={{
          backgroundColor: "#000",
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          borderWidth: 2,
          borderColor: "#fff",
          width: 100,
          alignSelf: 'flex-end',
        }}
        onPress={() => onClose()} // Close the ImageUploader
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Close</Text>
      </TouchableOpacity>

      {selectedImage && (
        <View>
          <Text>Selected Image:</Text>
          <TouchableOpacity onPress={removeImage} style={{ position: 'absolute', top: 0, right: 0 }}>
            <Text style={{ color: 'white', fontSize: 24, marginBottom: 16 }}>x</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 300, height: 300, marginTop: 16 }}
          />
        </View>
      )}

      {selectedVideo && (
        <View>
          <Text>Selected Video:</Text>
          <TouchableOpacity onPress={removeVideo} style={{ position: 'absolute', top: 0, right: 0 }}>
            <Text style={{ color: 'white', fontSize: 24, marginBottom: 16 }}>x</Text>
          </TouchableOpacity>
          <Video
            source={{ uri: selectedVideo }}
            style={{ width: 300, height: 300, marginTop: 16 }}
            controls
          />
        </View>
      )}
    </View>
  );
}
