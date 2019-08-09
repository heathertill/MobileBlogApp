import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface BlogHeaderProps { }

const BlogHeader: React.SFC<BlogHeaderProps> = () => {
    return (
        <View style={styles.container}>
            <View style={styles.textView}>
                <Text style={styles.text}>My Blog</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: 'white',
        margin: 5,
        borderColor: '#C5C3C6',
        borderWidth: 6,
        borderStyle: 'solid'
    },
    text: {
        fontFamily: 'Pacifico',
        fontSize: 40,
        textAlign: 'center',
        color: 'white',
    },
    textView: {
        flex: 1,
        backgroundColor: '#1985A1',
        justifyContent: 'center',
    }
})

export default BlogHeader;