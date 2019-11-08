import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LookHistory from '../main/LookHistory';
import Mine from '../main/Mine';
import ClassPage from '../main/second/ClassPage';
import MainApp from '../main/MainApp';

const Navigator = createStackNavigator({
        MainApp: MainApp,
        LookHistory: LookHistory,
        Mine: Mine,
        ClassPage: ClassPage,
        LessonListPage: ListClassPage
    }, 

    {
        initialRouteName: 'ClassPage', // 默认显示界面
        headerMode: "none"
    }
);

const AppContainer = createAppContainer(Navigator)

export default AppContainer