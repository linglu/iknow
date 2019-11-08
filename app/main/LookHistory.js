import React, {Component} from 'react';
import { Text, View, style, FlatList, Image} from "react-native";
import Touch from "../components/Touch";    
import ListBasePage from '../components/ListBasePage';
import {CommonStyle}  from "../css/commonStyle"
import {PermissionsAndroid} from 'react-native';

export default class LookHistory extends ListBasePage {

    constructor(props) {
        super(props)

        this.state = {
            downloadedClasses: []
        }
    }

    getTitleBarConfigs() {
        return {
            title: "已下载课程",
            hasBack: false
        };
    }

    componentDidMount() {
        this.requestCameraPermission();
    }

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Granted');
            } else {
                console.log('Dennied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    renderContent() {
        return(
            <View style={{flex: 1}}>
                 <FlatList
                    style={{flex: 1, backgroundColor: "#ffffff"}}
                    data={this.state.downloadedClasses}
                    ListHeaderComponent={() => this.state.downloadedClasses.length == 0 ? <View /> : this.sepa()}
                    ListFooterComponent={() => this.state.downloadedClasses.length == 0 ? <View /> : this.sepa()}
                    ItemSeparatorComponent={() => this.sepa()}
                    keyExtractor={(item, index) => `${index}`}
                    ListEmptyComponent={() => this.emptyView()}
                    renderItem={({ item, index }) => (
                        <Item  
                            lesson={item}
                        />
                    )}
                /> 
            </View>
        )
    }

    emptyView() {
        return (<View style={{flex: 1, alignItems: 'center', marginTop: 36, justifyContent: "center"}}>
                <Image source={require('../res/img/ic_no_meter_data.png')} />
                <View style={{flex: 1, flexDirection: "column", alignItems: "center"}}>
                    <Text style={{fontSize: 16, color: "#617D8B", marginTop: 22}}>暂无课程</Text>
                    <Touch style={[CommonStyle.button, {marginTop: 10}]} onPress={() => this.gotoClassPage()}>
                        <Text style={CommonStyle.text}>去下载</Text>
                    </Touch>
                </View>
            </View>)
    }

    gotoClassPage() {
        this.props.navigation.navigate("ClassPage", {
            classType: 5
        })
    }
}

class Item extends Component {

    render() {

        return (
            <Touch style={{flex: 1, padding: 15, flexDirection: "column"}} onPress={this.props.onPress}>
                <Text numberOfLines={1} style={{fontSize: 17, color: "#253238"}}>{this.props.item.class_name}</Text>
                <Text style={{marginTop: 10, fontSize: 15, color: "617D8B"}}>主理人：{this.props.item.class_author}</Text>
            </Touch>
        );
    }
}
