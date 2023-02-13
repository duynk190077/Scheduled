import { SERVICE_URL } from 'src/constants/config';
import api from './Api';

export const apiCreateClassCourse = async(classCourse) => {
    const url = SERVICE_URL + '/class-courses';
    const response = await api.post(url, classCourse);
    return response;
} 

export const apiGetAllClassCourse = async() => {
    const url = SERVICE_URL + '/class-courses';
    const response = await api.get(url);
    return response;
}

export const apiGetScheduled = async(data) => {
    const url = SERVICE_URL + '/class-courses/scheduled/build';
    const response = await api.post(url, data);
    return response;
}