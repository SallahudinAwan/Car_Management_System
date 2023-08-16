const reducer=(state={Brand:[]},action)=>{
    if(action.type==='BrandData'){
      return {...state,Brand:action.payload};
    }  
    else{
       return state;
    }
}
export default reducer;