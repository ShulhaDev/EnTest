import axios from "axios"
import {getBaseUrl} from "../config";
export const instance = axios.create({
        baseURL: getBaseUrl()
    });
