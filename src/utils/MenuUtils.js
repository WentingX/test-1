import lazyLoading from './lazyLoading'
export default (routers, data) => {
    generaMenu(routers, data)
}

function generaMenu(routers, data) {
    if (data!=null) {
        data.forEach((item) => {
            let menu = Object.assign({}, item)
            menu.component = lazyLoading(menu.component)
            //        if (!item.leaf) {
            if (menu.children != undefined) {
                menu.children = []
                generaMenu(menu.children, item.children)
            }
            //        }
            routers.push(menu)
        })
    }

}
