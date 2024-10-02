import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../components/input-field";
import { router } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Button,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "./usercontext";
import { useToast } from "react-native-toast-notifications";

const formSchema = z.object({
  employeeID: z.string(),
  password: z.string().min(5, "Password must be at least 5 characters long"),
});

export default function Login() {
  const { show } = useToast();
  const navigation = useNavigation();
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
        "http://localhost:5000/auth/validateID",
        values
      );
      if (validateID.data === true) {
        const user = await axios.post(
          "http://localhost:5000/auth/login",
          values
        );
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

          // Role-based navigation
          if (user.data.role === "POSTMAN") {
            router.push({
              pathname: "./postman/home",
              params: { employeeID: values.employeeID },
            });
          } else if (user.data.role === "DISPATCHER") {
            router.push({
              pathname: "./dispatch-manager/home",
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
        <TextInput
          placeholder="Enter Employee ID"
          style={styles.input}
          {...form.register("employeeID")}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter Password"
          style={styles.input}
          secureTextEntry
          {...form.register("password")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Log in"
          onPress={() => {
            console.log("Login button pressed");
            const values = form.getValues();
            console.log("Form values:", values);
            form.handleSubmit(handleLoginData)();
          }}
          color="#4B5563"
        />
        {/* <Button
          title="Forgot Password"
          onPress={() => navigation.navigate("ForgotPassword")}
          color="#6B7280"
        /> */}
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
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
