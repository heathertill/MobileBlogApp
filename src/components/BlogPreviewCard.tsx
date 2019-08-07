import * as React from 'react';
import { Text, Card, Button, Icon } from 'react-native-elements';
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
        const { id, title, userid, firstname } = this.props.blog;
        return (
            <Card
                title={title}
                image={{ uri: 'https://limitless-bastion-43539.herokuapp.com/images/clipboard.jpg' }}>
                <Text style={{ marginBottom: 10 }}>{`Written by:\n${firstname}`}</Text>
                <Button
                    icon={<Icon name='code' color='#ffffff' />}
                    buttonStyle={{ backgroundColor: '#1985A1', borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                    title='Read this Blog'
                    onPress={() => this.props.navigation.navigate('SingleBlog', {id})} />
            </Card>
        );
    }
}

export default withNavigation(BlogPreviewCard)