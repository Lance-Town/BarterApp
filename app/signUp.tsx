import React, { useState } from "react";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import * as eva from "@eva-design/eva";
import {
    ApplicationProvider,
    IconRegistry,
    Layout,
    Text,
    StyleService,
    useStyleSheet,
    Input,
    Button,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { SERVER_IP, SERVER_PORT } from "../constants/config";
import { default as customTheme } from "./custom-theme.json"; // <-- Import app theme

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
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...customTheme }}>
            <Layout
                style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    paddingTop: 60,
                }}
            >
                <Image
                    source={require('../assets/images/logo-placeholder.png')}   //placeholder logo for now
                    style={themedStyles.logo}
                    resizeMode="contain"
                />

                <Text 
                    style={styles.title}
                    category='h1'>
                        Sign Up
                </Text>
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
                <Button
                     style={styles.button}
                     appearance="filled"
                     onPress={handleSignUp}
                >
                    Sign Up
                </Button>

                <Text style={{marginTop: 6}} category="s2" status="primary">
                    Already have an account?
                </Text>

                <Button
                    style={styles.button}
                    appearance="outline"
                    size="medium"
                    onPress={() => router.push("/signIn")}
                >
                    Sign In
                </Button>
            </Layout>
        </ApplicationProvider>
    );
};

const themedStyles = StyleService.create({
    title: {
        margin: 20,
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
});

export default SignUpScreen;
