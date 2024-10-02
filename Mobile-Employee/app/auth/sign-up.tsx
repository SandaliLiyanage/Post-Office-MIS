import React, { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../components/input-field";
import { router } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    password: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSignUp = () => {
    console.log("Employee ID:", form.employeeId);
    console.log("Password:", form.password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>

        <InputField
          label="Name"
          placeholder="Name"
          value={form.employeeId}
          onChangeText={(value) => handleInputChange("name", value)}
          secureTextEntry={false}
          keyboardType="default"
        />

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
          <Button title="Sign Up" onPress={handleSignUp} />
        </View>

        <View style={styles.button}>
          <Button
            title="Log In"
            onPress={() => router.replace("/auth/log-in")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

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

export default SignUp;
