import * as TYPES from '../action-type'
import _ from '../../assets/utils'
let initial = {
    info: null
}
export default function baseReducer(state = initial, action) {
    state = _.clone(state)
    switch (action.type) {
        case TYPES.BASE_INFO:
            state.info=action.info
            break;
        default:
    }
    return state
}