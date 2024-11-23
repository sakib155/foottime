import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [phone, setPhone] = useState(user?.primaryPhoneNumber?.phoneNumber || "");

  const handleSave = async () => {
    try {
      const response = await fetch('YOUR_API_URL_HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();

        console.log('User updated:', updatedUser);

        setModalVisible(false);
      } else {
        console.error('Failed to save user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };


  return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <ScrollView
            className="px-5"
            contentContainerStyle={{ paddingBottom: 120 }}
        >
          <View className="flex flex-row justify-between items-center my-5">
            <Text className="text-2xl font-bold">My Profile</Text>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="bg-blue-500 px-3 py-1 rounded-lg"
            >
              <Text className="text-white text-sm font-medium">Edit</Text>
            </TouchableOpacity>
          </View>

          <View className="flex items-center justify-center my-5">
            <Image
                source={{
                  uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
                }}
                style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
                className="rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
            />
          </View>

          <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
            <View className="flex flex-col items-start justify-start w-full mb-3">
              <Text className="text-sm text-gray-500">First Name</Text>
              <Text className="text-lg font-medium text-gray-800">
                {user?.firstName || "Not Found"}
              </Text>
            </View>

            <View className="flex flex-col items-start justify-start w-full mb-3">

              <Text className="text-sm text-gray-500">Last Name</Text>
              <Text className="text-lg font-medium text-gray-800">
                {user?.lastName || "Not Found"}
              </Text>
            </View>

            <View className="flex flex-col items-start justify-start w-full mb-3">
              <Text className="text-sm text-gray-500">Email</Text>
              <Text className="text-lg font-medium text-gray-800">
                {user?.primaryEmailAddress?.emailAddress || "Not Found"}
              </Text>
            </View>

            <View className="flex flex-col items-start justify-start w-full mb-3">
              <Text className="text-sm text-gray-500">Phone</Text>
              <Text className="text-lg font-medium text-gray-800">
                {user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
              </Text>
            </View>
          </View>
        </ScrollView>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-opacity-75">
            <View className="bg-white rounded-lg w-4/5 p-5 shadow-lg">
              <Text className="text-lg font-bold mb-4">Edit Profile</Text>
              <View className="mb-3">
                <Text className="text-sm text-gray-500">First Name</Text>
                <TextInput
                    value={firstName}
                    onChangeText={setFirstName}
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1"
                />
              </View>
              <View className="mb-3">
                <Text className="text-sm text-gray-500">Last Name</Text>
                <TextInput
                    value={lastName}
                    onChangeText={setLastName}
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1"
                />
              </View>
              <View className="mb-3">
                <Text className="text-sm text-gray-500">Phone</Text>
                <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1"
                />
              </View>
              <View className="mb-3">
                <Text className="text-sm text-gray-500">Email</Text>
                <TextInput
                    value={user?.primaryEmailAddress?.emailAddress || ""}
                    editable={false}
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1 bg-gray-100 text-gray-400"
                />
              </View>
              <View className="flex flex-row-reverse justify-between mt-4">
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                <Button title="Save" onPress={handleSave} />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
  );
};

export default Profile;
