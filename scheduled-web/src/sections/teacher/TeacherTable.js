import { useState } from 'react';
import {
    Box,
    Card,
} from '@mui/material';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { useEffect } from 'react';
import Scrollbar from '../../components/scrollbar/Scrollbar'; 
import { apiGetAllTeacher } from 'src/services/Teacher';

const columns = [
    { field: 'id', headerName: 'ID', width: 300 },
    {
        field: 'fullname',
        headerName: 'Tên giáo viên',
        width: 200,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 250,
        editable: true,
    },
];

export default function TeacherTable(props) {
    const [teacher, setTeacher] = useState([]);

    useEffect(() => {
        const fetchAPI = async() => {
            try {
                const response = await apiGetAllTeacher();
                setTeacher(response.data.data.map((p) => {
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
                        rows={teacher}
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
