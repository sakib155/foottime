import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "expo-router";

const turfsData = [
  {
    id: "1",
    name: "Jaff",
    location: "Bashundhara",
  },
  {
    id: "2",
    name: "NDE",
    location: "Bashundhara",
  },
  {
    id: "3",
    name: "Benjamin Evalent",
    location: "Bashundhara",
  },
  {
    id: "4",
    name: "Spruce Springclean",
    location: "Bashundhara",
  },
];

const Turfs = () => {
  const navigation = useNavigation();

  const handleSeeAllPress = (turf) => {
    // Navigate to the details screen within the turfs folder
    navigation.navigate("details", { turf });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.turfName}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSeeAllPress(item)}
      >
        <Text style={styles.buttonText}>See All</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Turfs</Text>
      <FlatList
        data={turfsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#F9F9F9",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardContent: {
    flex: 1,
  },
  turfName: {
    fontSize: 16,
    fontWeight: "600",
  },
  location: {
    fontSize: 14,
    color: "#999",
  },
  button: {
    backgroundColor: "#E0C3FC",
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#6A0DAD",
    fontWeight: "600",
  },
});

export default Turfs;
