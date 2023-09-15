import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import {
  Camera,
  useCameraDevices,
  CameraRecordingOptions,
} from "react-native-vision-camera";
import Video from "react-native-video";

function App() {
  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    async function getPermission() {
      const newCameraPermission = await Camera.requestCameraPermission();
      console.log(newCameraPermission);
    }
    getPermission();
  }, []);

  const capturePhoto = async () => {
    if (!isRecording) {
      setIsCapturing(true);
      if (camera.current != null) {
        const photo = await camera.current.takePhoto({});
        setImageSource(photo.path);
        setIsCapturing(false);
        setShowCamera(false);
        console.log(photo.path);
      }
    }
  };

  const startRecording = async () => {
    if (!isCapturing) {
      setIsRecording(true);
      if (camera.current != null) {
        const recordingOptions = {
          flash: "on",
          onRecordingFinished: (video) => {
            console.log("Recording finished:", video.path);
            setVideoPath(video.path);
        setIsCapturing(false);
        setShowCamera(false);
          },
          onRecordingError: (error) => {
            console.error("Error recording video:", error);
          },
        };

        try {
          await camera.current.startRecording(recordingOptions);
        } catch (e) {
          console.log("Error starting recording:", e);
        }
      }
    }
  };

  const stopRecording = async () => {
    if (isRecording) {
      setIsRecording(false);
      if (camera.current != null) {
        try {
          await camera.current.stopRecording();
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  if (device == null) {
    return <Text>Camera not available.</Text>;
  }

  return (
    <View style={styles.container}>
      {showCamera ? (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showCamera}
            photo={true}
            video={true}
          />
          <View style={styles.buttonContainer}>
            {isCapturing ? null : (
              <TouchableOpacity
                style={styles.camButton}
                onPress={() => capturePhoto()}
              >
                <Text>Capture Photo</Text>
              </TouchableOpacity>
            )}
            {isRecording ? (
              <TouchableOpacity
                style={styles.camButton}
                onPress={() => stopRecording()}
              >
                <Text>Stop Recording</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.camButton}
                onPress={() => startRecording()}
              >
                <Text>Start Recording</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <>
          {imageSource !== "" ? (
            <Image
              style={styles.image}
              source={{
                uri: `file://${imageSource}`,
              }}
            />
          ) : null}
          {videoPath !== "" ? (
            <Video source={{ uri: videoPath }} style={styles.video} />
          ) : null}
          <View style={styles.backButton}>
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
              }}
              onPress={() => {
                setImageSource("");
                setVideoPath("");
                setShowCamera(true);
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              {imageSource !== "" && videoPath !== "" ? (
                <>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#000",
                      padding: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: "#000",
                    }}
                    onPress={() => capturePhoto()}
                  >
                    <Text style={{ color: "#fff", fontWeight: "500" }}>
                      Retake
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#000",
                      padding: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: "white",
                    }}
                    onPress={() => {
                      setShowCamera(true);
                      setImageSource("");
                      setVideoPath("");
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "500" }}>
                      Use Photo/Video
                    </Text>
                  </TouchableOpacity>
                </>
              ) : null}
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camButton: {
    backgroundColor: "#000",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    margin: 10,
  },
  backButton: {
    marginTop: 20,
  },
  image: {
    width: 350,
    height: 350,
  },
  video: {
    width: 350,
    height: 350,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});

export default App;
