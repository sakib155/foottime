import { useUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView, Text, View, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import { icons } from "@/constants"; // Ensure this path is correct

const Home = () => {
    const { user } = useUser();
    const { signOut } = useAuth();

    const handleSignOut = () => {
        signOut();
        router.replace("/(auth)/sign-in");
    };

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 50 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                {/* Display the user's first name */}
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                    Welcome {user?.firstName || "User"} 👋
                </Text>
                {/* Sign Out Button */}
                <TouchableOpacity
                    onPress={handleSignOut}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: "#fff",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 3,
                        elevation: 5,
                    }}
                >
                    <Image source={icons.out} style={{ width: 16, height: 16 }} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Home;
