import * as React from 'react';
import { Text, Card, Button, Icon } from 'react-native-elements';
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
            <View style={{ marginBottom:10 }} >
                <ImageBackground
                    source={{ uri: 'https://limitless-bastion-43539.herokuapp.com/images/greywood.jpg' }}
                    style={{ flex: 1, justifyContent: 'center', height: 300 }}>
                    <View style={{ flex: 1, padding: 20 }} >
                        <Text style={styles.title} >{title}</Text>
                        <Text style={{  alignSelf: 'center', fontSize: 18, padding: 5, fontWeight: 'bold' }} >{`Written by ${firstname}`}</Text>
                        <Button
                            // style={{ alignSelf: 'flex-end' }}
                            icon={<Icon name='code' color='#ffffff' />}
                            buttonStyle={{ backgroundColor: '#1985A1', borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,  alignItems: 'stretch' }}
                            title='Read this Blog'
                            onPress={() => this.props.navigation.navigate('SingleBlog', {id})}
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
        height: 50,
        textAlign: 'center',
        width: 300, flex: 1,
        alignSelf: 'center',
        paddingTop: 75,
        fontSize: 28,
        borderColor: '#46494C',
        borderWidth: 2,
        borderRadius: 10,
        borderStyle: 'solid',
    }
})



export default withNavigation(BlogPreviewCard)