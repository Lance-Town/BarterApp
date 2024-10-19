import { Tabs, Stack } from "expo-router";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

export default function RootLayout() {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                {/* <Stack.Screen name="signIn" />
                <Stack.Screen name="signUp" />
                <Stack.Screen name="home" />
                <Stack.Screen name="newItem" /> */}
            </Stack>
        </ApplicationProvider>
    );
}
