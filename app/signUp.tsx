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
import { default as customTheme } from "./custom-theme.json"; // <-- Import app theme
import { signUpUser, SignUpData } from "@/backend/api";

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
        const signUpData: SignUpData = {
            email,
            password,
            confirmPassword,
            phoneNumber,
            address,
            accessLevel,
        };

        try {
            const result = await signUpUser(signUpData);
            console.log("Sign-up successful:", result);
            router.push("/signIn");
        } catch (error) {
            alert("Sign-up failed: " + error);
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
                    source={require("../assets/images/logo-placeholder.png")} //placeholder logo for now
                    style={themedStyles.logo}
                    resizeMode="contain"
                />

                <Text style={styles.title} category="h1">
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

                <Text style={{ marginTop: 6 }} category="s2" status="primary">
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
        width: "80%",
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
