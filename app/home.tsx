import React from "react";
import { SafeAreaView, FlatList } from "react-native";
import * as eva from '@eva-design/eva';
import { Button, Divider, Layout, TopNavigation, ApplicationProvider, Text, StyleService, useStyleSheet, ButtonGroup } from "@ui-kitten/components";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as customTheme } from './custom-theme.json'; // <-- Import app theme

// Sample data for the top offerings
const offerings = [
    { id: "1", title: "Offering 1" },
    { id: "2", title: "Offering 2" },
    { id: "3", title: "Offering 3" },
    { id: "4", title: "Offering 4" },
    { id: "5", title: "Offering 5" },
];

const HomeScreen: React.FC = () => {
    const styles = useStyleSheet(themedStyles); // Use UI Kitten's theming

    const handlePostOffering = () => {
        // Logic for posting an offering
        console.log("Post Offering");
    };

    const handleViewAllOfferings = () => {
        // Logic for viewing all offerings
        console.log("View All Offerings");
    };

    return (
        <ApplicationProvider {...eva} theme={{...eva.dark, ...customTheme}}>
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
                        <Layout style={styles.container} level='1'>
                            <Button style={styles.inlineButton} appearance="outline" onPress={handlePostOffering}>
                                Post Offering
                            </Button>
                            <Button style={styles.inlineButton} appearance="outline" status="success" onPress={handleViewAllOfferings}>
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
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
});

export default HomeScreen;
