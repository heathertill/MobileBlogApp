import * as React from 'react';
import { Text, Button, Icon } from 'react-native-elements';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

interface Props extends NavigationInjectedProps {
    blog: {
        id: number,
        firstname: string
        title: string,
        content: string,
        userid: number,
        _created: Date
    }
}

interface State { }

class BlogPreviewCard extends React.Component<Props, State> {
    render() {
        const { id, title, firstname } = this.props.blog;
        return (
            <View style={{ marginBottom: 10 }} >
                <ImageBackground
                    source={{ uri: 'https://limitless-bastion-43539.herokuapp.com/images/greywood.jpg' }}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 300 }}>
                    <View style={{ flex: 1, padding: 25 }} >
                        <View style={styles.titleView} >
                            <Text style={styles.title} >{title}</Text>
                        </View>
                        <Text style={styles.author} >{`Written by ${firstname}`}</Text>
                        <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            buttonStyle={{ backgroundColor: '#1985A1' }}
                            title='Read this Blog'
                            onPress={() => this.props.navigation.navigate('SingleBlog', { id })}
                        />
                    </View>
                </ImageBackground>
            </View>




        );
    }
}

const styles = StyleSheet.create({
    title: {
        backgroundColor: 'white',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#46494C'
    },
    titleView: {
        padding: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        width: 300,
        flex: 1,
        borderColor: '#46494C',
        borderWidth: 2,
        borderRadius: 10,
        borderStyle: 'solid',
    },
    author: {
        alignSelf: 'center',
        fontSize: 18,
        padding: 10,
        fontWeight: 'bold',
        color: '#46494C'
    }
})



export default withNavigation(BlogPreviewCard)