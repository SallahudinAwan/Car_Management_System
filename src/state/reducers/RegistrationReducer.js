const reducer=(state={RegisterData:[]},action)=>{
    if(action.type==='RegisterData'){
      return {...state,RegisterData:action.payload};
    }  
    else{
       return state;
    }
}
export default reducer;