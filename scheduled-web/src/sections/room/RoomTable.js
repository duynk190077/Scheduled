import { useState } from 'react';
import {
    Box,
    Card,
} from '@mui/material';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { useEffect } from 'react';
import Scrollbar from '../../components/scrollbar/Scrollbar'; 
import { apiGetAllRooms } from 'src/services/Room';

const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Tên phòng',
        width: 200,
    },
    {
        field: 'size',
        headerName: 'Sức chứa',
        width: 150,
    },
    {
        field: 'type',
        headerName: 'Loại phòng',
        width: 150,
    }
];

export default function RoomTable(props) {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchAPI = async() => {
            try {
                const response = await apiGetAllRooms();
                setRooms(response.data.data.map((p) => {
                    return {
                        ...p,
                        id: p._id
                    }
                }));
            } catch(err) {
                console.log(err);
            }
        }

        fetchAPI();
    }, [props.load])
    return (
        <Card>
            <Scrollbar>
                <Box sx={{ height: '25em' }}>
                    <DataGridPremium
                        rows={rooms}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </Box>
            </Scrollbar>
        </Card>
    );
}
