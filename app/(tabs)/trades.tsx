import React, { useCallback, useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Divider, Text, Button, Card } from "@ui-kitten/components";
import AppHeader from "@/components/AppHeader";
import { useUser } from "@/hooks/UserContext";
import { getRequestedPosts, Partnership, acceptPost } from "@/backend/api";
import { useFocusEffect } from "expo-router";

const TradesScreen = () => {
    const { userId } = useUser();
    const [trades, setTrades] = useState<Partnership[]>([]);

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

    useFocusEffect(
        useCallback(() => {
            fetchRequestedPosts();
        }, [userId])
    );

    const handleAccept = async (postId: number) => {
        const success = await acceptPost(postId);
        if (success) {
            console.log("Trade has been accepted");
        } else {
            console.log("Trade was NOT accepted");
        }
    };

    const handleDeny = async (postId: number) => {
        console.log(`Denied trade with post ID: ${postId}`);
    };

    return (
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
                                onPress={() => handleDeny(trade.post_id)}
                            >
                                Deny
                            </Button>
                        </View>
                    </Card>
                ))
            ) : (
                <Text style={styles.noTradesText}>No trades available</Text>
            )}
        </SafeAreaView>
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
        marginVertical: 20,
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
