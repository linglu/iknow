import React, {Component} from 'react';
import {
    View,
    Platform,
    BackHandler,
    StyleSheet,
    Image,
    Text
} from 'react-native';

import BasePage from "./BasePage"

export default class ListBasePage extends BasePage {

    constructor(props) {
        super(props)
    }

    sepa() {
        return(<View style={{height: 10, backgroundColor: "#F8F8F8"}} />)
    }

    emptyView() {
        return (<View style={{flex: 1, alignItems: 'center', marginTop: 36, justifyContent: "center"}}>
                <Image source={require('../res/img/ic_no_meter_data.png')} />
                <Text style={{fontSize: 16, color: "#FF6B00", marginTop: 22}}>暂无课程</Text>
            </View>)
    }
}