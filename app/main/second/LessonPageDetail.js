import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BasePage from '../../components/BasePage';
import HTMLView from 'react-native-htmlview';
import RNFSUtil from '../../utils/RNFSUtil'
import { WebView } from 'react-native-webview';

export default class LessonPageDetail extends BasePage {

    constructor(props) {
        super(props)

        this.state = {
            htmlContent : ""
        }
    }

    getTitleBarConfigs() {
        const {classItem} = this.props.navigation.state.params;
        return {
            title: classItem.lesson_title,
            hasBack : true
        }
    }

    componentDidMount() {

        console.log('linky ==  ' + JSON.stringify(this.props.navigation));

        // const {classItem} = this.props.navigation.state.params;
        // RNFSUtil.downloadFile(classItem.lesson_text_url, classItem.class_id, classItem.lesson_name, 
        //     (progress) => {
        //         // this.setState({
        //         //     progress: progress
        //         // })
        //     }, 
        //     (result, filepath)=>{
        //         if (result == "success") {
        //             // 开始加载显示 
        //             // 1、从文件中获取 content
        //             console.log('linky ==  ' + filepath);
        //             RNFSUtil.readFile(filepath).then((htmlContent) => {
                        
        //                 this.setState({
        //                     htmlContent: htmlContent
        //                 })
        //             })
        //         }
        // });
    }

    renderContent() {
        // const htmlContent = `<p><a href="http://jsdf.co">&hearts; nice job!</a></p>`;
        const {classItem} = this.props.navigation.state.params;
        return (
            <WebView source={{ uri: classItem.lesson_text_url }} />
            // <WebView source={{ html: this.state.htmlContent }} />
        );

        // return (<View style={{flex: 1, justifyContent: 'center'}}>
        //     <Text style={{color: "black"}}>{this.state.progress}</Text>
        // </View>)
    }
}

const styles = StyleSheet.create({
    a: {
      fontWeight: '300',
      color: '#FF3366', // make links coloured pink
    },
  });