import React, { useCallback, useEffect, useState } from "react";
import {
    SafeAreaView,
    Alert,
    StyleSheet,
    Modal,
    View,
    TextInput,
} from "react-native";
import { Divider, Text, Button, Card } from "@ui-kitten/components";
import AppHeader from "@/components/AppHeader";
import { useUser } from "@/hooks/UserContext";
import {
    getFriends,
    getIncomingFriendRequests,
    sendFriendRequest, // Import sendFriendRequest function if it exists
    Friend,
    FriendRequest,
    acceptPost,
    updateFriendRequest,
} from "@/backend/api";
import { useFocusEffect } from "expo-router";

const FriendsScreen = () => {
    const { userId } = useUser();
    const [friends, setFriends] = useState<Friend[]>([]);
    const [incomingRequests, setIncomingRequests] = useState<FriendRequest[]>(
        []
    );
    const [isModalVisible, setModalVisible] = useState(false);
    const [emailInput, setEmailInput] = useState("");

    // Fetch user's friends
    const fetchUserFriends = async () => {
        if (!userId) {
            console.error("User ID is NULL");
            return;
        }
        try {
            const data = await getFriends(userId);
            setFriends(data);
        } catch (error) {
            console.error("Failed to fetch friends", error);
        }
    };

    // Fetch incoming friend requests
    const fetchIncomingRequests = async () => {
        if (!userId) {
            console.error("User ID is NULL");
            return;
        }
        try {
            const data = await getIncomingFriendRequests(userId);
            setIncomingRequests(data);
        } catch (error) {
            console.error("Failed to fetch incoming friend requests", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUserFriends();
            fetchIncomingRequests();
        }, [userId])
    );

    // Handle sending friend request
    const handleSendRequest = async () => {
        if (!userId) {
            console.error("User ID can not be null");
            return;
        }
        try {
            await sendFriendRequest(userId, emailInput); // Adjust API call as needed
            Alert.alert("Success", "Friend request sent");
            setModalVisible(false);
            setEmailInput("");
        } catch (error) {
            console.error("Failed to send friend request", error);
            Alert.alert("Error", "Failed to send friend request");
        }
    };

    const handleFriendRequest = async (
        friendId: number,
        didAcceptRequest: boolean
    ) => {
        if (!userId) {
            console.error("User ID can not be null");
            return;
        }

        try {
            const success: string = await updateFriendRequest(
                friendId,
                didAcceptRequest ? "Accepted" : "Blocked"
            );

            Alert.alert("Success", success);

            fetchUserFriends();
            fetchIncomingRequests();
        } catch (error) {
            console.error(
                `Failed to ${
                    didAcceptRequest ? "accept" : "reject"
                } friend request`,
                error
            );
            Alert.alert(
                "Error",
                `Failed to ${
                    didAcceptRequest ? "accept" : "reject"
                } friend request`
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader />
            <Button
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                Add Friend
            </Button>
            <Divider />

            <Text style={styles.title}>Your Friends</Text>
            {friends.length > 0 ? (
                friends.map((friend) => (
                    <Card key={friend.user_id} style={styles.friendCard}>
                        <Text style={styles.text}>{friend.email}</Text>
                    </Card>
                ))
            ) : (
                <Text style={styles.noFriendsText}>No friends added</Text>
            )}

            <Text style={styles.title}>Incoming Friend Requests</Text>
            {incomingRequests.length > 0 ? (
                incomingRequests.map((request) => (
                    <Card key={request.friend_id} style={styles.requestCard}>
                        <Text style={styles.text}>{request.email}</Text>
                        <Button
                            status="success"
                            onPress={() =>
                                handleFriendRequest(request.friend_id, true)
                            }
                        >
                            Accept
                        </Button>
                        <Button
                            status="danger"
                            onPress={() =>
                                handleFriendRequest(request.friend_id, false)
                            }
                        >
                            Deny
                        </Button>
                    </Card>
                ))
            ) : (
                <Text style={styles.noRequestsText}>
                    No incoming friend requests
                </Text>
            )}

            {/* Modal for sending friend request */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            Send Friend Request
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter email"
                            placeholderTextColor="#888"
                            value={emailInput}
                            onChangeText={setEmailInput}
                        />
                        <Button onPress={handleSendRequest}>
                            Send Request
                        </Button>
                        <Button
                            status="danger"
                            onPress={() => setModalVisible(false)}
                            style={styles.cancelButton}
                        >
                            Cancel
                        </Button>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#292929",
    },
    addButton: {
        marginTop: 10,
        marginBottom: 20,
    },
    title: {
        color: "#ffffff",
        fontSize: 18,
        marginVertical: 20,
    },
    friendCard: {
        width: "90%",
        marginVertical: 10,
        padding: 15,
        backgroundColor: "#1f1f1f",
        borderRadius: 8,
    },
    requestCard: {
        width: "90%",
        marginVertical: 10,
        padding: 15,
        backgroundColor: "#1f1f1f",
        borderRadius: 8,
    },
    text: {
        color: "#ffffff",
        fontSize: 16,
    },
    noFriendsText: {
        color: "#ffffff",
        marginTop: 20,
    },
    noRequestsText: {
        color: "#ffffff",
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 15,
        color: "#000",
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        color: "#000",
    },
    cancelButton: {
        marginTop: 10,
    },
});

export default FriendsScreen;
