import { useState } from 'react';
import {
    Box,
    Card,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import Scrollbar from '../../components/scrollbar/Scrollbar'; 
import { apiGetAllTeaching } from 'src/services/Teaching';

const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'class_code',
        headerName: 'Mã lớp',
        width: 200,
        editable: true,
    },
    {
        field: 'teacher_id',
        headerName: 'Giáo viên',
        width: 250,
        editable: true,
    },
];

export default function TeachingTable(props) {
    const [teachings, setTeachings] = useState([]);
    useEffect(() => {
        const fetchAPI = async() => {
            try {
                const response = await apiGetAllTeaching();
                setTeachings(response.data.data.map((p) => {
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
                    <DataGrid
                        rows={teachings}
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
