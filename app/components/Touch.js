import React, { Component } from 'react';
import {
    TouchableOpacity
} from 'react-native';

export default class Touch extends Component {

    // 构造
    constructor(props) {

        super(props);
        // 初始状态
        this.state = {
            isDisable: false// 是否被禁用
        };

    }

    ToPress = async () => {

        const { onPress } = this.props;
        onPress && onPress();
        await this.setState({ isDisable: true });// 防重复点击
        this.timer = setTimeout(async () => {
            await this.setState({ isDisable: false });// 1.5秒后可点击
        }, 1000);
    }

    render() {

        const { style } = this.props;
        return (
            <TouchableOpacity
                disabled={this.state.isDisable}
                activeOpacity={this.props.activeOpacity ? this.props.activeOpacity : 0.5}
                style={style || {}}
                onPress={this.ToPress}>
                {this.props.children}
            </TouchableOpacity>
        );
    }

}
