import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from '../middlewares/promise-middleware';
import DevTools from '../tools/ReduxDevTools';

import homeReducer from '../containers/home/reducers/home-reducer';
import menuReducer from '../containers/menu/reducers/menu-reducer';

const reducer = combineReducers({
    homeReducer,
    menuReducer
})

const enhancer = compose(
    //你要使用的中间件，放在前面
    applyMiddleware(
        thunkMiddleware,
        promiseMiddleware({promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR']})
    ),
    //必须的！启用带有monitors（监视显示）的DevTools
    //生产代码中此部分需屏蔽
    DevTools.instrument()
);

export default function configureStore(initialState) {
    // return createStoreWithMiddleware(reducers, initialState, window.devToolsExtension ? window.devToolsExtension() :f => f);
    return createStore(
        reducer,
        initialState,
        enhancer
        //applyMiddleware(sagaMiddleware(...sagas),router)
    );
}