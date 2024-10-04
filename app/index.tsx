import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
// import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as customTheme } from './custom-theme.json'; // <-- Import app theme

const Index: React.FC = () => {
    return (
        <ApplicationProvider {...eva} theme={{...eva.dark, ...customTheme}}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Welcome to the Barter App</Text>
                {/* <Link href={{ pathname: "./signIn" }}>
                    <Button title="Sign In" />
                </Link>
                <Link href="./signUp" style={styles.button}>
                    <Button title="Sign Up" />
                </Link> */}

                <Button title="Sign In" onPress={() => router.push("/signIn")} />
                <Button title="Sign Up" onPress={() => router.push("/signUp")} />
            </Layout>
        </ApplicationProvider>
    );
};

export default Index;
