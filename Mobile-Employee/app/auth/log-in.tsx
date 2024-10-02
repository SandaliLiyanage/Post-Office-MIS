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
  const { toast } = useToast();
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
          });

          // Role-based navigation
          if (user.data.role === "POSTMAN") {
            navigation.navigate("AdminDashboard");
          } else if (user.data.role === "employee") {
            navigation.navigate("EmployeeDashboard");
          } else if (user.data.role === "postman") {
            navigation.navigate("PostmanDashboard");
          } else {
            navigation.navigate("Dashboard");
          }
        } else {
          form.reset();
          toast.show("Invalid Password", { type: "danger" });
        }
      } else {
        form.reset();
        toast.show("Employee ID does not exist", { type: "danger" });
      }
    } catch (error) {
      console.error("Error submitting login data", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Log In</Text>

        <InputField
          label="Employee ID"
          placeholder="Employee ID"
          value={form.employeeId}
          onChangeText={(value) => handleInputChange("employeeId", value)}
          secureTextEntry={false}
          keyboardType="numeric"
        />

        <InputField
          label="Password"
          placeholder="Password"
          value={form.password}
          onChangeText={(value) => handleInputChange("password", value)}
          secureTextEntry={false}
          keyboardType="default"
        />

        <View style={styles.button}>
          <Button title="Log In" onPress={handleLogIn} />
        </View>

        <View style={styles.button}>
          <Button
            title="Sign Up"
            onPress={() => router.replace("/auth/sign-up")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "80%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    textAlign: "center",
  },
  button: {
    marginBottom: 10,
  },
});
