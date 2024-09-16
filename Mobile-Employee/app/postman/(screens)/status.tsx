import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { IP } from "../../../config";

// Status screen component
const Status = () => {
  const [mail, setMail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch the first IN_TRANSIT mail item
  const fetchInTransitMail = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://${IP}:5000/mail/in-transit?employeeID=0002`
      );
      const data = await response.json();
      if (data.message) {
        setMail(null);
      } else {
        setMail(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching in-transit mail:", error);
      setLoading(false);
    }
  };

  // Update mail status
  const updateMailStatus = async (newStatus: string) => {
    try {
      setUpdating(true);
      await fetch(`http://${IP}:5000/mail/update-status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mailID: mail.mailID, newStatus }),
      });
      setUpdating(false);
      // Fetch the next mail item after status update
      fetchInTransitMail();
    } catch (error) {
      console.error("Error updating mail status:", error);
      setUpdating(false);
    }
  };

  useEffect(() => {
    // Fetch the first in-transit mail when the component mounts
    fetchInTransitMail();
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#C60024" />
      </SafeAreaView>
    );
  }

  // If no mail is found
  if (!mail) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noMailText}>No mail items in transit.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mailInfo}>
        <Text style={styles.label}>Mail ID: {mail.mailID}</Text>
        <Text style={styles.label}>Mail Type: {mail.mailType}</Text>
        <Text style={styles.label}>Status: {mail.mailstatus}</Text>
      </View>
      <View style={styles.buttons}>
        <Button
          title="Mark as Delivered"
          onPress={() => updateMailStatus("DELIVERED")}
          disabled={updating}
        />
        <Button
          title="Mark as Returned"
          onPress={() => updateMailStatus("RETURNED")}
          color="red"
          disabled={updating}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  mailInfo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noMailText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
});

export default Status;
