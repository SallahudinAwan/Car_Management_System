const reducer=(state={username:"",password:"",login:false},action)=>{
 if(action.type==='username'){
   return {...state,username:action.payload};
 }  
 else if(action.type==='login'){
  return {...state,login:action.payload};
}  
 else if(action.type==='password'){
  return {...state,password:action.payload};
} 
 else{
    return state;
 }
}
export default reducer;