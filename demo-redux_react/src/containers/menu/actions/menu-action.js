/**
 * Created by Administrator on 2017/9/24.
 */
import api from '../../../api';

export function getMenu() {
    //const path = '/overall/menu';
    const path = 'menu';
    return {
        type: 'GET_MENU',
        payload: {
            promise: api.post(path, {
                params:{

                }
            })
        }
    }
}

export function setCurrentMenu(currentMenu){
    return {
        type: 'SET_CURRENT_MENU',
        data:currentMenu
    }
}