import * as React from 'react';
import { json, SetAccessToken, getUser } from '../utils/api';
import { StyleSheet, View, Alert } from 'react-native';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

interface Props extends NavigationScreenProps { }
interface State { 
    email: string,
    password: string
}

export default class Login extends React.Component<Props, State> {

    static navigationOptions: NavigationScreenOptions = {
        headerTitle: "Login"
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }
    // Could do this for continued logged in experience, but it provides them 
    // with a back button to go back to the login screen.
    // handled better with SwitchNavigator in AppContainer.ts
    // async componentDidMount() {
    //     let user = await getUser();
    //     if (user && user.role === 'admin') {
    //         this.props.navigation.navigate('AllBlogs')
    //     }
    // }


    async handleLogin() {
        try {
            let result = await json('https://limitless-bastion-43539.herokuapp.com/auth/login', 'POST', {
                email: this .state.email,
                password: this.state.password
            });
            this.setState({email: '', password: ''})
            if (result) {
                await SetAccessToken(result.token, { userid: result.userid, role: result.role });
                let user = await getUser();
                console.log('user', user)
                if (user && user.role === 'admin') {
                    this.props.navigation.navigate('AllBlogs')
                } else {
                    Alert.alert('Invalid Credentials')
                }
            }
        } catch (e) {
            console.log(e);
            Alert.alert('Problem logging in? Contact your admin!');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Input
                        containerStyle={{ marginVertical: 5}}
                        leftIcon={{ type: 'font-awesome', name: 'envelope'}}
                        placeholder="  Email"
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })}
                        clearButtonMode='always'
                    />
                    <Input
                        containerStyle={{ marginVertical: 5}}
                        leftIcon={{ type: 'font-awesome', name: 'key'}}
                        placeholder="  Password"
                        secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({password: text})}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        raised
                        title="Login"
                        containerStyle={{ margin: 10 }}
                        buttonStyle={{ backgroundColor: '#1985A1' }}
                        onPress={() => this.handleLogin()}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DCDCDD'
    }
})