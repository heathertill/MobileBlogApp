import * as React from 'react';
import { StyleSheet, View, Text, Alert, Picker, ScrollView } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation';
import { json, getUser } from '../utils/api';

interface Props extends NavigationScreenProps { }
interface State {
    title: string;
    content: string;
    userid: number;
    tags: { id: number, name: string, _created: Date }[];
    selectedTag: number;
    blogid: number;
    showTag: boolean
}

export default class NewBlog extends React.Component<Props, State> {

    static navigationOptions: NavigationScreenOptions = {
        title: 'New Blog'
    }

    constructor(props: Props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            userid: 0,
            tags: [],
            selectedTag: 0,
            blogid: 0,
            showTag: false
        }
    }
    // the saving sequence prevents user from submitting multiple times
    private saving: boolean = false;

    showTagToggle() {
        this.setState({ showTag: !this.state.showTag })
    }

    renderPicker() {
        if (this.state.showTag) {
            return (
                <Picker
                    style={{}}
                    selectedValue={this.state.selectedTag}
                    onValueChange={(itemValue) => this.setState({ selectedTag: itemValue })}
                >
                    {this.state.tags.map(tag => (
                        <Picker.Item key={tag.id} label={`${tag.name}`} value={tag.id} />
                    ))}
                </Picker>
            )
        }
    }

    async componentDidMount() {
        let tags = await json('https://limitless-bastion-43539.herokuapp.com/api/tags');
        this.setState({ tags });
    };

    async createBlogTags() {
        let newBlogTag = { blogid: this.state.blogid, tagid: this.state.selectedTag }
        try {
            await json('https://limitless-bastion-43539.herokuapp.com/api/tags', 'POST', newBlogTag);
        } catch (err) {
            console.log(err)
        }
    };

    async handleSubmit() {
        if (this.saving) return;
        let newBlog = {
            title: this.state.title,
            content: this.state.content,
            userid: null,
        };
        try {
            this.saving = true;
            let { userid } = await getUser();
            newBlog.userid = userid
            if (newBlog) {
                let result = await json('https://limitless-bastion-43539.herokuapp.com/api/blogs', 'POST', newBlog);
                this.setState({ blogid: result[0] })
                this.createBlogTags();
                this.setState({ title: '', content: '' })
                if (result) {
                    this.props.navigation.navigate('AllBlogs')
                }
            }
        } catch (e) {
            console.log(e);
            Alert.alert('Problem submitting new post.')
        } finally {
            this.saving = false;
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                <Text style={styles.text} >Create New Blog Entry</Text>
                <Input
                    label='Title'
                    containerStyle={styles.input}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder='   Title'
                    value={this.state.title}
                    leftIcon={{ type: 'font-awesome', name: 'flag', color: '#4C5C68' }}
                    onChangeText={(text) => this.setState({ title: text })}
                />
                <Input
                    label='Content'
                    containerStyle={styles.contentInput}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder='   Blog Content ...'
                    multiline
                    value={this.state.content}
                    leftIcon={{ type: 'font-awesome', name: 'pencil', color: '#4C5C68' }}
                    onChangeText={(text) => this.setState({ content: text })}
                />
                <View
                    style={styles.input} >
                    <Text
                        onPress={() => this.showTagToggle()}
                        style={styles.customLabel}>Select Blog Tag</Text>
                    {this.renderPicker()}
                    {/* <Picker
                        style={{ }}
                        selectedValue={this.state.selectedTag}
                        onValueChange={(itemValue) => this.setState({selectedTag: itemValue})}
                    >
                        {this.state.tags.map(tag => (
                            <Picker.Item key={tag.id} label={`${tag.name}`} value={tag.id} />
                        ))}
                    </Picker> */}
                </View>
                <Button
                    raised
                    icon={<Icon name='code' color='#ffffff' />}
                    buttonStyle={{ backgroundColor: '#1985A1', borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                    title='Post New Blog'
                    onPress={() => this.handleSubmit()}
                />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DCDCDD',
        padding: 5,
        marginVertical: 10
    },
    input: {
        marginVertical: 5,
        padding: 5,
        backgroundColor: 'white',
        borderColor: '#46494C',
        borderWidth: 2,
        borderRadius: 10,
        borderStyle: 'solid',
    },
    contentInput: {
        marginVertical: 5,
        padding: 5,
        backgroundColor: 'white',
        borderColor: '#46494C',
        borderWidth: 2,
        borderRadius: 10,
        borderStyle: 'solid',
        minHeight: 175
    },
    text: {
        fontSize: 24,
        textAlign: 'center',
        marginVertical: 10
    },
    customLabel: {
        marginVertical: 0,
        marginHorizontal: 2,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#86939E'
    }
});