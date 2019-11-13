import React, {Component} from 'react';
import {
    View,
    Platform,
    StyleSheet,
    Image,
    Text
} from 'react-native';

import {THEME, windowWidth} from "../css/theme";
import {CommonUtil} from "../utils/CommonUtil"
import Orientation from 'react-native-orientation';
import Touch from '../components/Touch'

export default class BasePage extends Component {

    constructor(props) {
        super(props);
        this.titleBarConfigs = this.defaultTitleBarConfig();
    }

    defaultTitleBarConfig() {

        let dconfigs = {}
        config = this.getTitleBarConfigs();
        if (config) {
            dconfigs.title = config.title ? config.title : "请给我一个标题";
            dconfigs.right = config.right ? config.right : "";
            dconfigs.hasBack = config.hasBack;
            dconfigs.onCick = this.onTitleBarRightItemClick.bind(this)
        }

        return dconfigs;
    }

    onTitleBarRightItemClick(){
        console.log("touch onTitleBarRightItemClick ");
    }

    getTitleBarConfigs() {
        return undefined;
    }

    UNSAFE_componentWillMount() {
        // 竖屏
        Orientation.lockToPortrait();
    }

    render() {

        return (
            <View style={Style.pageContainer}>
                {this.renderTitleBar()}
                {this.renderContent()}
            </View>
        )
    }

    renderTitleBar() {
        return (
            <View style={[Style.container, {width:windowWidth}]}>
                {this.titleBarConfigs.hasBack ? 
                    <Touch onPress={() => this.props.navigation.goBack()}>
                        <Image style={{width: 16, height: 16}} source={require('../res/img/ic_back.png')} />
                    </Touch> : <View />}
                <Text style={Style.titleText}>{this.titleBarConfigs.title}</Text>
                <Touch onPress={() => this.titleBarConfigs.onCick()}>
                    <Text style={Style.titleText}>{this.titleBarConfigs.right}</Text>
                </Touch>
            </View>
        );
    }

    componentWillUnmount() {
        
    }
}


/** style *******************/
const Style = StyleSheet.create({
    pageContainer: {
        backgroundColor: THEME.bgColor,
        flex: 1,
        flexDirection: 'column'
    },

    imgContainer: {
        paddingHorizontal: 0
    },

    itemContainer: {
        paddingHorizontal: 0,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    },

    container: {
        height: THEME.titleBar.height,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.titleBar.bgColor,
        paddingHorizontal: THEME.pageMargin,
      	justifyContent: 'space-between',
		paddingTop: (Platform.OS === 'ios' ? (CommonUtil.isIphoneX() ? 20+24 : 20) : 0),
    },

    titleTextContainer: {
        paddingTop: (Platform.OS === 'ios' ? (CommonUtil.isIphoneX() ? 20+24 : 20) : 0),
        position: 'absolute',
        width: windowWidth,
        height: THEME.titleBar.height,
        paddingHorizontal: THEME.pageMargin,
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleText: {
        color: THEME.titleBar.titleColor,
        fontSize: THEME.titleBar.titleFontSize,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
});
