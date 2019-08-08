// AppContainer.ts not AppContainer.tsx if it doesn't render any kind of tsx to the screen
// AppContainer.ts is equivalent to App.tsx -- acts as master layout controller for the whole app

import * as React from 'react';
import {
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator,
    createBottomTabNavigator
} from 'react-navigation';

import { Icon } from 'react-native-elements';

import AllBlogs from './screens/AllBlogs';
import SingleBlog from './screens/SingleBlog';
import Login from './screens/Login';
import AuthLoading from './screens/AuthLoading';
import Test from './screens/ScreenTemplate';
import NewBlog from './screens/NewBlog';

const AuthStack = createStackNavigator(
    {
        Login
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#46494C',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }
    }
);

const AppStack = createStackNavigator(
    {
        // screens
        // Home: AllBlogs, or AllBlogs: AllBlogs, or shorthand to ...
        AllBlogs,
        SingleBlog
    },
    {
        // generic styling -- check react-nav docs for how to style
        // can load components that are your logo, comp button click that can do something, icons, etc
        // inherited across the entire app, but can override rules specifically from another component, i.e. change header color
        initialRouteName: 'AllBlogs',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#46494C',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    });

const BlogsTab = createBottomTabNavigator(
    {
        Blogs: AppStack,
        Compose: createStackNavigator(
            {
                NewBlog
            },
            {
                defaultNavigationOptions: {
                    headerStyle: {
                        backgroundColor: '#46494C',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }   
            }
        )
    },
    {
        initialRouteName: 'Blogs',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                let { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Blogs') {
                    iconName = 'rss';
                } else if (routeName === 'Compose') {
                    iconName = 'pencil';
                }
                return (
                    <Icon
                        color={`${tintColor}`}
                        type='font-awesome'
                        name={`${iconName}`}
                        size={25} />
                );
            }
        }),
        tabBarOptions: {
            activeBackgroundColor: '#1985A1',
            inactiveBackgroundColor: '#4C5C68',
            activeTintColor: 'white',
            inactiveTintColor: 'gray'
        }
    }
);

export default createAppContainer(createSwitchNavigator(
    {
        App: BlogsTab,
        Auth: AuthStack,
        AuthLoading
    },
    {
        initialRouteName: 'AuthLoading'
    }
));