//import { useDispatch } from "react-redux";
import { isTokenValid } from "./slices/AuthSlice";

//const dispatch = useDispatch();

export const errorHandler = (error, dispatch) => {
 
  const statusCode = error.response.data.error.status;
  if (statusCode == 412) {
    return (error.response.data.error['validationErrors'][0].msg)
  } else {
    if(error.response.data?.content?.is_valid_token===false){
      dispatch(isTokenValid(false));
      return null;
    }else{
      return error.response.data.error.msg;
    }
  }
}