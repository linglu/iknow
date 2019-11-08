

import {Dimensions, PixelRatio, Platform} from 'react-native';
import CommonUtil from "../utils/CommonUtil";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const isPlatformIOS = Platform.OS === 'ios' ? true : false;
const defaultMargin = 15;
const THEME = {
    bgColor: 'rgb(248,248,248)',

    sectionBgColor: 'rgb(255,255,255)',
    sectionSpace: 10,

    textColor: 'rgb(37,50,56)',
    secondTextColor: 'rgb(97,125,139)',
    fontSize: 14,
    titleFontSize: 16,
    btnFontSize: 16,
    highlightColor: 'rgb(58,149,255)',
    highlightBgTextColor: 'rgb(255,255,255)',
    inputFontSize: 16,
    hintTextColor: 'rgb(153,153,153)',
    placeholderColor: 'rgb(204,204,204)',

    // pageMargin: (Platform.OS === 'ios' ? 25 : 15),
    pageMargin: 15,

    item: {
        bgColor: 'rgb(255,255,255)',
        textColor: 'rgb(51,51,51)',
        fontSize: 16,
    },

    titleBar: {
        bgColor: 'rgb(0, 114, 247)',
        titleColor: 'rgb(255,255,255)',
        titleFontSize: 18,
        itemColor: 'rgb(255,255,255)',
        itemFontSize: 14,
        leftColor: 'rgb(255,255,255)',
        leftFontSize: 14,
        rightColor: 'rgb(255,255,255)',
        rightFontSize: 14,
        height: ((Platform.OS === 'ios' ? (CommonUtil.isIphoneX()? 64+24 : 64): 44))// + StatusBar.currentHeight)
    },

    line: {
        bgColor: 'rgb(255,255,255)',
        color: 'rgb(230,230,230)',
        size: 0.5,
        minSize: 1 / PixelRatio.get(),
    },



    refreshControl:{
        tintColor:"#2a62ff",
        title:"刷新中",
        titleColor:"#999999",
        colors:['#2a62ff'],
        progressBackgroundColor:"#ffffff"
    }


};

export {THEME, windowWidth, windowHeight, defaultMargin, isPlatformIOS};
