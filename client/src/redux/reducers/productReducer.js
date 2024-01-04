import { PRODUCT } from '../actionTypes'

const initialState = {
	list: []
}

const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case PRODUCT.SET:
			return {...state, list: action.payload}
		default:
			return state;
	}
};

export default productReducer;
