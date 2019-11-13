import React, {Component} from 'react';
import { Text, View} from "react-native";
import Touch from "../components/Touch";  

export default class Mine extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={{flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>

                <Touch style={Style.button}>
                    <Text style={Style.text}>我的</Text>
                </Touch>


            </View>
        )
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