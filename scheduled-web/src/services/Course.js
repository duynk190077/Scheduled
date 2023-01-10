import { SERVICE_URL } from "../constants/config"
import api from './Api';

export const apiCreateCourse = async(course) => {
    const url = SERVICE_URL + '/courses';
    const response = await api.post(url, course);
    return response;
}

export const apiGetAllCourse = async() => {
    const url = SERVICE_URL + '/courses';
    const response = await api.get(url);
    return response;
}