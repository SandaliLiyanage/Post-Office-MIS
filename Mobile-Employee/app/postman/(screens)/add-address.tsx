import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { IP } from "../../../config";
import { useUser } from "../../auth/usercontext";

interface Address {
  addressID: string;
  addressNo: string;
  streetName: string;
  areaName: string;
  Locality: string;
}

const AddAddressScreen = () => {
  const { user } = useUser();
  const employeeID = user?.employeeID;
  const [addresses, setAddresses] = useState<Address[]>([]);
  const router = useRouter();
  const navigation = useNavigation();

  // Fetch unverified addresses from the backend
  const fetchAddresses = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/address/getUnverifiedAddresses?employeeID=${employeeID}`
      );
      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      console.error("Error fetching unverified addresses:", error);
    }
  };

  // Use useFocusEffect to refetch data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );

  const renderItem = ({ item }: { item: Address }) => (
    <View style={styles.addressItem}>
      <View style={styles.addressDetails}>
        <Text style={styles.addressID}>Address ID: {item.addressID}</Text>
        <Text style={styles.address}>
          {item.addressNo}, {item.streetName}, {item.areaName}, {item.Locality}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          (navigation as any).navigate("add-location", {
            addressID: item.addressID,
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
          keyExtractor={(item) => item.addressID}
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: "#C60024EF",
    padding: 8,
    borderRadius: 5,
  },
  addressItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    paddingVertical: 13,
    marginBottom: 11,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: "relative",
  },
  addressDetails: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  addressID: {
    fontSize: 18,
    fontWeight: "bold",
  },
  address: {
    fontSize: 16,
    color: "gray",
    marginTop: 4,
    lineHeight: 21,
  },
});

export default AddAddressScreen;
