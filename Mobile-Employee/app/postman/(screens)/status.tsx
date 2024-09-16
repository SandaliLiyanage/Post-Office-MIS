import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { IP } from "../../../config";

// Status screen component
interface Mail {
  mailID: string;
  mailType: string;
  mailstatus: string;
}

const Status = () => {
  const [mail, setMail] = useState<Mail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

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
        setSelectedStatus(data.mailstatus); // Set the current mail status
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
        body: JSON.stringify({ mailID: mail?.mailID, newStatus }),
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
        <Text style={styles.label}>Current Status: {mail.mailstatus}</Text>
        <Text style={styles.label}>Receipient: </Text>
        <Text style={styles.label}>Receipient's Address: </Text>
      </View>

      <Text style={styles.label}>Update Status:</Text>
      <Picker
        selectedValue={selectedStatus}
        onValueChange={(itemValue) => {
          setSelectedStatus(itemValue); // Update selected status
          updateMailStatus(itemValue); // Call the update function on selection
        }}
        enabled={!updating} // Disable if status is updating
        style={styles.picker}
      >
        <Picker.Item label="To be Delivered" value="IN_TRANSIT" />
        <Picker.Item label="Delivered" value="DELIVERED" />
        <Picker.Item label="Returned" value="RETURNED" />
      </Picker>

      {updating && <ActivityIndicator size="small" color="#C60024" />}
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
  picker: {
    height: 50,
    marginBottom: 20,
  },
  noMailText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
});

export default Status;
