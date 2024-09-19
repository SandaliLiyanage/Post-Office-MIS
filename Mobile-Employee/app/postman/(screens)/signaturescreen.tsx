import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Signature from "react-native-signature-canvas";
import { useNavigation, useRoute } from "@react-navigation/native";
import { IP } from "../../../config";

// Signature screen component
const SignatureScreen = () => {
  const [signature, setSignature] = useState<string | null>(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { mailID } = route.params as { mailID: string };

  // This function will handle both setting the signature and submitting it
  const handleSignatureAndSubmit = async (signature: string) => {
    setSignature(signature);
    if (signature) {
      try {
        // Send signature to the server along with the status update
        await fetch(`http://${IP}:5000/mail/update-status`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mailID,
            newStatus: "DELIVERED",
            signature, // Include signature in the request
          }),
        });

        navigation.goBack();
      } catch (error) {
        console.error("Error submitting signature:", error);
      }
    }
  };

  // Customize the appearance of the buttons with webStyle prop
  const webStyle = `
    .m-signature-pad--footer {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 10px;
    }
    .button {
      background-color: #007AFF; /* iOS blue color */
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .button:active {
      background-color: #0056b3; /* Darker blue */
    }
    .button.clear {
      background-color: #FF3B30; /* Red for clear button */
    }
    .button.clear:active {
      background-color: #c12721; /* Darker red */
    }
  `;

  return (
    <View style={styles.container}>
      <Signature
        onOK={handleSignatureAndSubmit} // Call handleSignatureAndSubmit on save
        descriptionText="Sign Below"
        clearText="Clear"
        confirmText="Submit"
        webStyle={webStyle} // Pass custom styles here
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});

export default SignatureScreen;
