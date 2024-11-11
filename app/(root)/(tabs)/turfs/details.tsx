import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router"; // Correct import for getting route params

const timeSlotsData = [
  { id: "1", time: "9:00 AM", location: "Bashundhara", status: "Booked" },
  { id: "2", time: "11:00 AM", location: "Bashundhara", status: "Booked" },
  { id: "3", time: "1:00 PM", location: "Bashundhara", status: "Requested" },
  { id: "4", time: "3:00 PM", location: "Bashundhara", status: "Free" },
  { id: "5", time: "5:00 PM", location: "Bashundhara", status: "Free" },
  { id: "6", time: "7:00 PM", location: "Bashundhara", status: "Free" },
  { id: "7", time: "9:00 PM", location: "Bashundhara", status: "Free" },
  { id: "8", time: "11:00 PM", location: "Bashundhara", status: "Free" },
];

const TurfDetails = () => {
  const params = useLocalSearchParams(); // Get the passed params
  const turf = params.turf;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState(timeSlotsData);

  const handleSlotClick = (slot) => {
    if (slot.status === "Free") {
      setSelectedSlot(slot);
      setModalVisible(true);
    } else if (slot.status === "Requested") {
      const updatedSlots = slots.map((item) =>
        item.id === slot.id ? { ...item, status: "Free" } : item
      );
      setSlots(updatedSlots);
      Alert.alert("Notice", "Slot request removed.");
    }
  };

  const handleRequest = () => {
    if (selectedSlot) {
      const updatedSlots = slots.map((item) =>
        item.id === selectedSlot.id ? { ...item, status: "Requested" } : item
      );
      setSlots(updatedSlots);
      setModalVisible(false);
      Alert.alert("Success", "Slot requested successfully!");
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <Text style={styles.time}>{item.time}</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.statusButton,
            item.status === "Free" && styles.freeButton,
            item.status === "Requested" && styles.requestedButton,
            item.status === "Booked" && styles.bookedButton,
          ]}
          onPress={() => handleSlotClick(item)}
          disabled={item.status === "Booked"}
        >
          <Text
            style={[
              styles.statusText,
              item.status === "Free" && styles.freeText,
              item.status === "Requested" && styles.requestedText,
              item.status === "Booked" && styles.bookedText,
            ]}
          >
            {item.status.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={slots}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.heading}>{turf?.name || "Turf Details"}</Text>
            <Text style={styles.subHeading}>Date: 22-09-2024</Text>
          </View>
        }
        contentContainerStyle={styles.listContentContainer}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select an Action</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleRequest}
            >
              <Text style={styles.modalButtonText}>Request</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonCancel}
              onPress={handleCancel}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContentContainer: {
    paddingBottom: 100, // Ensures content doesn't go under the navbar
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardLeft: {
    flexDirection: "column",
  },
  time: {
    fontSize: 16,
    fontWeight: "600",
  },
  location: {
    fontSize: 12,
    color: "#999",
  },
  statusButton: {
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  freeButton: {
    backgroundColor: "#F3E8FF",
  },
  requestedButton: {
    backgroundColor: "#F3E8FF",
  },
  bookedButton: {
    backgroundColor: "#F3E8FF",
  },
  statusText: {
    fontWeight: "600",
  },
  freeText: {
    color: "#00CC00",
  },
  requestedText: {
    color: "#FFA500",
  },
  bookedText: {
    color: "#DC143C",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: "#E0C3FC",
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
    width: 100,
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FFF",
    fontWeight: "600",
  },
});

export default TurfDetails;
