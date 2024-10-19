import React from "react";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";

export const AppBottomNavigation = (): React.ReactElement => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <BottomNavigation
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index)}
        >
            <BottomNavigationTab title="HOME" />
            <BottomNavigationTab title="ITEMS" />
            <BottomNavigationTab title="TRANSACTIONS" />
        </BottomNavigation>
    );
};
