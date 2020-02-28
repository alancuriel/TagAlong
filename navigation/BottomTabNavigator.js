import React from "react"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";


const BottomTab= createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default class BottomTabNavigator extends React.Component {


    render() {
        return (
            <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
                <BottomTab.Screen name="Home" 
                    component={HomeScreen} 
                    options={{
                        tabBarLabel: "Discover"
                    }}/>

                <BottomTab.Screen name="Search"
                    component={SearchScreen}/>
                
                <BottomTab.Screen name="Profile"
                    component={ProfileScreen}/>
            </BottomTab.Navigator>
        );
    }
}
