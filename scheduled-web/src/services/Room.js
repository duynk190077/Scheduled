import { SERVICE_URL } from 'src/constants/config';
import api from './Api';

export const apiCreateRoom = async(room) => {
    const url = SERVICE_URL + '/rooms';
    const response = await api.post(url, room);
    return response;
}

export const apiGetAllRooms = async() => {
    const url = SERVICE_URL + '/rooms';
    const response = await api.get(url);
    return response;
}