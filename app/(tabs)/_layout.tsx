import { Tabs } from "expo-router";

// TODO : update the UI for the bottom navigation

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#292929",
                    borderTopWidth: 0,
                },
            }}
        >
            {/* <Tabs.Screen name="index" options={{ title: "Home" }} />
            <Tabs.Screen name="items" options={{ title: "Items" }} />
            <Tabs.Screen
                name="transactions"
                options={{ title: "Transactions" }}
            /> */}
        </Tabs>
    );
}
