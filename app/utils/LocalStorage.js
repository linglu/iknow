import {AsyncStorage} from 'react-native';

export default class LocalStorage {

    static get = async (key) => {

        try {
            values = await AsyncStorage.getItem(key.toString());
            return JSON.parse(values)
        } catch (error) {
            return false;
        }
    }

    static save = async (key, value) => {

        try {
            await AsyncStorage.setItem(key.toString(), JSON.stringify(value));
        } catch (error) {}
    }

    static update = async (key, value) => {
    }

    static delete = async (key, successCallback, failCallback) => {
        try {
            await AsyncStorage.removeItem(key);
            if (successCallback) {
                successCallback(true)
            }
        } catch (error) {
            if (failCallback) {
                failCallback(error)
            }
        }
    }
}