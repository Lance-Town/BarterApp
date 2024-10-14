import React, { useState } from "react";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import * as eva from "@eva-design/eva";
import {
    ApplicationProvider,
    IconRegistry,
    Layout,
    Text,
    Button,
    Icon,
    Input,
    StyleService,
    useStyleSheet,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons"; // <-- Import EvaIconsPack
import { signInUser, SignInData } from "@/backend/api";
import { default as customTheme } from "./custom-theme.json"; // <-- Import app theme

const SignInScreen: React.FC = () => {
    const router = useRouter();
    const styles = useStyleSheet(themedStyles); // Use UI Kitten's theming
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSignIn = async () => {
        if (!email || !password) {
            alert("Email and password are required");
            return;
        }

        const signInData: SignInData = { email, password };

        try {
            const result = await signInUser(signInData);
            console.log("Sign-in Successful", result);
            router.push("/home");
        } catch (error: any) {
            alert("Sign-in failed: " + error.message);
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
                    Sign In
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
                <Button
                    style={styles.button}
                    appearance="filled"
                    onPress={handleSignIn}
                >
                    Sign In
                </Button>

                <Text style={{ marginTop: 6 }} category="s2" status="primary">
                    Don't have an account?
                </Text>

                <Button
                    style={styles.button}
                    appearance="outline"
                    size="medium"
                    onPress={() => router.push("/signUp")}
                >
                    Sign Up
                </Button>
            </Layout>
        </ApplicationProvider>
    );
};

const themedStyles = StyleService.create({
    input: {
        marginBottom: 12,
        width: "80%",
    },
    button: {
        margin: 6,
    },
    text: {
        margin: 12,
    },
    title: {
        margin: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        marginTop: 40,
    },
});

export default SignInScreen;
