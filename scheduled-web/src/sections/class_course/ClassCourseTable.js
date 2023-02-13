import { useState } from 'react';
import {
    Box,
    Card,
} from '@mui/material';
import { DataGridPremium, GridToolbar } from '@mui/x-data-grid-premium';
import { useEffect } from 'react';
// components
import Scrollbar from '../../components/scrollbar/Scrollbar'; 
import { apiGetAllClassCourse } from 'src/services/ClassCourse';

const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'code',
        headerName: 'Mã lớp học',
        width: 300,
        editable: true,
    },
    {
        field: 'course_code',
        headerName: 'Mã môn học',
        width: 150,
        editable: true,
    },
    {
        field: 'size',
        headerName: 'Số lượng đăng kí',
        width: 150,
        editable: true,
    },
    {
        field: 'lesson',
        headerName: 'Số tiết',
        width: 160,
    },
    {
        field: 'type',
        headerName: 'Loại lớp',
        width: 160,
    }
];

export default function ClassCourseTable(props) {
    const [classCourses, setClassCourses] = useState([]);

    useEffect(() => {
        const fetchAPI = async() => {
            try {
                const response = await apiGetAllClassCourse();
                setClassCourses(response.data.data.map((p) => {
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
                        components={{ Toolbar: GridToolbar }}
                        rows={classCourses}
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
