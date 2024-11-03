import React, { useState } from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import { Text, Layout, StyleService } from "@ui-kitten/components";
import { fetchTransactions, Transaction } from "@/backend/api";
import { useStyleSheet } from "@ui-kitten/components";
import { useUser } from "@/hooks/UserContext";
import AppHeader from "@/components/AppHeader";
import { useFocusEffect } from "expo-router";
import TradesScreen from "./trades";

const TransactionsScreen: React.FC = () => {
    const { userId } = useUser(); // Get the user ID from context
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const styles = useStyleSheet(themedStyles);

    useFocusEffect(
        React.useCallback(() => {
            if (!userId) {
                return;
            }

            const fetchUserTransactions = async () => {
                try {
                    const response = await fetchTransactions(userId);
                    setTransactions(response);
                } catch (error) {
                    console.error("Failed to fetch transactions:", error);
                }
            };

            fetchUserTransactions();
            console.log(transactions);
        }, [userId]) // Only re-run if userId changes
    );

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader />
            <Layout style={styles.layout}>
                {transactions.length > 0 ? (
                    <FlatList
                        data={transactions}
                        keyExtractor={(item) => item.transaction_id.toString()}
                        renderItem={({ item }) => (
                            <Layout style={styles.transactionContainer}>
                                <Text style={styles.transactionText}>
                                    {`Item: ${item.user1_itemName}`}
                                </Text>
                                <Text style={styles.transactionText}>
                                    {`Sold: ${item.user1_itemSold}`}
                                </Text>
                                <Text style={styles.transactionText}>
                                    {`Item: ${item.user2_itemName}`}
                                </Text>
                                <Text style={styles.transactionText}>
                                    {`Sold: ${item.user2_itemSold}`}
                                </Text>
                            </Layout>
                        )}
                    />
                ) : (
                    <Text style={styles.noHistoryText}>
                        No Transaction History
                    </Text>
                )}
            </Layout>
        </SafeAreaView>
    );
};

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#292929",
    },
    layout: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#595858",
    },
    transactionContainer: {
        padding: 16,
        backgroundColor: "#595858",
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    transactionText: {
        fontSize: 16,
        color: "#f8f8f8",
    },
    noHistoryText: {
        color: "#ffffff",
        marginTop: 20,
    },
});

export default TransactionsScreen;
