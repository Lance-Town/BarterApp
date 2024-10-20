import React, { useEffect, useState } from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import { Text, Layout, StyleService } from "@ui-kitten/components";
import { getUserItems, Item } from "@/backend/api";
import { useStyleSheet } from "@ui-kitten/components";
import { useUser } from "@/hooks/UserContext";

const ItemsScreen: React.FC = () => {
    const { userId } = useUser(); // get the user id from the contex
    const [items, setItems] = useState<Item[]>([]);
    useEffect(() => {
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
    }, [userId]);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.item_id.toString()}
                renderItem={({ item }) => (
                    <Layout style={styles.itemContainer}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemName}>{item.value}</Text>
                        <Text style={styles.itemName}>
                            {item.transfer_cost}
                        </Text>
                    </Layout>
                )}
            ></FlatList>
        </SafeAreaView>
    );
};

const styles = StyleService.create({
    container: {
        flex: 1,
        padding: 16,
    },
    itemContainer: {
        padding: 16,
        backgroundColor: "#f8f8f8",
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    itemName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    itemDetails: {
        fontSize: 14,
        color: "#555",
    },
});

export default ItemsScreen;
