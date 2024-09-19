import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
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
  const navigation = useNavigation();

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

  const updateMailStatus = async (newStatus: string) => {
    try {
      setUpdating(true);
      if (mail?.mailType === "REGISTERED_MAIL" && newStatus === "DELIVERED") {
        // If it's registered mail and delivered, navigate to the signature screen
        (navigation as any).navigate("signaturescreen", {
          mailID: mail.mailID,
        });
      } else {
        await fetch(`http://${IP}:5000/mail/update-status`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mailID: mail?.mailID, newStatus }),
        });
        fetchInTransitMail();
      }

      setUpdating(false);
    } catch (error) {
      console.error("Error updating mail status:", error);
      setUpdating(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchInTransitMail();
    }, [])
  );

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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#00AC11" }]}
          onPress={() => updateMailStatus("DELIVERED")}
          disabled={updating}
        >
          <Text style={styles.buttonText}>Delivered</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#D80000" }]}
          onPress={() => updateMailStatus("RETURNED")}
          disabled={updating}
        >
          <Text style={styles.buttonText}>Returned</Text>
        </TouchableOpacity>
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
    marginTop: 28,
    marginBottom: 22,
    backgroundColor: "#C60024EF",
    padding: 8,
    borderRadius: 5,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 5,
    marginHorizontal: 15,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  noMailText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
});

export default Status;
