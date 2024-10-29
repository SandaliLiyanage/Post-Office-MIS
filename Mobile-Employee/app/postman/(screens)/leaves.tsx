import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useUser } from "../../auth/usercontext";
import RNPickerSelect from "react-native-picker-select";
import { IP } from "../../../config";

const formSchema = z.object({
  employeeid: z.string().min(1, { message: "Employee ID is required" }),
  requestType: z.string().min(1, { message: "Leave type is required" }),
  startDate: z.string().min(10, { message: "Start date is required" }),
  endDate: z.string().min(10, { message: "End date is required" }),
  description: z.string().optional(),
});

const LeaveRequest = () => {
  const { user } = useUser();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeid: "",
      requestType: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  });
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        `http://${IP}:5000/employee/leaveRequests`,
        {
          ...values,
          leaveType: values.requestType,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setSuccessMessage("Leave request submitted successfully!");
      reset(); // Clear the form
      setTimeout(() => setSuccessMessage(""), 3000); // Hide the message after 3 seconds
    } catch (error) {
      console.error("Error submitting leave request", error);
      Alert.alert("Submission Failed", "Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Leave Request</Text>

        {successMessage ? (
          <Text style={styles.successText}>{successMessage}</Text>
        ) : null}

        <View style={styles.formGroup}>
          <Text style={styles.label}>Employee ID</Text>
          <Controller
            control={control}
            name="employeeid"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter Employee ID"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.employeeid && (
            <Text style={styles.errorText}>{errors.employeeid.message}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Leave Type</Text>
          <Controller
            control={control}
            name="requestType"
            render={({ field: { onChange, value } }) => (
              <RNPickerSelect
                onValueChange={onChange}
                value={value}
                items={[
                  { label: "Full Day", value: "FULL_DAY" },
                  { label: "Half Day", value: "HALF_DAY" },
                ]}
                style={pickerSelectStyles}
                placeholder={{
                  label: "Select Leave Type",
                  value: null,
                }}
              />
            )}
          />
          {errors.requestType && (
            <Text style={styles.errorText}>{errors.requestType.message}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Start Date</Text>
          <Controller
            control={control}
            name="startDate"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.startDate && (
            <Text style={styles.errorText}>{errors.startDate.message}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>End Date</Text>
          <Controller
            control={control}
            name="endDate"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.endDate && (
            <Text style={styles.errorText}>{errors.endDate.message}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Optional"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Submit Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const pickerSelectStyles = {
  inputIOS: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  inputAndroid: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9001E",
    padding: 20,
    paddingTop: 35,
  },
  header: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  successText: {
    color: "#d4edda",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
  },
  errorText: {
    color: "#ffcccb",
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: "#1c1c1e",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LeaveRequest;
