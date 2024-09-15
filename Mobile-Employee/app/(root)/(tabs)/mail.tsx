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

const Mail = () => {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const response = await fetch(
          `http://${IP}:5000/mail/employee2?employeeID=0002`
        );
        const data = await response.json();
        setMails(data);
      } catch (error) {
        console.error("Error fetching mail items:", error);
      }
    };

    setLoading(true);
    fetchMails();
    setLoading(false);
  }, []);

  const handlePress = (id: string) => {
    console.log(`Mail item with ID ${id} pressed`);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#C60024" />
      </SafeAreaView>
    );
  }

  // Render each mail item
  interface MailItem {
    mailID: string;
    mailType: string;
    mailstatus: string;
  }

  const mailTypeNames: { [key: string]: string } = {
    NORMAL_MAIL: "Normal Mail",
    REGISTERED_MAIL: "Registered Mail",
    COURIER: "Parcel",
  };

  const getMailTypeName = (mailType: string): string => {
    return mailTypeNames[mailType] || "Unknown Type";
  };

  const mailStatusNames: { [key: string]: string } = {
    DELIVERED: "Delivered",
    IN_TRANSIT: "To be Delivered",
    RETURNED: "Returned",
  };

  const getMailStatusName = (mailStatus: string): string => {
    return mailStatusNames[mailStatus] || "Unknown Status";
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mails}
        renderItem={renderItem}
        keyExtractor={(item) => item.mailID}
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
    backgroundColor: "#F0F0F0",
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

// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   SafeAreaView,
//   TouchableOpacity,
// } from "react-native";

// const Mail = () => {
//   // Hardcoded mail data
//   const mails = [
//     { id: "1", category: "Normal", status: "Delivered" },
//     { id: "2", category: "Registered", status: "Not Delivered" },
//     { id: "3", category: "Parcel", status: "To Be Delivered" },
//   ];

//   // Handle mail item press
//   const handlePress = (id) => {
//     console.log(`Mail item with ID ${id} pressed`);
//   };

//   // Render each mail item
//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.mailItem}
//       onPress={() => handlePress(item.id)}
//     >
//       <Text style={styles.mailId}>Mail ID: {item.id}</Text>
//       <Text style={styles.mailCategory}>Category: {item.category}</Text>
//       <Text style={styles.mailStatus}>{item.status}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Assigned Mail Items</Text>
//       <FlatList
//         data={mails}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//       />
//     </SafeAreaView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
//   mailItem: {
//     padding: 12,
//     marginBottom: 10,
//     backgroundColor: "#f9f9f9",
//     borderRadius: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//     position: "relative",
//   },
//   mailId: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   mailCategory: {
//     fontSize: 16,
//     color: "gray",
//     marginTop: 4,
//   },
//   mailStatus: {
//     position: "absolute",
//     top: 12,
//     right: 12,
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#C60024",
//   },
// });

// export default Mail;
