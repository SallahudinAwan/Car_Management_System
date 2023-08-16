const reducer=(state={CarsData:[]},action)=>{
    if(action.type==='carsData'){
      return {...state,CarsData:action.payload};
    }  
    else{
       return state;
    }
}
export default reducer;