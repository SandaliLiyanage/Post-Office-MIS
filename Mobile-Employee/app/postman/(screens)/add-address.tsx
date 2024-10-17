import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { IP } from "../../../config";

interface Address {
  id: string;
  street: string;
  city: string;
  postalCode: string;
}

const AddAddressScreen = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const router = useRouter();
  const navigation = useNavigation();

  // Fetch unverified addresses from the backend
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          `http://${IP}:5000/address/getUnverifiedAddresses?employeeID=0002`
        );
        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching unverified addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const renderItem = ({ item }: { item: Address }) => (
    <View style={styles.addressItem}>
      <View style={styles.addressDetails}>
        <Text>
          {item.street}, {item.city}, {item.postalCode}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          (navigation as any).navigate("add-location", {
            address: item,
          })
        }
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Addresses to Add</Text>
      {addresses.length > 0 ? (
        <FlatList
          data={addresses}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      ) : (
        <Text>No unverified addresses available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  addressItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  addressDetails: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddAddressScreen;
