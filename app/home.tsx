import React from "react";
import { SafeAreaView, Text, FlatList } from "react-native";
import { Button, Divider, Layout, TopNavigation } from "@ui-kitten/components";

// Sample data for the top offerings
const offerings = [
    { id: "1", title: "Offering 1" },
    { id: "2", title: "Offering 2" },
    { id: "3", title: "Offering 3" },
    { id: "4", title: "Offering 4" },
    { id: "5", title: "Offering 5" },
];

const HomeScreen: React.FC = () => {
    const handlePostOffering = () => {
        // Logic for posting an offering
        console.log("Post Offering");
    };

    const handleViewAllOfferings = () => {
        // Logic for viewing all offerings
        console.log("View All Offerings");
    };

    return (
        <Layout style={{ width: "100%", height: "100%" }}>
            <SafeAreaView style={{ flex: 1 }}>
                <TopNavigation title="BarterApp" alignment="center" />
                <Divider />
                <Layout
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button onPress={handlePostOffering}>Post Offering</Button>
                    <Button onPress={handleViewAllOfferings}>
                        All Offerings
                    </Button>
                </Layout>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        marginBottom: 10,
                    }}
                >
                    Top 5 Offerings
                </Text>
                <FlatList
                    data={offerings}
                    renderItem={({ item }) => (
                        <Layout
                            style={{
                                padding: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: "#ccc",
                                width: "100%",
                            }}
                        >
                            <Text>{item.title}</Text>
                        </Layout>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        </Layout>
    );
};

export default HomeScreen;
