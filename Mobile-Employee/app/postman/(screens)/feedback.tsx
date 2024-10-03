import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useToast } from "react-native-toast-notifications";
import { IP } from "../../../config"; // Make sure to update the IP accordingly
import { useUser } from "../../auth/usercontext"; // Assuming you have a user context

export default function Feedback() {
  const [feedback, setFeedback] = useState("");
  const { show } = useToast();
  const { user } = useUser(); // Assuming user data contains employeeID

  const handleSubmit = async () => {
    if (feedback.trim() === "") {
      show("Feedback cannot be empty", {
        type: "danger",
        duration: 1800,
        style: { backgroundColor: "#B60021" },
      });
      return;
    }

    try {
      const response = await axios.post(`http://${IP}:5000/feedback`, {
        employeeID: user?.employeeID,
        feedback,
      });

      if (response.status === 200) {
        show("Feedback submitted successfully", { type: "success" });
        setFeedback("");
      } else {
        show("Failed to submit feedback", {
          type: "danger",
          duration: 1800,
          style: { backgroundColor: "#B60021" },
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      show("Error submitting feedback", {
        type: "danger",
        duration: 1800,
        style: { backgroundColor: "#B60021" },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Feedback...</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Write your feedback here..."
          placeholderTextColor="#D3D3D3"
          selectionColor="black"
          value={feedback}
          onChangeText={setFeedback}
          multiline
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} color="#282828" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9001E",
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  inputContainer: {
    width: "90%",
    marginBottom: 20,
  },
  textInput: {
    width: "100%",
    padding: 10,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    color: "white",
    minHeight: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    width: "40%",
  },
});
