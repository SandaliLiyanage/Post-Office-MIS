import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { IP } from "../../../config";

// Mail item interface
interface MailItem {
  mailID: string;
  mailType: string;
  mailstatus: string;
}

// Define the type for mail sections
interface MailSection {
  title: string;
  data: MailItem[];
}

// Render section header with empty state message
const SectionHeaderWithEmptyMessage = ({
  section,
}: {
  section: MailSection;
}) => (
  <View>
    <Text style={styles.sectionHeader}>{section.title}</Text>
    {section.data.length === 0 && (
      <Text style={styles.emptySectionMessage}>No mail items</Text>
    )}
  </View>
);

// Mail screen component
const Mail = () => {
  const [mailSections, setMailSections] = useState<MailSection[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch mail items from the backend
  const fetchMails = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/mail/employee2?employeeID=0002`
      );
      const data = await response.json(); // Parse JSON data into a JavaScript object

      // Categorize mails by status
      const delivered = data.filter(
        (mail: any) => mail.mailstatus === "DELIVERED"
      );
      const inTransit = data.filter(
        (mail: any) => mail.mailstatus === "IN_TRANSIT"
      );
      const returned = data.filter(
        (mail: any) => mail.mailstatus === "RETURNED"
      );

      // Update the sections state with categorized mail data
      setMailSections([
        { title: "To be Delivered", data: inTransit },
        { title: "Delivered", data: delivered },
        { title: "Returned", data: returned },
      ]);
    } catch (error) {
      console.error("Error fetching mail items:", error);
    }
  };

  // Use useFocusEffect to refresh the list when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        await fetchMails(); // Ensure fetchMails completes before setting loading to false
        setLoading(false);
      };

      fetchData();
    }, [])
  );

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

  // Render the mail sectioned list
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={mailSections} // Sections of categorized mail items
        renderItem={renderItem} // Render each mail item using the renderItem function
        keyExtractor={(item) => item.mailID} // Use the mailID as the key for each item
        renderSectionHeader={({ section }) => (
          <SectionHeaderWithEmptyMessage section={section} />
        )} // Render section headers
      />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 12,
    marginBottom: 10,
    backgroundColor: "#C60024EF",
    padding: 8,
    borderRadius: 5,
  },
  emptySectionMessage: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 5,
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
