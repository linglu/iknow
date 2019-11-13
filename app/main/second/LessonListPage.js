import React, {Component} from 'react';
import { Text, View, FlatList, ToastAndroid } from "react-native";
import Touch from "../../components/Touch"
import ListBasePage from '../../components/ListBasePage';
import AllClassDC from '../DC/AllClassDC';
import LocalStorage from '../../utils/LocalStorage'

export default class LessonListPage extends ListBasePage {

    constructor(props) {
        super(props)

        const {classItem} = this.props.navigation.state.params;
        this.classItem = Object.assign({}, classItem);

        this.vm = new AllClassDC(props)
        this.isrefreshing = false;
        this.state = {
            allLessons: []
        }
    }

    getTitleBarConfigs() {
        const {classItem} = this.props.navigation.state.params;
        return {
            title: classItem.class_name,
            hasBack : true,
            right: "刷新",
        }
    }

    onTitleBarRightItemClick() {
        ToastAndroid.show("正在刷新...", ToastAndroid.SHORT);
        this.isrefreshing = true;
        LocalStorage.delete("lesson_" + this.classItem.class_id);
        this.getLessonList(this.classItem.class_id);
    }

    componentDidMount() {

        LocalStorage.get("lesson_" + this.classItem.class_id).then((lessonList) => {

            if (lessonList != null) {
                this.setState({
                    allLessons: lessonList
                })
            } else {
                this.getLessonList(this.classItem.class_id);
            }

        }, (error) => {
            this.getLessonList(this.classItem.class_id);
        })
        
    }

    getLessonList(classId) {

        // 请求服务器，获取课程列表
        this.vm.getAllLessonByClassId(classId, (lessons) => {

            if (this.isrefreshing) {
                ToastAndroid.show("刷新成功", ToastAndroid.SHORT);
            }

            // 保存到本地
            LocalStorage.save("lesson_" + this.classItem.class_id, lessons);

            this.setState({
                allLessons: lessons
            })
        }, (exp) => {
            ToastAndroid.show("刷新失败", ToastAndroid.SHORT);
            console.log("exp: " + exp);
        })
    }

    renderContent() {
        return(
            <View style={{flex: 1}}>
                 <FlatList
                    style={{flex: 1, backgroundColor: "#ffffff"}}
                    data={this.state.allLessons}
                    istHeaderComponent={() => this.state.allLessons.length == 0 ? <View /> : this.sepa()}
                    ListFooterComponent={() => this.state.allLessons.length == 0 ? <View /> : this.sepa()}
                    ItemSeparatorComponent={() => this.sepa()}
                    keyExtractor={(item, index) => `${index}`}
                    ListEmptyComponent={() => this.emptyView()}
                    renderItem={({ item, index }) => (
                        <Item  
                            lesson={item}
                            onPress={() => this.gotoPageDetail(item)}
                        />
                    )}
                /> 
            </View>
        )
    }

    gotoPageDetail(item) {
        this.props.navigation.navigate("LessonPageDetail", {classItem: item})
    }
}

class Item extends Component {

    render() {

        return (
            <Touch style={{flex: 1, padding: 18, flexDirection: "column"}} onPress={this.props.onPress}>
                <Text style={{fontSize: 16, color: "#253238"}}>{this.props.lesson.lesson_name}</Text>
                {/* <Text style={{marginTop: 10, fontSize: 15, color: "FF6B00"}}>主理人：{this.props.lesson.class_author}</Text> */}
            </Touch>
        );
    }
}



const Style = {
    text: {
        color:'white'
      },
      button: {
          width: 120,
          height: 45,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:'#ff6b00'
      },
}