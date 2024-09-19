import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
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
  .m-signature-pad {
    margin: auto; /* Centers the signature pad horizontally */
    box-shadow: none; /* Removes shadow */
    border: 0px solid #e8e8e8; /* Adds a light border */
    width: 100%; /* Adjust width as needed */
    height: 500px; /* Adjust height as needed */
    background-color: grey; /* Background color */
  }
  .m-signature-pad--body {
    margin: 0px 0; /* Adds vertical margin to center the signature pad */
  }
  .m-signature-pad--footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 15px; /* Increases padding around buttons */
  }
  .button {
    background-color: #007AFF; /* iOS blue color */
    color: white;
    border: none;
    padding: 15px 30px; /* Increased padding for larger buttons */
    font-size: 18px; /* Increased font size */
    font-weight: bold;
    border-radius: 8px; /* Increased border radius */
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
      <Text>Sign Here</Text>
      <Signature
        onOK={handleSignatureAndSubmit} // Call handleSignatureAndSubmit on save
        descriptionText=""
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
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
});

export default SignatureScreen;
