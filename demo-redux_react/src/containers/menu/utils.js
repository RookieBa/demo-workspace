/**
 * Created by Administrator on 2017/9/25.
 */
export function findMenuByKey(key,menuInfo) {//根据id找到对应的菜单
    let selectedMenu;
    const selectedMenus = menuInfo.map((item) => {
        if(item.id == key){
            return item;
        }else if(item.isLeaf == 0 && item.subMenu){
            return findMenuByKey(key,item.subMenu);
        }
    });
    for(let i=0; i<selectedMenus.length; i++){
        if(selectedMenus[i]){
            selectedMenu = selectedMenus[i];
        }
    }
    return selectedMenu;
}

export function findMenuByPath(path,menuInfo) {//根据url找到对应的菜单
    let selectedMenu;
    const selectedMenus = menuInfo.map((item) => {
        if(item.link == path){
            return item;
        }else if(item.isLeaf == 0 && item.subMenu){
            return findMenuByPath(path,item.subMenu);
        }
    });

    for(let i=0; i<selectedMenus.length; i++){
        if(selectedMenus[i]){
            selectedMenu = selectedMenus[i];
        }
    }
    return selectedMenu;
}