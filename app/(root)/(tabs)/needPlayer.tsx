import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// Demo Data (Abrar, replace this with your real data from database later)
const demoData = [
  {
    id: "1",
    teamName: "Benjamin Evalent",
    inTime: "54'",
    outPlayer: "Jarvis Pepperspray",
    playerNumber: 2,
  },
  {
    id: "2",
    teamName: "Spruce Springclean",
    inTime: "72'",
    outPlayer: "Thomas R. Toe",
    playerNumber: 3,
  },
  {
    id: "3",
    teamName: "Benjamin Evalent",
    inTime: "54'",
    outPlayer: "Jarvis Pepperspray",
    playerNumber: 4,
  },
  {
    id: "4",
    teamName: "Spruce Springclean",
    inTime: "72'",
    outPlayer: "Thomas R. Toe",
    playerNumber: 6,
  },
];

const NeedPlayer = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <View style={styles.playerNumberContainer}>
          <Text style={styles.playerNumber}>{item.playerNumber}</Text>
        </View>
        <Text style={styles.teamName}>{item.teamName}</Text>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.inTime}>{item.inTime}</Text>
        <Text style={styles.outPlayer}>Out: {item.outPlayer}</Text>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Teams Need Players</Text>
      <FlatList
        data={demoData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
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
    paddingVertical: 10,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  playerNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  playerNumber: {
    color: "#FFF",
    fontWeight: "bold",
  },
  teamName: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardRight: {
    alignItems: "flex-end",
  },
  inTime: {
    fontSize: 14,
    color: "#6AD06A",
  },
  outPlayer: {
    fontSize: 12,
    color: "#999",
    marginVertical: 4,
  },
  joinButton: {
    backgroundColor: "#F3E8FF",
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  joinButtonText: {
    color: "#6A0DAD",
    fontWeight: "600",
  },
});

export default NeedPlayer;
