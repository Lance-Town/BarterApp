import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, ImageBackground } from "react-native";
import * as eva from "@eva-design/eva";
import {
    Button,
    Divider,
    Layout,
    ApplicationProvider,
    Text,
    StyleService,
    useStyleSheet,
    ButtonGroup,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { fetchFiveItems, Item } from "@/backend/api";
import { default as customTheme } from "./custom-theme.json"; // <-- Import app theme
import { router } from "expo-router";
import AppHeader from "@/components/Trade4Logo";

const HomeScreen: React.FC = () => {
    const styles = useStyleSheet(themedStyles); // Use UI Kitten's theming
    const [offerings, setOfferings] = useState<Item[]>([]);

    useEffect(() => {
        try {
            const loadItems = async () => {
                const data = await fetchFiveItems();
                console.log("Loaded all items");
                setOfferings(data);
            };
            loadItems();
        } catch (error: any) {
            console.log("Error loading 5 offerings: " + error.message);
        }
    }, []);

    const handlePostOffering = () => {
        // Logic for posting an offering
        router.push("/NewPost");
    };

    const handleViewAllOfferings = () => {
        // Logic for viewing all offerings
        console.log("View All Offerings");
    };

    return (
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...customTheme }}>
            <ImageBackground
                source={require("../assets/logo/trade4spread.png")} // Replace with your image URL or local path
                style={themedStyles.backgroundImage}
            >
                <Layout
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "transparent",
                    }}
                >
                    <SafeAreaView style={{ flex: 1 }}>
                        <AppHeader />
                        <Divider />
                        <Layout
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "transparent",
                            }}
                        >
                            <Layout style={styles.container} level="1">
                                <Button
                                    style={styles.inlineButton}
                                    appearance="outline"
                                    onPress={handlePostOffering}
                                >
                                    Post Offering
                                </Button>
                                <Button
                                    style={styles.inlineButton}
                                    appearance="outline"
                                    status="success"
                                    onPress={handleViewAllOfferings}
                                >
                                    All Offerings
                                </Button>
                            </Layout>
                        </Layout>
                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: "bold",
                                marginBottom: 10,
                                paddingLeft: 10,
                            }}
                        >
                            Top 5 Offerings
                        </Text>
                        <FlatList
                            style={styles.content}
                            data={offerings}
                            renderItem={({ item }) => (
                                <Layout
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        padding: 10,
                                        borderBottomWidth: 1,
                                        borderBottomColor: "#ccc",
                                        width: "100%",
                                        backgroundColor: "transparent",
                                    }}
                                >
                                    <Text>{item.name}</Text>
                                    <Text>{"$" + item.value}</Text>
                                </Layout>
                            )}
                            keyExtractor={(item) => item.item_id}
                        />
                    </SafeAreaView>
                </Layout>
            </ImageBackground>
        </ApplicationProvider>
    );
};

const themedStyles = StyleService.create({
    inlineButton: {
        margin: 6,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        marginTop: 40,
    },
    content: {
        padding: 10,
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "transparent",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
});

export default HomeScreen;
