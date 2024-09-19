import React, { useRef, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import Signature from "react-native-signature-canvas";
import { useNavigation, useRoute } from "@react-navigation/native";
import { IP } from "../../../config";

// Signature screen component
const SignatureScreen = () => {
  const [signature, setSignature] = useState<string | null>(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { mailID } = route.params as { mailID: string };

  const handleSignature = (signature: string) => {
    setSignature(signature);
  };

  const handleSubmit = async () => {
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

  return (
    <View style={styles.container}>
      <Signature
        onOK={handleSignature}
        descriptionText="Sign Below"
        clearText="Clear"
        confirmText="Save"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SignatureScreen;
