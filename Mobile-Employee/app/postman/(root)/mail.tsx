import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { IP } from "../../../config";

// Mail screen component
const Mail = () => {
  // State to store the fetched mail items
  const [mails, setMails] = useState([]);

  // State to store the loading status
  const [loading, setLoading] = useState(true);

  // Fetch mail items from the backend
  useEffect(() => {
    const fetchMails = async () => {
      try {
        const response = await fetch(
          `http://${IP}:5000/mail/employee2?employeeID=0002`
        );
        const data = await response.json(); // Parse JSON data into an JavaScript object
        setMails(data); // Update the mails state with the fetched data
      } catch (error) {
        console.error("Error fetching mail items:", error);
      }
    };

    // Fetch the mail data
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchMails()]); // Ensure fetchMails completes before setting loading to false
      setLoading(false);
    };

    fetchData();
  }, []);

  // Handle mail item press
  const handlePress = (id: string) => {
    console.log(`Mail item with ID ${id} pressed`);
  };

  // Handle loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#C60024" />
      </SafeAreaView>
    );
  }

  // Mail item interface
  interface MailItem {
    mailID: string;
    mailType: string;
    mailstatus: string;
  }

  // Mail type names
  const mailTypeNames: { [key: string]: string } = {
    NORMAL_MAIL: "Normal Mail",
    REGISTERED_MAIL: "Registered Mail",
    COURIER: "Parcel",
  };

  const getMailTypeName = (mailType: string): string => {
    return mailTypeNames[mailType];
  };

  // Mail status names
  const mailStatusNames: { [key: string]: string } = {
    DELIVERED: "Delivered",
    IN_TRANSIT: "To be Delivered",
    RETURNED: "Returned",
  };

  const getMailStatusName = (mailStatus: string): string => {
    return mailStatusNames[mailStatus];
  };

  // Render each mail item
  const renderItem = ({ item }: { item: MailItem }) => (
    <TouchableOpacity
      style={styles.mailItem}
      onPress={() => handlePress(item.mailID)}
    >
      <Text style={styles.mailId}>Mail ID: {item.mailID}</Text>
      <Text style={styles.mailCategory}>{getMailTypeName(item.mailType)}</Text>
      <Text style={styles.mailStatus}>
        {getMailStatusName(item.mailstatus)}
      </Text>
    </TouchableOpacity>
  );

  // Render the mail list
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mails} // Pass the mail items to the FlatList component
        renderItem={renderItem} // Render each mail item using the renderItem function
        keyExtractor={(item) => item.mailID} // Use the mailID as the key for each item
      />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  mailItem: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: "relative",
  },
  mailId: {
    fontSize: 18,
    fontWeight: "bold",
  },
  mailCategory: {
    fontSize: 16,
    color: "gray",
    marginTop: 4,
  },
  mailStatus: {
    position: "absolute",
    top: 12,
    right: 12,
    fontSize: 14,
    fontWeight: "bold",
    color: "#C60024",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Mail;
