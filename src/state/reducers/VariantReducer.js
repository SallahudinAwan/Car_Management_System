const reducer=(state={Variant:[]},action)=>{
    if(action.type==='VariantData'){
      return {...state,Variant:action.payload};
    }  
    else{
       return state;
    }
}
export default reducer;