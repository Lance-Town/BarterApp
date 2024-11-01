import React, { useState } from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import { Text, Layout, StyleService } from "@ui-kitten/components";
import { getUserItems, Item } from "@/backend/api";
import { useStyleSheet } from "@ui-kitten/components";
import { useUser } from "@/hooks/UserContext";
import AppHeader from "@/components/AppHeader";
import { useFocusEffect } from "expo-router";

const ItemsScreen: React.FC = () => {
    const { userId } = useUser(); // get the user id from the contex
    const [items, setItems] = useState<Item[]>([]);
    useFocusEffect(
        React.useCallback(() => {
            if (!userId) {
                return;
            }

            const fetchItems = async () => {
                try {
                    const response = await getUserItems(userId);
                    setItems(response);
                } catch (error) {
                    console.error("Failed to fetch items:", error);
                }
            };

            fetchItems();
        }, [userId]) // Only re-run if userId changes
    );

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader />
            <Layout
                style={{
                    margin: 10,
                    marginBottom: 50,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: "#595858",
                }}
            >
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.item_id.toString()}
                    renderItem={({ item }) => (
                        <Layout style={styles.itemContainer}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text
                                style={styles.itemName}
                            >{`Value: $${item.value}`}</Text>
                            <Text style={styles.itemName}>
                                {`Transfer Cost: $${item.transfer_cost}`}
                            </Text>
                        </Layout>
                    )}
                ></FlatList>
            </Layout>
        </SafeAreaView>
    );
};

const styles = StyleService.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#292929",
    },
    itemContainer: {
        padding: 16,
        backgroundColor: "#595858",
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    itemName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#f8f8f8",
    },
    itemDetails: {
        fontSize: 14,
        color: "#555",
    },
});

export default ItemsScreen;
