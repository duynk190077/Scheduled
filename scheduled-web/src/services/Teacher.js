import { SERVICE_URL } from 'src/constants/config';
import api from './Api';

export const apiCreateTeacher = async(teacher) => {
    const url = SERVICE_URL + '/teachers';
    const response = await api.post(url, teacher);
    return response;
}

export const apiGetAllTeacher = async() => {
    const url = SERVICE_URL + '/teachers';
    const response = await api.get(url);
    return response;
}