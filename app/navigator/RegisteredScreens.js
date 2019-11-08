/** ***************************************************
 所有使用StackNavigator进行管理的视图，都要先在这里注册
 ***************************************************** */
import MainApp from '../main/MainApp';
import LookHistory from '../main/LookHistory';
import Mine from '../main/Mine';
import ClassPage from '../main/second/ClassPage';

const RegisteredScreens = {
    MainApp: MainApp,
    LookHistory: LookHistory,
    Mine: Mine,
    ClassPage: ClassPage,
    LessonListPage: LessonListPage
};

module.exports = RegisteredScreens;
