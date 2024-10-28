function Validation(values){
    let error = {}

    if (values.username === ""){
       error.username = "username should not be empty"
    }
    else{
       error.username=""
    }
    
    if (values.password === ""){
       error.password = "password should not be empty"
    }
    else{
       error.password=""
    }
    return error;
}


export default Validation;