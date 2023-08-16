const reducer=(state={RID:"",firstname:"",lastname:"",email:"",phone:"",CarName:""},action)=>{
    if(action.type==='firstname'){
      return {...state,firstname:action.payload};
    }  
    else if(action.type==='lastname'){
     return {...state,lastname:action.payload};
   }  
    else if(action.type==='email'){
     return {...state,email:action.payload};
   }  
   else if(action.type==='phone'){
    return {...state,phone:action.payload};
  } 
  else if(action.type==='CarName'){
   return {...state,CarName:action.payload};
 }
 else if(action.type==='RID'){
  return {...state,RID:action.payload};
} 
    else{
       return state;
    }
   }
   export default reducer;