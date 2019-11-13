import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity, ToastAndroid } from "react-native";
import BasePage from '../components/BasePage';
import { FlatList } from 'react-native-gesture-handler';
import AllClassDC from './DC/AllClassDC';
import Touch from "../components/Touch"
import LocalStorage from '../utils/LocalStorage';


export default class ClassPage extends BasePage {

    constructor(props) {
        super(props)

        this.vm = new AllClassDC(props)
        this.isrefreshing = false;
        this.state = {
            allLectures: []
        }
    }

    getTitleBarConfigs() {
        return {
            title: "更新中的课",
            hasBack: false,
            right: "刷新"
        }
    }

    onTitleBarRightItemClick() {
        ToastAndroid.show("正在刷新...", ToastAndroid.SHORT);
        this.isrefreshing = true;
        const {classType} = this.props.navigation.state.params;
        LocalStorage.delete("class_" + classType);
        this.getClassList(classType);
    } 

    componentDidMount() {
        
        const {classType} = this.props.navigation.state.params;

        LocalStorage.get("class_" + classType).then((classList) => {

            if (classList != null) {
                this.setState({
                    allLectures: classList
                })
            } else {
                this.getClassList(classType);
            }

        }, (error) => {
            this.getClassList(classType);
        })
    }

    getClassList(classType) {

        // 请求服务器，获取课程列表
        this.vm.getAllClassByType(classType, (classList) => {

            if (this.isrefreshing) {
                ToastAndroid.show("刷新成功", ToastAndroid.SHORT);
            }

            // 保存到本地
            LocalStorage.save("class_" + classType, classList);

            // 刷新界面
            this.setState({
                allLectures: classList
            })
        }, (exp) => {
            ToastAndroid.show("刷新失败", ToastAndroid.SHORT);
            console.log("exp: " + exp);
        })   
    }
    
    sepa() {
        return(<View style={{height: 10, backgroundColor: "#F8F8F8"}} />)
    }

    renderContent() {
        return(
            <View style={{flex: 1}}>
                 <FlatList
                    style={{flex: 1, backgroundColor: "#ffffff"}}
                    data={this.state.allLectures}
                    ListHeaderComponent={() => this.state.allLectures.length == 0 ? <View /> : this.sepa()}
                    ListFooterComponent={() => this.state.allLectures.length == 0 ? <View /> : this.sepa()}
                    ItemSeparatorComponent={() => this.sepa()}
                    keyExtractor={(item, index) => `${index}`}
                    ListEmptyComponent={() => this.emptyView()}
                    renderItem={({ item, index }) => (
                        <Item 
                            item={item}
                            onPress={() => this.gotoClasListPage(item)}
                        />
                    )}
                /> 
            </View>
        )
    }

    gotoClasListPage(item) {
        this.props.navigation.navigate("LessonListPage", {classItem: item})
    }

    emptyView() {
        return (<View style={{flex: 1, alignItems: 'center', marginTop: 36, justifyContent: "center"}}>
                <Image source={require('../res/img/ic_no_meter_data.png')} />
                <Text style={{fontSize: 16, color: "#FF6B00", marginTop: 22}}>暂无课程</Text>
            </View>)
    }
}


class Item extends Component {

    render() {

        return (
            <Touch style={{flex: 1, padding: 15, flexDirection: "column"}} onPress={this.props.onPress}>
                <Text numberOfLines={1} style={{fontSize: 17, color: "#253238"}}>{this.props.item.class_name}</Text>
                <Text style={{marginTop: 10, fontSize: 15, color: "#FF6B00"}}>主理人：{this.props.item.class_author}</Text>
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

