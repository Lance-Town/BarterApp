import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Divider, Layout, Text } from "@ui-kitten/components";
import AppHeader from "@/components/AppHeader";

const TradesScreen = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "#292929",
            }}
        >
            <AppHeader />
            <Divider />
            <Text style={{ color: "#ffffff" }}>Trades coming soon</Text>
        </SafeAreaView>
    );
};

export default TradesScreen;
