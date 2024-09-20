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
    border-radius: 7px; /* Rounds the corners */
    width: 100%; /* Adjust width as needed */
    height: 500px; /* Adjust height as needed */
    background-color: #BDBDBD; /* Background color */
  }
  .m-signature-pad--body {
    margin: 0px 0; /* Adds vertical margin to center the signature pad */
  }
  .m-signature-pad--footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px; /* Increases padding around buttons */
  background-color: #fff; /* Light background color */
  margin-top: 22px !important; /* Adds some space above the footer */
  border-radius: 0 0 10px 10px; /* Rounds the bottom corners */
  }
  .button {
  background-color: #0085FF !important; /* iOS blue color */
  color: white;
  border: none;
  width: 110px !important; /* Set a fixed width */
  height: 40px !important; /* Set a fixed height */
  font-size: 18px; /* Increased font size */
  font-weight: bold;
  border-radius: 6px !important; /* Increased border radius */
  transition: background-color 0.3s ease;
  display: flex; /* Use flexbox to center the text */
  justify-content: center; /* Center the text horizontally */
  align-items: center; /* Center the text vertically */
  }
  .button:active {
    background-color: #0056b3 !important; /* Darker blue */
  }
  .button.clear {
    background-color: #FA0000 !important; /* Red for clear button */
  }
  .button.clear:active {
    background-color: #D20000 !important; /* Darker red */
  }
`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Here</Text>
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
    paddingTop: 30,
    paddingBottom: 0,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
    marginBottom: 21,
    backgroundColor: "#C60024EF",
    padding: 8,
    borderRadius: 5,
    textAlign: "center",
  },
});

export default SignatureScreen;
