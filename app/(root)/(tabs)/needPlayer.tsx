import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Button } from "react-native";

const demoData = [
  {
    id: "1",
    teamName: "Benjamin Evalent",
    playerNeed: 2,
    neededPlayers: [
      { position: "Goalkeeper", count: 1 },
      { position: "Midfielder", count: 1 },
    ],
  },
  {
    id: "2",
    teamName: "Spruce Springclean",
    playerNeed: 2,
    neededPlayers: [
      { position: "Defender", count: 1 },
      { position: "Striker", count: 1 },
    ],
  },
  {
    id: "3",
    teamName: "Benjamin Evalent",
    playerNeed: 2,
    neededPlayers: [
      { position: "Midfielder", count: 2 },
    ],
  },
  {
    id: "4",
    teamName: "Spruce Springclean",
    playerNeed: 5,
    neededPlayers: [
      { position: "Goalkeeper", count: 1 },
      { position: "Defender", count: 2 },
      { position: "Striker", count: 2 },
    ],
  },
];

const NeedPlayer = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [updatedData, setUpdatedData] = useState(demoData);

  const toggleCard = (id, team) => {
    setSelectedTeam(team);
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleJoin = (teamId, position) => {
    const newData = [...updatedData];
    const teamIndex = newData.findIndex((team) => team.id === teamId);
    const team = newData[teamIndex];

    const positionIndex = team.neededPlayers.findIndex(
        (player) => player.position === position
    );
    if (positionIndex >= 0) {
      const newCount = team.neededPlayers[positionIndex].count - 1;
      if (newCount <= 0) {
        team.neededPlayers.splice(positionIndex, 1);
      } else {
        team.neededPlayers[positionIndex].count = newCount;
      }
      team.playerNeed -= 1;
    }

    setUpdatedData(newData);
    setModalVisible(false);
    setSelectedPosition("");
  };

  const renderItem = ({ item }) => (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => toggleCard(item.id, item)}>
          <View style={styles.cardLeft}>
            <Text style={styles.teamName}>{item.teamName}</Text>
            <Text style={styles.playerNeedText}>
              Needs {item.playerNeed} Player{item.playerNeed > 1 ? "s" : ""}
            </Text>
          </View>
        </TouchableOpacity>
        {expandedCard === item.id && (
            <View style={styles.cardRight}>
              {item.neededPlayers.map((player, index) => (
                  <Text key={index} style={styles.neededPlayer}>
                    Needs {player.count} {player.position}(s)
                  </Text>
              ))}
              <TouchableOpacity
                  style={styles.joinButton}
                  onPress={() => {
                    setSelectedPosition("");
                    setModalVisible(true);
                  }}
              >
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            </View>
        )}
      </View>
  );

  const renderModal = () => (
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>{selectedTeam?.teamName}</Text>
            <Text style={styles.modalSubheading}>Number of Players Needed: {selectedTeam?.playerNeed}</Text>
            <Text style={styles.modalSubheading}>Select a Position:</Text>
            {/* List of available positions */}
            <FlatList
                data={selectedTeam?.neededPlayers}
                keyExtractor={(item) => item.position}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.positionButton}
                        onPress={() => setSelectedPosition(item.position)}
                    >
                      <Text style={styles.positionButtonText}>{item.position}</Text>
                    </TouchableOpacity>
                )}
            />

            {/* Row containing Join and Cancel buttons */}
            <View style={styles.buttonRow}>
              <View style={styles.buttonContainer}>
                <Button
                    title="Cancel"
                    onPress={() => setModalVisible(false)}
                    color="#DD4B39"  // Red color for Cancel
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                    title="Join"
                    onPress={() => {
                      if (selectedPosition) {
                        handleJoin(selectedTeam.id, selectedPosition);
                      }
                    }}
                    color="#6A0DAD"  // Purple color for Join
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
  );

  return (
      <View style={styles.container}>
        <Text style={styles.heading}>Teams Need Players</Text>
        <FlatList
            data={updatedData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
        />
        {renderModal()}
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
    flexDirection: "column",
    justifyContent: "center",
  },
  teamName: {
    fontSize: 16,
    fontWeight: "600",
  },
  playerNeedText: {
    fontSize: 14,
    color: "#6A0DAD",
    fontWeight: "600",
  },
  cardRight: {
    marginTop: 10,
  },
  neededPlayer: {
    fontSize: 14,
    color: "#FF6347",
    marginVertical: 4,
    fontWeight: "600",
  },
  joinButton: {
    backgroundColor: "#F3E8FF",
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  joinButtonText: {
    color: "#6A0DAD",
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  modalSubheading: {
    fontSize: 14,
    marginBottom: 10,
    color: "#333",
  },
  positionButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#6A0DAD",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  positionButtonText: {
    color: "#FFF",
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5, // Optional, to add space between buttons
  },
});

export default NeedPlayer;
