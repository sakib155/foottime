import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="text-2xl font-bold my-5">My profile</Text>

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
            {/* First Name */}
            <Text className="text-sm text-gray-500">First Name</Text>
            <Text className="text-lg font-medium text-gray-800">
              {user?.firstName || "Not Found"}
            </Text>
          </View>

          <View className="flex flex-col items-start justify-start w-full mb-3">
            {/* Last Name */}
            <Text className="text-sm text-gray-500">Last Name</Text>
            <Text className="text-lg font-medium text-gray-800">
              {user?.lastName || "Not Found"}
            </Text>
          </View>

          <View className="flex flex-col items-start justify-start w-full mb-3">
            {/* Email */}
            <Text className="text-sm text-gray-500">Email</Text>
            <Text className="text-lg font-medium text-gray-800">
              {user?.primaryEmailAddress?.emailAddress || "Not Found"}
            </Text>
          </View>

          <View className="flex flex-col items-start justify-start w-full mb-3">
            {/* Phone */}
            <Text className="text-sm text-gray-500">Phone</Text>
            <Text className="text-lg font-medium text-gray-800">
              {user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
