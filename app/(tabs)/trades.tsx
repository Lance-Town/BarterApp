import React, { useCallback, useState } from "react";
import { SafeAreaView, Alert, View, StyleSheet } from "react-native";
import { Divider, Text, Button, Card, Layout, ApplicationProvider } from "@ui-kitten/components";
import AppHeader from "@/components/AppHeader";
import * as eva from "@eva-design/eva";
import { useUser, UserProvider } from "@/hooks/UserContext";
import {
    getRequestedPosts,
    Partnership,
    acceptPost,
    getUserPosts,
    deletePost,
} from "@/backend/api";
import { useFocusEffect } from "expo-router";
import { default as customTheme } from "../custom-theme.json"; // <-- Import app theme


const TradesScreen = () => {
    const { userId } = useUser();
    const [trades, setTrades] = useState<Partnership[]>([]);
    const [userTrades, setUserTrades] = useState<Partnership[]>([]);

    // fetch posts made by other users
    const fetchRequestedPosts = async () => {
        if (!userId) {
            console.error("User ID is NULL");
            return;
        }
        try {
            const data = await getRequestedPosts(userId);
            setTrades(data);
        } catch (error) {
            console.error("Failed to fetch trades", error);
        }
    };

    // fetch the posts made by the user
    const fetchUserPosts = async () => {
        if (!userId) {
            console.error("User ID is NULL");
            return;
        }

        try {
            const data = await getUserPosts(userId);
            setUserTrades(data);
        } catch (error) {
            console.error("Failed to fetch trades", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchRequestedPosts();
            fetchUserPosts();
        }, [userId])
    );

    const handleAccept = async (postId: number) => {
        const success = await acceptPost(postId);
        if (success) {
            Alert.alert("Success", "Trade was completed");
            fetchRequestedPosts();
        } else {
            console.error("Error: Trade was NOT accepted");
        }
    };

    const handleDeny = async (postId: number, isUserTrade: boolean) => {
        const success = await deletePost(postId);

        if (success) {
            if (isUserTrade) {
                // Refetch user's posts
                Alert.alert("Success", "Post Deleted Successfully");
                await fetchUserPosts();
            } else {
                // Refetch other users' posts
                Alert.alert("Deleted", "Trade Rejected");
                await fetchRequestedPosts();
            }
        } else {
            console.error("Trade was NOT deleted");
        }
    };

    return (
        <UserProvider>
            <ApplicationProvider
                {...eva}
                theme={{ ...eva.dark, ...customTheme }}
            >
                <SafeAreaView style={styles.container}>
                    <AppHeader />
                    <Divider />
                    <Text style={styles.title}>Requested Trades</Text>
                    {trades.length > 0 ? (
                        trades.map((trade) => (
                            <Card key={trade.post_id} style={styles.tradeCard}>
                                <Text style={styles.text}>
                                    Requesting: {trade.requesting_amount} x{" "}
                                    {trade.requesting_item_name}
                                </Text>
                                <Text style={styles.text}>
                                    Offering: {trade.offering_amount} x{" "}
                                    {trade.offering_item_name}
                                </Text>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        style={styles.button}
                                        status="success"
                                        onPress={() => handleAccept(trade.post_id)}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        style={styles.button}
                                        status="danger"
                                        onPress={() => handleDeny(trade.post_id, false)}
                                    >
                                        Deny
                                    </Button>
                                </View>
                            </Card>
                        ))
                    ) : (
                        <Text style={styles.noTradesText}>No trades available</Text>
                    )}
                    <Text style={styles.title}>Your Offers</Text>
                    {userTrades.length > 0 ? (
                        userTrades.map((trade) => (
                            <Card key={trade.post_id} style={styles.tradeCard}>
                                <Text style={styles.text}>
                                    Requesting: {trade.requesting_amount} x{" "}
                                    {trade.requesting_item_name}
                                </Text>
                                <Text style={styles.text}>
                                    Offering: {trade.offering_amount} x{" "}
                                    {trade.offering_item_name}
                                </Text>
                                <Button
                                    style={styles.button}
                                    status="danger"
                                    onPress={() => handleDeny(trade.post_id, true)}
                                >
                                    Delete
                                </Button>
                            </Card>
                        ))
                    ) : (
                        <Text style={styles.noTradesText}>No offers made</Text>
                    )}
                </SafeAreaView>
            </ApplicationProvider>
        </UserProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#292929",
    },
    title: {
        color: "#ffffff",
        fontSize: 18,
        marginTop: 20,
        fontWeight: "bold",
    },
    tradeCard: {
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
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    button: {
        width: "45%",
    },
    noTradesText: {
        color: "#ffffff",
        marginTop: 20,
    },
});

export default TradesScreen;
