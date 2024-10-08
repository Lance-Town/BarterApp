import React from "react";
import { Image } from "react-native";
import { Link, router } from "expo-router";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text, StyleService, useStyleSheet, Button } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as customTheme } from './custom-theme.json'; // <-- Import app theme

const Index: React.FC = () => {
    const styles = useStyleSheet(themedStyles); // Use UI Kitten's theming

    return (
        <ApplicationProvider {...eva} theme={{...eva.dark, ...customTheme}}>
            <Layout
                style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    paddingTop: 60,
                }}
            >
                <Text
                    style={styles.title}
                    category="h3"
                >
                    Welcome{"\n"}to the Barter App
                </Text>
                {/* <Link href={{ pathname: "./signIn" }}>
                    <Button title="Sign In" />
                </Link>
                <Link href="./signUp" style={styles.button}>
                    <Button title="Sign Up" />
                </Link> */}

                <Image
                    source={require('../assets/images/logo-placeholder.png')}   //placeholder logo for now
                    style={themedStyles.logo}
                    resizeMode="contain"
                />

                <Layout
                    style={{
                        flex: 1, // Takes up remaining space
                        justifyContent: "flex-end", // Push content to the bottom
                        width: '100%', // Ensures buttons are aligned to full width
                        alignItems: 'center', // Center the buttons horizontally
                        paddingBottom: 100, // Add some space at the bottom
                    }}
                >
                    <Layout style={styles.container} level='1'>
                        <Button 
                            style={styles.button}
                            appearance="outline"
                            onPress={() => router.push("/signIn")}
                        > Sign In
                        </Button>

                     

                        <Button 
                            style={styles.button}
                            appearance="filled"
                            onPress={() => router.push("/signUp")}
                        > Sign Up
                        </Button>
                    </Layout>
                </Layout>
            </Layout>
        </ApplicationProvider>
    );
};


const themedStyles = StyleService.create({
    title: {
        margin: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 12,
        width: '80%',
    },
    button: {
        margin: 6,
    },
    logo: {
        width: 150,
        height: 150, 
        marginBottom: 20, 
        marginTop: 40,
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
});

export default Index;
