import { useState } from 'react';
import {
    Box,
    Card,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { apiGetAllCourse } from 'src/services/Course';
// components
import Scrollbar from '../../components/scrollbar/Scrollbar'; 

const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Tên môn học',
        width: 300,
        editable: true,
    },
    {
        field: 'code',
        headerName: 'Mã môn học',
        width: 150,
        editable: true,
    },
    {
        field: 'semester',
        headerName: 'Kỳ học',
        width: 120,
        editable: true,
    },
    {
        field: 'lesson',
        headerName: 'Số tiết',
        width: 160,
    },
    {
        field: 'train_credit',
        headerName: 'Số tín chỉ',
        width: 160,
    },
];

export default function CourseTable(props) {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchAPI = async() => {
            try {
                const response = await apiGetAllCourse();
                setCourses(response.data.data.map((p) => {
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
                        rows={courses}
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
