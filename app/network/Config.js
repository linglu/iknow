
let host = "http://192.168.4.106";


const ClassUrl = {
    // 获取所有课程
    get_all_class : `${host}/dedao/dedao.php?action=query_class`,
    get_all_lesson : `${host}/dedao/dedao.php?action=query_lesson`

};

export {ClassUrl}