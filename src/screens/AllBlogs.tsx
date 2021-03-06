import * as React from 'react';
import { StyleSheet, View, ScrollView, Alert, Text } from 'react-native';
import { NavigationScreenOptions, NavigationScreenProps, NavigationEvents } from 'react-navigation'
import { json } from '../utils/api';
import BlogPreviewCard from '../components/BlogPreviewCard';

import BlogHeader from '../components/BlogHeader'

export interface AllBlogsProps extends NavigationScreenProps { }
export interface AllBlogsState {
    blogs: {
        id: number,
        firstname: string,
        title: string,
        content: string,
        userid: number,
        _created: Date
    }[];
}

export default class AllBlogs extends React.Component<AllBlogsProps, AllBlogsState> {

    static navigationOptions: NavigationScreenOptions = {
        headerTitle: "Blogs"
    }

    constructor(props: AllBlogsProps) {
        super(props);
        this.state = {
            blogs: []
        };
        this._getBlogs();
    }

    async _getBlogs() {
        try {
            let blogs = await json('https://limitless-bastion-43539.herokuapp.com/api/blogs');
            this.setState({ blogs })
        } catch (e) {
            console.log(e);
            Alert.alert("You done messed up, Aaron!")
        }
    }

    renderBlogs() {
        return this.state.blogs.map(blog => {
            return <BlogPreviewCard key={blog.id} blog={blog} />
        })
    }
    // NavigationEvents onDidFocus - each time this element is in focus it
    // it will run specified function.  i.e. this._getBlogs() 
    // works like componentDidMount() 

    render() {
        return (
            <View style={styles.container}>
                <BlogHeader />
                <NavigationEvents onDidFocus={() => this._getBlogs()} />
                <ScrollView>
                    {this.renderBlogs()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#46494C'
    }
});
