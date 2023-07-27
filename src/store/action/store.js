import * as TYPES from '../action-type'
import api from '../../api'
let initial = {
    list: null
}
const storeAction = {
    // 异步获取收藏列表，同步到redux
    async queryStoreListAsync() {
        let list = null
        try {
            let { code, data } = await api.storeList()
            if (+code === 0) {
                list = data
            }
        } catch (error) {

        }
        return {
            type: TYPES.STORE_LIST,
            list
        }
    },
    // 清空收藏列表
    clearStoreList() {
        return {
            type: TYPES.STORE_LIST,
            list: null
        }
    },
    // 移除某一项
    removeStoreListById(id) {
        return {
            type: TYPES.STORE_REMOVE,
            id
        }
    }
}
export default storeAction;