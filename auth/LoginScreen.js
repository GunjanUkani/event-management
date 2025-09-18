import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Later integrate API for login
    alert("Logged in successfully!");
    navigation.navigate("Main"); // Navigate to Home or Dashboard after login
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={{ uri: "https://img.icons8.com/color/452/garba.png" }}
        style={styles.logo}
      />

      <Text style={styles.title}>Welcome Back 👋</Text>
      <Text style={styles.subtitle}>Login to book your Garba Passes</Text>

      {/* Email */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Register Option */}
      <TouchableOpacity onPress={() => alert("Navigate to Register Page")}>
        <Text style={styles.registerText}>
          Don’t have an account? <Text style={styles.registerLink}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: width * 0.35,
    height: width * 0.35,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#f97316", // orange theme
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  button: {
    width: "100%",
    backgroundColor: "#f97316",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  registerText: {
    fontSize: 14,
    color: "#555",
  },
  registerLink: {
    color: "#f97316",
    fontWeight: "bold",
  },
});
