import React, { useRef, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Welcome to Garba Nights 🎉",
    description: "Book your passes online and enjoy the festive vibes.",
    image: "https://img.icons8.com/color/512/dancing.png",
  },
  {
    id: "2",
    title: "Dance Till You Drop 💃",
    description: "Feel the energy of Garba with amazing music and people.",
    image: "https://img.icons8.com/color/512/concert.png",
  },
  {
    id: "3",
    title: "Easy Ticket Booking 🎟️",
    description: "Grab your passes instantly and avoid long queues.",
    image: "https://img.icons8.com/color/512/ticket.png",
  },
];

export default function OnboardingScreen({ navigation }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(e) => {
          const index = Math.floor(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>

            {/* ✅ Show button only on last slide */}
            {item.id === "3" && (
              <TouchableOpacity
                style={styles.getStartedBtn}
                onPress={() => navigation.replace("Login")}
              >
                <Text style={styles.getStartedText}>Get Started</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View style={styles.dots}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? "#ff6600" : "#ccc" },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  slide: { width, justifyContent: "center", alignItems: "center", padding: 20 },
  image: { width: width * 0.7, height: height * 0.35, marginBottom: 30 },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  description: { fontSize: 16, textAlign: "center", color: "#555", marginBottom: 20 },
  getStartedBtn: {
    backgroundColor: "#ff6600",
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  getStartedText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  dots: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
  dot: { width: 10, height: 10, borderRadius: 5, marginHorizontal: 5 },
});
