/**
 * Created by Administrator on 2017/9/24.
 */
const initialState = {

};

export default function menuReducer(state = initialState, action = {}) {
    switch (action.type) {
        //获取菜单
        case 'GET_MENU_PENDING':
            return {...state,menuInfo:{}};
        case 'GET_MENU_SUCCESS':
            return {...state,menuInfo:{result:action.payload}};
        case 'GET_MENU_ERROR':
            return {...state,menuInfo:{}};
        //设置当前菜单
        case 'SET_CURRENT_MENU':
            return {...state,currentMenu:action.data};

        default:
            return state
    }
}