import React, { useState } from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import { Text, Layout, StyleService } from "@ui-kitten/components";
import { getOtherItems, Item } from "@/backend/api";
import { useStyleSheet } from "@ui-kitten/components";
import { useUser } from "@/hooks/UserContext";
import AppHeader from "@/components/AppHeader";
import { useFocusEffect } from "expo-router";

const AllItemsScreen: React.FC = () => {
    const { userId } = useUser(); // Get the user id from the context
    const [items, setItems] = useState<Item[]>([]);

    useFocusEffect(
        React.useCallback(() => {
            if (!userId) {
                return;
            }

            const fetchItems = async () => {
                try {
                    const response = await getOtherItems(userId);
                    setItems(response);
                } catch (error) {
                    console.error("Failed to fetch items:", error);
                }
            };

            fetchItems();
            console.log(items);
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
                                style={styles.itemDetails}
                            >{`Value: $${item.value}`}</Text>
                            <Text
                                style={styles.itemDetails}
                            >{`Condition: ${item.condition}`}</Text>
                        </Layout>
                    )}
                />
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
        color: "#ffffff",
    },
    itemDetails: {
        fontSize: 14,
        color: "#ffffff",
    },
});

export default AllItemsScreen;
