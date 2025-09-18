// add venue using react-native-maps 

import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, FlatList } from "react-native";
import MapView, { Marker } from "react-native-maps";

const { width, height } = Dimensions.get("window");

export default function Venue() {
    const region = {
        latitude: 37.7749, // Example: San Francisco coordinates
        longitude: -122.4194,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };
    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={region}>
                <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} title="Garba Venue" description="Join us here for the Garba Nights!" />
            </MapView>
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>Venue: Central Park, San Francisco</Text>
                <Text style={styles.infoText}>Date: October 15-20, 2024</Text>

                <Text style={styles.infoText}>Time: 7:00 PM - 11:00 PM</Text>
                <Text style={styles.infoText}>Contact: +1 234 567 890</Text>
                <Text style={styles.infoText}>Email: info@garbanights.com</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: width,
        height: height * 0.6,
    },
    infoBox: {
        padding: 20,
        backgroundColor: "#f8f8f8",
        width: width,
        alignItems: "flex-start",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    },
    infoText: {

        fontSize: 16,
        marginBottom: 5,
    },
});