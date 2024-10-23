import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import { z } from "zod";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
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

      // Validate employee ID
      const validateID = await axios.post(
        `http://${IP}:5000/auth/validateID`,
        values
      );

      if (validateID.data === true) {
        // If ID is valid, attempt to log in
        const user = await axios.post(`http://${IP}:5000/auth/login`, values);

        if (user.data.login === true) {
          // Check the user's role
          if (user.data.role === "POSTMAN" || user.data.role === "DISPATCHER") {
            // Save the user details
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
            console.log("User ID", user.data.employeeID);

            // Navigate based on role
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
            }
          } else {
            // Role is neither POSTMAN nor DISPATCHER
            form.reset();
            show("Only Postmen and Dispatch Record Managers are allowed", {
              type: "danger",
              duration: 1800,
              style: { backgroundColor: "#B60021" },
            });
          }
        } else {
          // Incorrect password
          form.reset();
          show("Incorrect Password", {
            type: "danger",
            duration: 1800,
            style: { backgroundColor: "#B60021" },
          });
        }
      } else {
        // Invalid employee ID
        form.reset();
        show("Employee ID does not exist", {
          type: "danger",
          duration: 1800,
          style: { backgroundColor: "#B60021" },
        });
      }
    } catch (error) {
      console.error("Error submitting login data", error);
    }
  }

  React.useEffect(() => {
    if (form.formState.errors.password) {
      if (form.formState.errors.password?.message) {
        show(form.formState.errors.password.message, {
          type: "danger",
          duration: 1800,
          style: { backgroundColor: "#B60021" },
        });
      }
    }
  }, [form.formState.errors]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Employee Login</Text>

      <View style={styles.inputContainer}>
        <Controller
          control={form.control}
          name="employeeID"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Employee ID"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange} // Directly set the value
              value={value} // Directly use the value from the form
              placeholderTextColor="#D3D3D3"
              selectionColor="black"
            />
          )}
        />
      </View>

      <View style={styles.inputContainer}>
        <Controller
          control={form.control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange} // Directly set the value
              value={value} // Directly use the value from the form
              placeholderTextColor="#D3D3D3"
              selectionColor="black"
            />
          )}
        />
      </View>

      {/* <View style={styles.buttonContainer}>
        <Button
          title="Log in"
          onPress={form.handleSubmit(handleLoginData)}
          color="#282828"
        />
      </View> */}

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#565656" : "#282828" }, // Change color when pressed
        ]}
        onPress={form.handleSubmit(handleLoginData)}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9001E",
    padding: 20,
    paddingBottom: 38,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 36,
    color: "white",
  },
  inputContainer: {
    width: "75%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
  },
  // buttonContainer: {
  //   width: "30%",
  //   marginTop: 10,
  // },
  button: {
    width: "28%",
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: "center",
    borderRadius: 3,
    marginTop: 11,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 14,
  },
});
