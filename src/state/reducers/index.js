import {combineReducers} from "redux"
import LoginReducer from "./LoginReducer";
import SidebarReducer from "./SidebarReducer"
import CarsDataReducer from './CarsDataReducer'
import FormDataReducer from './FormDataReducer'
import RegistrationReducer from "./RegistrationReducer";
import BrandReducer from "./BrandReducer"
import VariantReducer from './VariantReducer'
const reducers = combineReducers({
    login:LoginReducer,
    Sidebar:SidebarReducer,
    CarsData:CarsDataReducer,
    FormData:FormDataReducer,
    RegistrationData:RegistrationReducer,
    BrandData:BrandReducer,
    VariantData:VariantReducer
})

export default reducers;
