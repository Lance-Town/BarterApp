import React, { useState } from "react";
<<<<<<< Updated upstream
import {
    Layout,
    Text,
    Input,
    Button,
    StyleService,
    useStyleSheet,
} from "@ui-kitten/components";
import { useRouter } from "expo-router";
import { SERVER_IP, SERVER_PORT } from "../constants/config";
=======
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as customTheme } from './custom-theme.json'; // <-- Import app theme
>>>>>>> Stashed changes

const SignUpScreen: React.FC = () => {
    const router = useRouter();
    const styles = useStyleSheet(themedStyles); // Use UI Kitten's theming
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const accessLevel = 0;

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (!email || !password) {
            alert("Email and Password are required");
            return;
        }

        try {
<<<<<<< Updated upstream
            const response = await fetch(
                `http://${SERVER_IP}:${SERVER_PORT}/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        phone_number: phoneNumber,
                        address,
                        access_level: accessLevel,
                    }),
                }
            );
=======
            const response = await fetch("http://50.52.118.218:3000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    phone_number: phoneNumber,
                    address,
                    access_level: accessLevel,
                }),
            });
>>>>>>> Stashed changes

            const data = await response.json();
            if (response.ok) {
                // Handle successful sign-up (e.g., navigate to sign-in or main app screen)
                console.log("Sign-up successful:", data);
                router.push("/signIn"); // Navigate to sign-in screen after sign-up
            } else {
                // Handle error (e.g., show error message)
                console.error("Sign-up error:", data.message);
                alert(data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
<<<<<<< Updated upstream
        <Layout style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <Input
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Input
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Input
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <Input
                style={styles.input}
                placeholder="Phone Number (optional)"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />
            <Input
                style={styles.input}
                placeholder="Address (optional)"
                value={address}
                onChangeText={setAddress}
            />
            <Button style={styles.button} onPress={handleSignUp}>
                Sign Up
            </Button>
            <Button
                style={styles.button}
                appearance="ghost"
                onPress={() => router.push("/signIn")}
            >
                Already have an account? Sign In
            </Button>
        </Layout>
=======
        <ApplicationProvider {...eva} theme={{...eva.dark, ...customTheme}}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.title}>Sign Up</Text>
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
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number (optional)"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Address (optional)"
                    value={address}
                    onChangeText={setAddress}
                />
                <Button title="Sign Up" onPress={handleSignUp} />
                <Button
                    title="Already have an account? Sign In"
                    onPress={() => router.push("/signIn")}
                />
            </Layout>
        </ApplicationProvider>
>>>>>>> Stashed changes
    );
};

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: "center",
    },
    input: {
        marginBottom: 12,
    },
    button: {
        marginVertical: 8,
    },
});

export default SignUpScreen;
