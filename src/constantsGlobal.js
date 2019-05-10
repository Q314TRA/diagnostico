export const API_SERVER = process.env.HOST_API ? process.env.HOST_API : "http://localhost:3000";

// API
export const GET_ALL_QUESTIOS_API = API_SERVER + "/diagnosis/";
export const GET_VALIDATE_COMPANY_API = API_SERVER + "/diagnosis/validateCompany";
export const PUT_ANSWER_API = API_SERVER + "/diagnosis/";
export const DELETE_ANSWER_API = API_SERVER + "/diagnosis/removeAnswer";
export const PUT_DATA_REPORT = API_SERVER + "/diagnosis/generateReport";
export const GET_BASE64_SVG = API_SERVER + "/diagnosis/getBase64SVG";
// export const GET_ALL_QUESTIOS_API = "https://biotica-api.herokuapp.com/diagnosis/" ;
// export const GET_VALIDATE_COMPANY_API = "https://biotica-api.herokuapp.com/diagnosis/validateCompany" ;
// export const PUT_ANSWER_API = "https://biotica-api.herokuapp.com/diagnosis/" ;
// export const DELETE_ANSWER_API = "https://biotica-api.herokuapp.com/diagnosis/removeAnswer" ;

//SAGA -> REDUCERS
export const GET_ALL_QUESTIOS_SAGA = "GET_ALL_QUESTIOS_SAGA";
export const GET_VALIDATE_COMPANY_SAGA = "GET_VALIDATE_COMPANY_SAGA";
export const PUT_ANSWER_SAGA = "PUT_ANSWER_SAGA";
export const DELETE_ANSWER_SAGA = "DETELE_ANSWER_SAGA";
export const PUT_REPORT_STATUS = "PUT_REPORT_STATUS";
export const PUT_BASE_64 = "PUT_BASE_64";

// ACTIONS
export const SET_ALL_QUESTIOS = "SET_ALL_QUESTIOS";
export const SET_CURRENT_AXIS = "SET_CURRENT_AXIS";
export const GET_VALIDATE_COMPANY = "GET_VALIDATE_COMPANY";
export const PUT_ANSWER = "PUT_ANSWER";
export const DELETE_ANSWER = "DELETE_ANSWER";
export const SET_RESUME_CURRENT_AXIS = "SET_RESUME_CURRENT_AXIS";
export const SET_RESUME_CURRENT_ASPECT = "SET_RESUME_CURRENT_ASPECT";
export const SET_INTEREST_GROUP = "SET_INTEREST_GROUP";
export const LOG_OUT = "LOG_OUT";
export const GENERATE_REPORT = "GENERATE_REPORT";
export const GENERATE_BASE64 = "GENERATE_BASE64";
