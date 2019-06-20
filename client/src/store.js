import  {createStore,applyMiddleware} from 'redux'
import { composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const Isate={}
const middlware=[thunk]

const store=createStore(
    rootReducer,
    Isate,
    composeWithDevTools(applyMiddleware(...middlware)))

export default store