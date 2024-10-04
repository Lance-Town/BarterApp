import { Stack } from "expo-router";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

export default function RootLayout() {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="signIn" options={{ headerShown: false }} />
                <Stack.Screen name="signUp" options={{ headerShown: false }} />
                <Stack.Screen name="home" options={{ headerShown: false }} />
            </Stack>
        </ApplicationProvider>
    );
}
