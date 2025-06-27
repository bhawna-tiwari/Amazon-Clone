import { combineReducers } from "redux";
import getProductsreducers from "./Productsreducer"; 



const rootreducers = combineReducers({
    getproductsdata:getProductsreducers
});

export default rootreducers; // ✅ Ensure it's exported as default
