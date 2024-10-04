import React from "react";
import { Layout, Text, Button, Divider } from "@ui-kitten/components";
import { useRouter } from "expo-router";

const Index: React.FC = () => {
    const router = useRouter();

    return (
        <Layout
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 16,
            }}
        >
            <Text category="h1">Barter App</Text>
            <Layout>
                <Button
                    style={{ marginTop: 16 }}
                    onPress={() => router.push("/signIn")}
                >
                    Sign In
                </Button>
                <Button
                    style={{ marginTop: 8 }}
                    onPress={() => router.push("/signUp")}
                >
                    Sign Up
                </Button>
            </Layout>
        </Layout>
    );
};

export default Index;
