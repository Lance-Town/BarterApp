import React, { useState } from "react";
<<<<<<< Updated upstream
import { View, StyleSheet } from "react-native";
import { Input, Button, Layout, Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import { SERVER_IP, SERVER_PORT } from "../constants/config";
=======
import { View, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text, Button } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as customTheme } from './custom-theme.json'; // <-- Import app theme
>>>>>>> Stashed changes

const SignInScreen: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSignIn = async () => {
        if (!email || !password) {
            alert("Email and password are required");
            return;
        }

        try {
<<<<<<< Updated upstream
            const response = await fetch(
                `http://${SERVER_IP}:${SERVER_PORT}/signin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );
=======
            const response = await fetch("http://50.52.118.218:3000/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
>>>>>>> Stashed changes

            const data = await response.json();
            if (response.ok) {
                console.log("Sign-in successful:", data);
                router.push("/home");
            } else {
                console.error("Sign-in error:", data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
<<<<<<< Updated upstream
        <Layout style={styles.container}>
            <Text category="h1">Sign In</Text>
            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
            />
            <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button onPress={handleSignIn}>Sign In</Button>
            <Button onPress={() => router.push("/signUp")} appearance="ghost">
                Don't have an account? Sign Up
            </Button>
        </Layout>
=======
        <ApplicationProvider {...eva} theme={{...eva.dark, ...customTheme}}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.title}>Sign In</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Button style={styles.button} appearance='filled' onPress={handleSignIn}>
                    Sign In
                </Button>
                
                <Text category='s2' status='primary'>{"\n"}Don't have an account?</Text>

                <Button style={styles.button} appearance='outline' size='medium' onPress={() => router.push("/signUp")}>
                    Sign Up
                </Button>
            </Layout>
        </ApplicationProvider>
>>>>>>> Stashed changes
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    input: {
        marginBottom: 12,
    },
    button: {
        margin: 8,
    },
});

export default SignInScreen;
