import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView, Text, View, TouchableOpacity, Image, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { icons } from "@/constants"; // Ensure this path is correct

const Home = () => {
    const { user } = useUser();
    const { signOut } = useAuth();
    const [postContent, setPostContent] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [posts, setPosts] = useState([]);

    const handleSignOut = () => {
        signOut();
        router.replace("/(auth)/sign-in");
    };

    const handlePostSubmit = () => {
        if (wordCount > 150) {
            alert("Word limit exceeded! Please keep it under 150 words.");
        } else {
            const newPost = {
                userName: user?.firstName || "User",
                content: postContent,
                timestamp: new Date().toLocaleString(),
            };
            setPosts([newPost, ...posts]);
            setPostContent('');
            setWordCount(0);
        }
    };

    const handleTextChange = (text) => {
        setPostContent(text);
        setWordCount(text.trim().split(/\s+/).filter(Boolean).length);
    };

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 50 }}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Welcome {user?.firstName || "User"} 👋</Text>
                <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
                    <Image source={icons.out} style={styles.icon} />
                </TouchableOpacity>
            </View>

            {/* Create Post Section */}
            <View style={styles.createPostContainer}>
                <TextInput
                    style={styles.textInput}
                    multiline
                    placeholder="What's on your mind?"
                    value={postContent}
                    onChangeText={handleTextChange}
                />
                <Text style={styles.wordCount}>{wordCount} / 150 words</Text>
                <Button
                    title="Post"
                    onPress={handlePostSubmit}
                    disabled={wordCount === 0 || wordCount > 150}
                />
            </View>

            {/* Display Posts */}
            <ScrollView style={styles.postsContainer}>
                {posts.map((post, index) => (
                    <View key={index} style={styles.post}>
                        <Text style={styles.postUser}>{post.userName}</Text>
                        <Text style={styles.postContent}>{post.content}</Text>
                        <Text style={styles.timestamp}>{post.timestamp}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    signOutButton: {
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
    },
    icon: {
        width: 16,
        height: 16,
    },
    createPostContainer: {
        marginBottom: 20,
    },
    textInput: {
        height: 100,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
        textAlignVertical: "top",
    },
    wordCount: {
        textAlign: "right",
        marginTop: 5,
        color: "gray",
    },
    postsContainer: {
        marginTop: 20,
    },
    post: {
        backgroundColor: "#f9f9f9",
        padding: 10,
        marginBottom: 15,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    postUser: {
        fontWeight: "bold",
    },
    postContent: {
        marginTop: 5,
        fontSize: 16,
    },
    timestamp: {
        marginTop: 5,
        fontSize: 12,
        color: "#888",
    },
});

export default Home;
