import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useUser } from "../../auth/usercontext";
import RNPickerSelect from "react-native-picker-select";

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

  const onSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/employee/leaveRequests",
        values,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log("Leave request submitted", response.data);
    } catch (error) {
      console.error("Error submitting leave request", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Leave Request</Text>

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
                { label: "Full Day", value: "Full Day" },
                { label: "Half Day", value: "Half Day" },
                { label: "Vacation", value: "Vacation" },
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
