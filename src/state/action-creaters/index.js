export const ChangeUsername =(email)=>{
    return (dispatch)=>{
        dispatch({
            type:"username",
            payload:email
        })
    }
}
export const ChangePassword =(Password)=>{
    return (dispatch)=>{
        dispatch({
            type:"password",
            payload:Password
        })
    }
}

export const LoginSuccess =(Status)=>{
    return (dispatch)=>{
        dispatch({
            type:"Login",
            payload:Status
        })
    }
}
export const ChangeComponent =(name)=>{
    return (dispatch)=>{
        dispatch({
            type:"component",
            payload:name
        })
    }
}


export const LoadCarsData =(Data)=>{
    return (dispatch)=>{
        dispatch({
            type:"carsData",
            payload:Data
        })
    }
}


export const LoadRegisterData =(Data)=>{
    return (dispatch)=>{
        dispatch({
            type:"RegisterData",
            payload:Data
        })
    }
}


export const LoadBrandsData =(Data)=>{
    return (dispatch)=>{
        dispatch({
            type:"BrandData",
            payload:JSON.parse(JSON.stringify(Data))
        })
    }
}


export const LoadVariantsData =(Data)=>{
    return (dispatch)=>{
        dispatch({
            type:"VariantData",
            payload:Data
        })
    }
}



export const ChangeFirstname =(firstname)=>{
    return (dispatch)=>{
        dispatch({
            type:"firstname",
            payload:firstname
        })
    }
}



export const ChangeLastname =(lastname)=>{
    return (dispatch)=>{
        dispatch({
            type:"lastname",
            payload:lastname
        })
    }
}

export const ChangeRID =(ID)=>{
    return (dispatch)=>{
        dispatch({
            type:"RID",
            payload:ID
        })
    }
}

export const ChangeEmail =(email)=>{
    return (dispatch)=>{
        dispatch({
            type:"email",
            payload:email
        })
    }
}

export const ChangePhone =(phone)=>{
    return (dispatch)=>{
        dispatch({
            type:"phone",
            payload:phone
        })
    }
}
export const ChangeCarName =(CarName)=>{
    return (dispatch)=>{
        dispatch({
            type:"CarName",
            payload:CarName
        })
    }
}
