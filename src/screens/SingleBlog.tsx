import * as React from 'react';
import { json } from '../utils/api';
import { StyleSheet, ScrollView, ImageBackground, View, Alert } from 'react-native';
import { Text, Badge } from 'react-native-elements';
import { NavigationScreenOptions, NavigationParams } from 'react-navigation';
import moment from 'moment';

export interface Props extends NavigationParams { }
export interface State {
    blog: {
        id: number,
        firstname: string,
        title: string,
        content: string,
        _created: Date,
        userid: number
    };
    tag: {
        id: number,
        name: string
    };
}

export default class SingleBlog extends React.Component<Props, State> {

    static navigationOptions: NavigationScreenOptions = {
        // this overrides the defaultNavigationOptions: from AppContainer
        headerTitle: "Single Blog"
    }

    constructor(props: Props) {
        super(props)
        this.state = {
            blog: {
                id: 0,
                firstname: '',
                title: '',
                content: '',
                _created: new Date(),
                userid: 0,
            },
            tag: {
                id: 0,
                name: ''
            }
        }
    }

    async componentDidMount() {
        const id = this.props.navigation.getParam('id', 'NO-ID')
        try {
            let blog = await json(`https://limitless-bastion-43539.herokuapp.com/api/blogs/${id}`);
            let tag = await json(`https://limitless-bastion-43539.herokuapp.com/api/tags/${id}`);
            this.setState({ blog, tag });
        } catch (e) {
            console.log(e);
            Alert.alert("You done messed up, Aaron!")
        }
    }



    render() {
        const { title, content, firstname, _created } = this.state.blog
        const { id, name } = this.state.tag
        return (
            <View style={{ flex: 1 }}>
                {/* <ScrollView> */}
                <ImageBackground
                    style={{ flex: 1, flexDirection: 'column', flexGrow: 1 }}
                    imageStyle={{ opacity: 0.6 }}
                    source={{ uri: 'https://limitless-bastion-43539.herokuapp.com/images/greywood.jpg' }}>
                    <ScrollView>
                    <Text h2 style={styles.titleStyle}>{title}</Text>
                    <Text h4 style={styles.authorStyle}>by {firstname}</Text>
                    <Text style={styles.dateStyle}>on {moment(_created).format('MMM DD, YYYY')}</Text>
                    <Badge
                        key={id}
                        value={name}
                        textStyle={styles.textStyle}
                        badgeStyle={styles.badgeStyle}
                    />
                    <View style={styles.bodyContainer}>
                        <Text style={styles.bodyTextStyle}>{content}</Text>
                    </View>
                    </ScrollView>
                </ImageBackground>
                {/* </ScrollView> */}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    titleStyle: {
        paddingHorizontal: 5,
        textAlign: 'center',
        color: '#46494C',
        marginTop: 15,
        fontWeight: 'bold'
    },
    authorStyle: {
        fontSize: 24,
        color: '#46494C',
        textAlign: 'center',
        marginTop: 15,
        fontWeight: 'bold'
    },
    dateStyle: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 5,
        marginHorizontal: 20,
        padding: 10,
        color: '#46494C',
        fontWeight: 'bold'
    },
    badgeStyle: {
        backgroundColor: '#1985A1',
        borderWidth: 2,
        borderColor: '#46494C',
        borderStyle: 'solid',
        height: 30,
        width: 120,
        marginTop: 5
    },
    textStyle: {
        fontSize: 20,
        color: 'white'
    },
    bodyContainer: {
        marginTop: 25,
        marginHorizontal: 15,
        padding: 5,
        borderWidth: 2,
        borderColor: '#46494C',
        borderStyle: 'solid',
        borderRadius: 10,
        backgroundColor: 'white'
    },
    bodyTextStyle: {
        color: '#46494C',
        fontSize: 20,
        lineHeight: 25,
        fontWeight: 'bold',
        padding: 5
    }
});
