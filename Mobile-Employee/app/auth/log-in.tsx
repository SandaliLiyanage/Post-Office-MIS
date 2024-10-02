import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import { z } from "zod";
import axios from "axios";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useUser } from "./usercontext";
import { IP } from "../../config";

const formSchema = z.object({
  employeeID: z.string(),
  password: z.string().min(5, "Password must be at least 5 characters long"),
});

export default function Login() {
  const { show } = useToast();
  const { saveUser } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeID: "",
      password: "",
    },
  });

  async function handleLoginData(values: z.infer<typeof formSchema>) {
    try {
      console.log("Submitting login data", values);
      const validateID = await axios.post(
        `http://${IP}:5000/auth/validateID`,
        values
      );
      if (validateID.data === true) {
        const user = await axios.post(`http://${IP}:5000/auth/login`, values);
        if (user.data.login === true) {
          saveUser({
            name: user.data.name,
            role: user.data.role,
            token: user.data.token,
            postalCode: user.data.postalCode,
            postOfficeName: user.data.postOfficeName,
            email: user.data.email,
            employeeID: user.data.employeeID,
          });
          console.log("User data", user.data);

          // Role-based navigation
          if (user.data.role === "POSTMAN") {
            router.push({
              pathname: "../postman/home",
              params: { employeeID: values.employeeID },
            });
          } else if (user.data.role === "DISPATCHER") {
            router.push({
              pathname: "../dispatch-manager/home",
              params: { employeeID: values.employeeID },
            });
          } else {
            console.error("Invalid role");
          }
        } else {
          form.reset();
          show("Invalid Password", { type: "danger" });
        }
      } else {
        form.reset();
        show("Employee ID does not exist", { type: "danger" });
      }
    } catch (error) {
      console.error("Error submitting login data", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Employee Login</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Employee ID</Text>
        <Controller
          control={form.control}
          name="employeeID"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter Employee ID"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange} // Directly set the value
              value={value} // Directly use the value from the form
            />
          )}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <Controller
          control={form.control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Enter Password"
              style={styles.input}
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange} // Directly set the value
              value={value} // Directly use the value from the form
            />
          )}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Log in"
          onPress={form.handleSubmit(handleLoginData)}
          color="#4B5563"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
});
