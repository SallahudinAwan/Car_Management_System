const reducer=(state={name:0},action)=>{
    if(action.type==='component'){
      return {name:action.payload};
    }  
    else{
       return state;
    }
   }
   export default reducer;