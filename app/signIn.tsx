import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Layout, Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import { SERVER_IP, SERVER_PORT } from "../constants/config";

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
});

export default SignInScreen;
