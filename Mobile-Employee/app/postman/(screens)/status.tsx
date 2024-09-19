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
  recepientName: string;
  addressNo: string;
  streetName: string;
  Locality: string;
  areaName: string;
}

const Status = () => {
  const [mail, setMail] = useState<Mail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

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
        setSelectedStatus(data.mailstatus);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching in-transit mail:", error);
      setLoading(false);
    }
  };

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
      fetchInTransitMail();
    } catch (error) {
      console.error("Error updating mail status:", error);
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchInTransitMail();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#C60024" />
      </SafeAreaView>
    );
  }

  if (!mail) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noMailText}>No mail items in transit.</Text>
      </SafeAreaView>
    );
  }

  const mailTypeNames: { [key: string]: string } = {
    NORMAL_MAIL: "Normal Mail",
    REGISTERED_MAIL: "Registered Mail",
    COURIER: "Parcel",
  };

  const getMailTypeName = (mailType: string): string => mailTypeNames[mailType];

  const mailStatusNames: { [key: string]: string } = {
    DELIVERED: "Delivered",
    IN_TRANSIT: "To be Delivered",
    RETURNED: "Returned",
  };

  const getMailStatusName = (mailStatus: string): string =>
    mailStatusNames[mailStatus];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Next to Deliver</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Mail ID:</Text>
        <Text style={styles.value}>{mail.mailID}</Text>

        <Text style={styles.label}>Type:</Text>
        <Text style={styles.value}>{getMailTypeName(mail.mailType)}</Text>

        <Text style={styles.label}>Current Status:</Text>
        <Text style={styles.value}>{getMailStatusName(mail.mailstatus)}</Text>

        <Text style={styles.label}>Recipient:</Text>
        <Text style={styles.value}>{mail.recepientName}</Text>

        <Text style={styles.label}>Recipient's Address:</Text>
        <Text style={styles.value}>
          {mail.addressNo}, {mail.streetName}, {mail.Locality}, {mail.areaName}
        </Text>
      </View>

      <Text style={styles.title}>Update the Status</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedStatus}
          onValueChange={(itemValue) => {
            setSelectedStatus(itemValue);
            updateMailStatus(itemValue);
          }}
          enabled={!updating}
          style={styles.picker}
        >
          <Picker.Item label="To be Delivered" value="IN_TRANSIT" />
          <Picker.Item label="Delivered" value="DELIVERED" />
          <Picker.Item label="Returned" value="RETURNED" />
        </Picker>
      </View>

      {updating && <ActivityIndicator size="small" color="#C60024" />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f7", // Soft background color
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    paddingBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 19,
    marginTop: 5,
  },
  label: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 16,
    marginBottom: 10,
    backgroundColor: "#C60024EF",
    padding: 8,
    borderRadius: 5,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderRadius: 10,
    paddingBottom: 7,
    marginBottom: 5,
    marginTop: 5,
    overflow: "hidden", // Ensure Picker is clipped to the border radius
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },

  picker: {
    height: 50,
    width: "100%",
  },

  noMailText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
});

export default Status;
