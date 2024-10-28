import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons"; // Import Feather icons

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#1A1A1A",
                    borderTopWidth: 0,
                    height: 75,
                    paddingBottom: 20,
                },
                tabBarActiveTintColor: "#FFDA4B",
                tabBarInactiveTintColor: "#888888",
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                    marginTop: -2,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Feather.glyphMap;

                    switch (route.name) {
                        case "home":
                            iconName = "home";
                            break;
                        case "items":
                            iconName = "list";
                            break;
                        case "transactions":
                            iconName = "credit-card";
                            break;
                        case "trades":
                            iconName = "clock";
                            break;
                        default:
                            iconName = "help-circle"; // Fallback icon
                    }

                    return (
                        <Feather name={iconName} size={size} color={color} />
                    );
                },
            })}
        >
            <Tabs.Screen name="home" options={{ title: "Home" }} />
            <Tabs.Screen name="items" options={{ title: "Items" }} />
            <Tabs.Screen
                name="transactions"
                options={{ title: "Transactions" }}
            />
            <Tabs.Screen name="trades" options={{ title: "Trades" }} />
        </Tabs>
    );
}
