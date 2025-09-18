import React, { useRef, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Welcome to Garba Nights 🎉",
    description: "Book your passes online and enjoy the festive vibes hassle-free.",
    image: "https://img.icons8.com/color/452/concert.png",
  },
  {
    id: "2",
    title: "Easy Pass Booking 🎟️",
    description: "Choose your event, select pass type, and pay securely in seconds.",
    image: "https://img.icons8.com/color/452/ticket.png",
  },
  {
    id: "3",
    title: "Sponsored by the Best 🌟",
    description: "Check out exclusive offers from our sponsors and partners.",
    image: "https://img.icons8.com/color/452/handshake.png", // ✅ working sponsor/partnership image
  },
];


const OnboardingScreen = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentSlide + 1 });
    } else {
      navigation.replace("Login"); // navigate to login after onboarding
    }
  };

  const renderSlide = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentSlide(index);
        }}
        ref={flatListRef}
      />

      {/* Dots indicator */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentSlide === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: width * 0.7,
    height: height * 0.4,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 30,
  },
  dotsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dot: {
    height: 8,
    width: 8,
    backgroundColor: "#ccc",
    borderRadius: 4,
    margin: 5,
  },
  activeDot: {
    backgroundColor: "#f97316", // orange
    width: 16,
  },
  button: {
    backgroundColor: "#f97316",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
