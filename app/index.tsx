import React from "react";
import { Image, ImageBackground } from "react-native";
import { Link, router } from "expo-router";
import * as eva from "@eva-design/eva";
import {
    ApplicationProvider,
    IconRegistry,
    Layout,
    Text,
    StyleService,
    useStyleSheet,
    Button,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as customTheme } from "./custom-theme.json"; // <-- Import app theme

const Index: React.FC = () => {
    const styles = useStyleSheet(themedStyles); // Use UI Kitten's theming

    return (
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...customTheme }}>
            <ImageBackground
                source={require("../assets/logo/trade4spread.png")} // Replace with your image URL or local path
                style={themedStyles.backgroundImage}
            >
                <Layout
                    style={{
                        flex: 1,
                        justifyContent: "flex-start",
                        alignItems: "center",
                        paddingTop: 60,
                        backgroundColor: "transparent",
                    }}
                >
                    <Image
                        source={require("../assets/logo/trade4gold.png")} //placeholder logo for now
                        style={themedStyles.logo}
                        resizeMode="contain"
                    />

                    <Layout
                        style={{
                            flex: 1, // Takes up remaining space
                            justifyContent: "flex-end", // Push content to the bottom
                            width: "100%", // Ensures buttons are aligned to full width
                            alignItems: "center", // Center the buttons horizontally
                            paddingBottom: 100, // Add some space at the bottom
                            backgroundColor: "transparent",
                        }}
                    >
                        <Text style={styles.title} category="h6">
                            Welcome to the Trade 4!
                        </Text>
                        <Layout style={styles.container} level="1">
                            <Button
                                style={styles.button}
                                appearance="outline"
                                onPress={() => router.push("/signIn")}
                            >
                                Sign In
                            </Button>

                            <Button
                                style={styles.button}
                                appearance="filled"
                                onPress={() => router.push("/signUp")}
                            >
                                Sign Up
                            </Button>
                        </Layout>
                    </Layout>
                </Layout>
            </ImageBackground>
        </ApplicationProvider>
    );
};

const themedStyles = StyleService.create({
    title: {
        margin: 20,
        textAlign: "center",
    },
    input: {
        marginBottom: 12,
        width: "80%",
    },
    button: {
        margin: 6,
    },
    logo: {
        width: 300,
        height: 200,
        marginBottom: 20,
        marginTop: 5,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "transparent",
    },
});

export default Index;
