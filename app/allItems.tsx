import React, { useState } from "react";
import { Image, FlatList, SafeAreaView } from "react-native";
import * as eva from "@eva-design/eva";
import { Text, Layout, StyleService, Button, ApplicationProvider } from "@ui-kitten/components";
import { getOtherItems, Item } from "@/backend/api";
import { useStyleSheet } from "@ui-kitten/components";
import { useUser, UserProvider } from "@/hooks/UserContext";
import { default as customTheme } from "./custom-theme.json"; // <-- Import app theme
import AppHeader from "@/components/AppHeader";
import { useFocusEffect, router } from "expo-router";

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
        <UserProvider>
            <ApplicationProvider
                {...eva}
                theme={{ ...eva.dark, ...customTheme }}
            >
                <SafeAreaView style={styles.container}>
                    <Layout style={styles.header} level="1">
                        <Button
                            style={styles.backButton}
                            appearance="outline"
                            onPress={() => router.back()}
                        >
                            Back
                        </Button>
                        <Image
                            source={require("../assets/logo/trade4gold.png")} //placeholder logo for now
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </Layout>
                    <Layout
                        style={{
                            margin: 10,
                            marginBottom: 50,
                            padding: 10,
                            borderRadius: 10,
                            backgroundColor: "#595858",
                            marginTop: 80,
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
            </ApplicationProvider>
        </UserProvider>
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
    backButton: {
        marginTop: 30,
        marginLeft: 10,
    },
    logo: {
        width: 100,
        height: 50,
        marginTop: 20, // Aligns logo with the top of the back button
    },
    header: {
        position: "absolute", // Keeps it at the top
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        marginTop: 30,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "transparent",
    },
});

export default AllItemsScreen;
