import React, { useRef } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, FlatList } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const carouselItems = [
  { id: "1", title: "Welcome to Garba Nights 🎉", img: "https://img.icons8.com/color/512/dancing.png" },
  { id: "2", title: "Book Your Pass Online 🎟️", img: "https://img.icons8.com/color/512/ticket.png" },
  { id: "3", title: "Enjoy the Festive Vibes 💃", img: "https://img.icons8.com/color/512/confetti.png" },
];

const menus = [
  { id: "1", title: "Book Pass", screen: "PassRegistration", icon: "https://img.icons8.com/color/96/ticket.png" },
  { id: "2", title: "Gallery", screen: "Gallery", icon: "https://img.icons8.com/color/96/image-gallery.png" },
  { id: "3", title: "About Us", screen: "About", icon: "https://img.icons8.com/color/96/info.png" },
  { 
    id: "4", 
    title: "Venue", 
    screen: "Venue", 
    icon: "https://img.icons8.com/color/96/marker.png"
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  const renderMenuItem = ({ item }) => (
<TouchableOpacity style={styles.menuCard} onPress={() => navigation.navigate(item.screen)}>
  <Image source={{ uri: item.icon }} style={styles.menuIcon} />
  <Text style={styles.menuText}>{item.title}</Text>
</TouchableOpacity>

  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        {/* Carousel */}
        <Carousel
          loop
          width={width}
        height={200}
        autoPlay={true}
        data={carouselItems}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={styles.carouselItem}>
            <Image source={{ uri: item.img }} style={styles.carouselImg} />
            <Text style={styles.carouselText}>{item.title}</Text>
          </View>
        )}
      />

      {/* Menus */}
      <View style={styles.menuContainer}>
        <FlatList
          data={menus}
          renderItem={renderMenuItem}
          numColumns={2}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // Carousel styles
  carouselItem: {
    backgroundColor: "#ffe6f0",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  carouselImg: { width: 80, height: 80, resizeMode: "contain", marginBottom: 10 },
  carouselText: { fontSize: 16, fontWeight: "bold", textAlign: "center" },

  // Menu styles
  menuContainer: { flex: 1, marginTop: 20, paddingHorizontal: 20 },
  menuCard: {
    flex: 1,
    margin: 10,
    backgroundColor: "#f0f8ff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  menuIcon: { width: 60, height: 60, marginBottom: 10 },
  menuText: { fontSize: 16, fontWeight: "600", textAlign: "center" },
});
