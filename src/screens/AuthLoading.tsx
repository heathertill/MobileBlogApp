import * as React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { getAccessToken } from '../utils/api';
import { NavigationScreenProps } from 'react-navigation'

interface Props extends NavigationScreenProps {}
interface State { }

export default class AuthLoading extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this._accessToken();
    }

    async _accessToken() {
        try {
            // use in debugging
            // await AsyncStorage.clear();  
            let token = await getAccessToken();
            this.props.navigation.navigate(token? 'App' : 'Auth')
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}