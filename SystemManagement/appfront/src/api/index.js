import { get,post } from "@/api/http";
export const getData = (relativeUrl, params) => get(relativeUrl, params);
export const postData = (relativeUrl, data) => post(relativeUrl, data);
//此处如果有参数传入给后端就需要写上参数 params/data 否则可以为空
