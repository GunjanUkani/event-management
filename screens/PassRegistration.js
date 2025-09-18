import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";

import { SafeAreaView } from "react-native-safe-area-context";
import { DatePickerModal, en, registerTranslation } from "react-native-paper-dates";
import { useStripe } from "@stripe/stripe-react-native";

registerTranslation("en", en);

export default function PassRegistrationScreen() {
    const stripe = useStripe();
  const [passes, setPasses] = useState([
    {
      id: "1",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "9876543210",
      gender: "Male",
      aadhar: "123456789012",
      date: "2025-09-20",
    },
    {
      id: "2",
      name: "Priya Patel",
      email: "priya@example.com",
      phone: "9988776655",
      gender: "Female",
      aadhar: "987654321098",
      date: "2025-09-21",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [aadharParts, setAadharParts] = useState(["", "", ""]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    aadhar: "",
    date: "",
  });

  const handleAadharChange = (text, index) => {
    if (/^\d{0,4}$/.test(text)) {
      const newParts = [...aadharParts];
      newParts[index] = text;
      setAadharParts(newParts);

      // Auto move to next box
      if (text.length === 4 && index < 2) {
        inputs[index + 1].focus();
      }
    }
  };

  const inputs = [];

   const handleAddPass = async () => {
    const fullAadhar = aadharParts.join("");
    if (!form.name || !form.email || !form.phone || !form.gender || !fullAadhar || !form.date) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }
    if (fullAadhar.length !== 12) {
      Alert.alert("Error", "Aadhar number must be 12 digits.");
      return;
    }

    try {
      // 1️⃣ Create PaymentIntent via backend
      const res = await fetch("http://192.168.29.76:5000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 50 * 100 }), // e.g. Rs 50 = 5000 paise
      });
      const { clientSecret } = await res.json();

      // 2️⃣ Open Stripe payment sheet
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Garba Nights 🎉",
      });

      if (initSheet.error) {
        Alert.alert("Error", initSheet.error.message);
        return;
      }

      const presentSheet = await stripe.presentPaymentSheet({ clientSecret });

      if (presentSheet.error) {
        Alert.alert("Payment failed", presentSheet.error.message);
      } else {
        // ✅ Success
        Alert.alert("Success", "Payment successful & Pass created 🎟️");
        setPasses([...passes, { ...form, aadhar: fullAadhar, id: Date.now().toString() }]);
        setForm({ name: "", email: "", phone: "", gender: "", aadhar: "", date: "" });
        setAadharParts(["", "", ""]);
        setModalVisible(false);
      }
    } catch (err) {
      console.log(err.message);
      Alert.alert("Error", err.message);
    }
  };


  const handleDelete = (id) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this pass?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setPasses(passes.filter((p) => p.id !== id)),
      },
    ]);
  };

  const onConfirmDate = (params) => {
    setOpenDate(false);
    setSelectedDate(params.date);
    const formattedDate = params.date.toLocaleDateString("en-CA"); // YYYY-MM-DD
    setForm({ ...form, date: formattedDate });
  };

  const renderItem = ({ item }) => (
     
    <View style={styles.row}>
      <Text style={[styles.cell, { flex: 1.5 }]}>{item.name}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.email}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{item.phone}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{item.gender}</Text>
      <Text style={[styles.cell, { flex: 1.5 }]}>{item.aadhar}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{item.date}</Text>
      <View style={[styles.cell, { flex: 1, flexDirection: "row", justifyContent: "center" }]}>
        <TouchableOpacity style={styles.actionBtn}>
          <Feather name="edit" size={18} color="#ff6600" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => handleDelete(item.id)}>
          <Feather name="trash-2" size={18} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.heading}>Pass Management</Text>

      {/* Table with Horizontal Scroll */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.headerCell, { flex: 1.5 }]}>Name</Text>
            <Text style={[styles.headerCell, { flex: 2 }]}>Email</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>Phone</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>Gender</Text>
            <Text style={[styles.headerCell, { flex: 1.5 }]}>Aadhar</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>Date</Text>
            <Text style={[styles.headerCell, { flex: 1 }]}>Actions</Text>
          </View>

          <FlatList
            data={passes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <AntDesign name="plus" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Modal Form */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={styles.modalTitle}>Add New Pass</Text>

              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter full name"
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                keyboardType="email-address"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
              />

              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                value={form.phone}
                onChangeText={(text) => setForm({ ...form, phone: text })}
              />

              <Text style={styles.label}>Gender</Text>
              <RadioButton.Group
                onValueChange={(value) => setForm({ ...form, gender: value })}
                value={form.gender}
              >
                <View style={styles.radioGroup}>
                  <View style={styles.radioItem}>
                    <RadioButton value="Male" />
                    <Text style={styles.radioText}>Male</Text>
                  </View>
                  <View style={styles.radioItem}>
                    <RadioButton value="Female" />
                    <Text style={styles.radioText}>Female</Text>
                  </View>
                </View>
              </RadioButton.Group>
              <Text style={styles.label}>Aadhar Card</Text>
              <View style={styles.aadharRow}>
                {[0, 1, 2].map((i) => (
                  <TextInput
                    key={i}
                    ref={(ref) => (inputs[i] = ref)}
                    style={styles.aadharInput}
                    keyboardType="numeric"
                    maxLength={4}
                    value={aadharParts[i]}
                    onChangeText={(text) => handleAadharChange(text, i)}
                  />
                ))}
              </View>


              <Text style={styles.label}>Event Date</Text>
              <TouchableOpacity style={styles.input} onPress={() => setOpenDate(true)}>
                <Text>{form.date ? form.date : "Select Date"}</Text>
              </TouchableOpacity>
              <DatePickerModal
                mode="single"
                visible={openDate}
                onDismiss={() => setOpenDate(false)}
                date={selectedDate}
                onConfirm={onConfirmDate}
              />

              {/* Buttons */}
              <View style={styles.modalBtnRow}>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: "#ccc" }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: "#ff6600" }]}
                  onPress={handleAddPass}
                >
                  <Text style={styles.modalBtnText}>Add</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
        </SafeAreaView>
      </Modal>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 15 },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
    borderRadius: 6,
    marginBottom: 6,
    minWidth: 850,
  },
  headerRow: { backgroundColor: "#ff6600", borderRadius: 8, marginBottom: 10 },
  headerCell: {
    fontWeight: "700",
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  cell: { fontSize: 14, color: "#444", textAlign: "center" },
  fab: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#ff6600",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  actionBtn: { marginHorizontal: 6 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: { backgroundColor: "#fff", borderRadius: 12, padding: 20, elevation: 5 },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6, marginTop: 10, color: "#555" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fdfdfd",
  },
  radioGroup: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10 },
  radioItem: { flexDirection: "row", alignItems: "center" },
  radioText: { fontSize: 16, color: "#333" },
  modalBtnRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  aadharRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  aadharInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 4,
    backgroundColor: "#fdfdfd",
  },

  modalBtnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
