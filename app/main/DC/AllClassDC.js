import {ClassUrl} from "../../network/Config";
import {network} from "../../network/Network";


/**
 * 抄表有关数据中心 
 */ 
export default class AllClassDC {

    constructor(props) {

    }

    /**
     * 获取特定类型的所有课程 
     * @param 课程类型 type 
     */
    getAllClassByType = async (type, successCallback, failedCallback) => {

        let url = ClassUrl.get_all_class + "&class_type=" + type;
        console.log('linky ==  url: ' + url);
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                successCallback(result.data)
            })
            .catch((error) => {
                console.error(error);
                failedCallback(error)
            });
    }

     /**
     * 获取特定类型的所有课程 
     * @param 课程类型 type 
     */
    getAllLessonByClassId = async (classId, successCallback, failedCallback) => {

        let url = ClassUrl.get_all_lesson + "&class_id=" + classId;
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                successCallback(result.data)
            })
            .catch((error) => {
                console.error(error);
                failedCallback(error)
            });
    }
}