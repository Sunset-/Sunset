class MenuStore {

    constructor() {}

    URLS = {
        USE_ALL: '/service/system/menu/use/all',
        SAVE: '/service/system/menu',
        DELETE: '/service/system/menu/{id}',
        ORDER: '/service/system/menu/order/change'
    }

    getMenuNodes(force) {
        return this.getAllMenus(force).then(res => {
            res = res.map(node => {
                return {
                    parentId: node.parentId,
                    id: node.id,
                    name: node.name,
                    icon: `/assets/tree-icons/${node.module?'attribute_item.png':'category.png'}`,
                    isParent: !!node.isParent,
                    data: node
                };
            });
            res = [{
                parentId: null,
                id: '0',
                name: '菜单根节点',
                icon: '/assets/tree-icons/home.png',
                isParent: true,
                data: {}
            }].concat(res);
            return res;
        });
    }

    getAllMenus(force) {
        return Promise.resolve().then(() => {
            if (!force && this.cacheAll) {
                return this.cacheAll;
            } else {
                return $http({
                    url: this.URLS.USE_ALL
                }).then(res => {
                    return this.cacheAll = res;
                });
            }
        })
    }

    save(data) {
        return $http({
            url: this.URLS.SAVE,
            type: data.id ? 'PUT' : 'POST',
            data: data
        });
    }

    remove(id) {
        return $http({
            url: this.URLS.DELETE.replace(/\{id\}/, id),
            type: 'DELETE'
        });
    }

    orderMenu(changes) {
        return $http({
            url: this.URLS.ORDER,
            type: 'PUT',
            data: {
                changes
            }
        });
    }
}

export default new MenuStore();