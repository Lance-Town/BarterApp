import React, { useState } from "react";
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
