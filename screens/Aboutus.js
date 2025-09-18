import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutUsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Logo or banner */}
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>About Us</Text>

      {/* Description */}
      <Text style={styles.description}>
        Welcome to the Garba Management System 🎉 – your one-stop platform for
        booking, managing, and celebrating Garba nights. Our mission is to make
        Garba events seamless and joyful for organizers and participants alike.
      </Text>

      <Text style={styles.subheading}>Our Vision</Text>
      <Text style={styles.description}>
        We aim to bring tradition and technology together by simplifying pass
        registrations, venue details, and event updates, ensuring everyone can
        focus on enjoying the rhythm of Garba.
      </Text>

      <Text style={styles.subheading}>Who We Are</Text>
      <Text style={styles.description}>
        A passionate team of developers and event enthusiasts who believe in
        keeping cultural roots alive while making the experience modern and
        hassle-free.
      </Text>

      {/* Team placeholder */}
      <Text style={styles.subheading}>Meet the Team</Text>
      <View style={styles.teamContainer}>
        <View style={styles.teamMember}>
          <Image
            source={{ uri: "https://img.icons8.com/ios-filled/100/user-male-circle.png" }}
            style={styles.avatar}
          />
          <Text style={styles.teamName}>Gunjan Ukani</Text>
          <Text style={styles.teamRole}>Founder & Developer</Text>

          <Text style={styles.teamName}>Dipen Chhatrola</Text>
          <Text style={styles.teamRole}>Marketing Lead</Text>
        </View>
        {/* Add more team members if needed */}
      </View>

      <Text style={styles.footer}>
        © {new Date().getFullYear()} Garba Management System. All Rights
        Reserved.
      </Text>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf0",
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 150,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#d32f2f",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "#333",
    marginBottom: 15,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    color: "#1976d2",
    textAlign: "center",
  },
  teamContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 10,
  },
  teamMember: {
    alignItems: "center",
    margin: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5,
  },
  teamName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  teamRole: {
    fontSize: 14,
    color: "#777",
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },
});
