import * as React from 'react';
import { json, SetAccessToken, getUser } from '../utils/api';
import { StyleSheet, View, Alert, ImageBackground, Text } from 'react-native';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { Input, Button } from 'react-native-elements';

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

    async handleLogin() {
        try {
            let result = await json('https://limitless-bastion-43539.herokuapp.com/auth/login', 'POST', {
                email: this.state.email,
                password: this.state.password
            });
            this.setState({ email: '', password: '' })
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
                <ImageBackground
                    style={{ flex: 1, flexDirection: 'column', flexGrow: 1 }}
                    source={{ uri: 'https://limitless-bastion-43539.herokuapp.com/images/greywood.jpg' }}>
                    <View style={styles.header}>
                        <Text style={styles.text}>My Blog</Text>
                    </View>
                    <View style={styles.login}>
                        <View style={{ marginTop: 10 }}>
                            <Input
                                containerStyle={{ marginVertical: 5 }}
                                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                                leftIconContainerStyle={{ paddingRight: 15 }}
                                placeholder="  Email"
                                value={this.state.email}
                                onChangeText={(text) => this.setState({ email: text })}
                                clearButtonMode='always'
                            />
                            <Input
                                containerStyle={{ marginVertical: 5 }}
                                leftIcon={{ type: 'font-awesome', name: 'key' }}
                                leftIconContainerStyle={{ paddingRight: 15 }}
                                placeholder="  Password"
                                secureTextEntry={true}
                                value={this.state.password}
                                onChangeText={(text) => this.setState({ password: text })}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Button
                                raised
                                title="Login"
                                containerStyle={{ margin: 10, marginTop: 50 }}
                                buttonStyle={{ backgroundColor: '#1985A1' }}
                                onPress={() => this.handleLogin()}
                            />
                        </View>
                    </View>

                </ImageBackground>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DCDCDD'
    },
    login: {
        marginTop: 10,
        backgroundColor: 'white',
        height: 225,
        margin: 10,
        borderWidth: 2,
        borderColor: '#46494C',
        borderStyle: 'solid',
        borderRadius: 10
    },
    header: {
        borderWidth: 2,
        margin: 10,
        borderColor: '#46494C',
        borderStyle: 'solid',
        borderRadius: 10,
        marginTop: 150,
        backgroundColor: 'white'
    },
    text: {
        padding: 15,
        textAlign: 'center',
        fontSize: 40,
        fontFamily: 'Pacifico-Regular'
    }
})