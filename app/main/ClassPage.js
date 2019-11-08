import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity } from "react-native";
import BasePage from '../components/BasePage';
import { FlatList } from 'react-native-gesture-handler';
import AllClassDC from './DC/AllClassDC';
import Touch from "../components/Touch"
import LocalStorage from '../utils/LocalStorage';


export default class ClassPage extends BasePage {

    constructor(props) {
        super(props)

        this.vm = new AllClassDC(props)
        this.state = {
            allLectures: []
        }
    }

    getTitleBarConfigs() {
        return {
            title: "更新中的课",
            hasBack: false
        }
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

            // 保存到本地
            LocalStorage.save(classType, classList);

            // 刷新界面
            this.setState({
                allLectures: classList
            })
        }, (exp) => {
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
                <Text style={{fontSize: 16, color: "#617d8b", marginTop: 22}}>暂无课程</Text>
            </View>)
    }
}


class Item extends Component {

    render() {

        return (
            <Touch style={{flex: 1, padding: 15, flexDirection: "column"}} onPress={this.props.onPress}>
                <Text numberOfLines={1} style={{fontSize: 17, color: "#253238"}}>{this.props.item.class_name}</Text>
                <Text style={{marginTop: 10, fontSize: 15, color: "#617d8b"}}>主理人：{this.props.item.class_author}</Text>
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
        backgroundColor:'#4398ff'
    },
}

