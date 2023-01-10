import { SERVICE_URL } from 'src/constants/config';
import api from './Api';

export const apiCreateTeaching = async(teaching) => {
    const url = SERVICE_URL + '/teachings';
    const response = await api.post(url, teaching);
    return response;
}

export const apiGetAllTeaching = async() => {
    const url = SERVICE_URL + '/teachings';
    const response = await api.get(url);
    return response;
}