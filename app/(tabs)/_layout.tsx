import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#1A1A1A",
                    borderTopWidth: 0,
                    height: 70,
                    paddingBottom: 20,
                },
                tabBarActiveTintColor: "#FFDA4B",
                tabBarInactiveTintColor: "#888888",
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                    marginTop: -4,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    switch (route.name) {
                        case "index":
                            iconName = focused ? "home" : "home-outline";
                            break;
                        case "items":
                            iconName = focused ? "list" : "list-outline";
                            break;
                        case "transactions":
                            iconName = focused ? "wallet" : "wallet-outline";
                            break;
                        default:
                            iconName = "help-circle-outline"; // Fallback icon
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tabs.Screen name="home" options={{ title: "Home" }} />
            <Tabs.Screen name="items" options={{ title: "Items" }} />
            <Tabs.Screen name="transactions" options={{ title: "Transactions" }} />
        </Tabs>
    );
}
