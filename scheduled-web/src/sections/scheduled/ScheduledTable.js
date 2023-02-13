import { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Stack,
    Typography,
} from '@mui/material';
import { DataGridPremium, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid-premium';
import { useEffect } from 'react';
import Scrollbar from '../../components/scrollbar/Scrollbar'; 
import { apiGetScheduled } from 'src/services/ClassCourse';
import ScheduledFilter from './ScheduledFilter';



function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'code',
        headerName: 'Mã lớp',
        width: 100,
        editable: true,
    },
    {
        field: 'course_code',
        headerName: 'Mã học phần',
        width: 150,
        editable: true,
    },
    {
        field: 'day',
        headerName: 'Thứ',
        width: 100,
        editable: true,
    },
    {
        field: 'session',
        headerName: 'Buổi',
        width: 100,
        editable: true,
        valueGetter: (params) => params.row.session === 0 ? 'Sáng' : 'Chiều'
    },
    {
        field: 'start',
        headerName: 'BĐ',
        width: 100,
        editable: true,
    },
    {
        field: 'end',
        headerName: 'KT',
        width: 100,
        editable: true,
    },
    {
        field: 'room',
        headerName: 'Phòng',
        width: 100,
    },
    {
        field: 'size',
        headerName: 'Số lượng đăng kí',
        width: 150,
    },
    {
        field: 'week',
        headerName: 'Tuần học',
        width: 150,
        valueGetter: (params) => {
            if (params.row.week.length === 0) return "1 - 18";
            let week = '';
            params.row.week.forEach(val => week = week + val + ', ');
            return week;
        }
    }
];

export default function ScheduledTable(props) {
    const [timetables, setTimetables] = useState([]);

    useEffect(() => {
        const fetchAPI = async() => {
            try {
                const response = await apiGetScheduled();
                setTimetables(response.data.data.map((p) => {
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
        <Stack spacing={2} direction={'column'}>
            <Card>
                <Scrollbar>
                    <Box sx={{ height: '25em' }}>
                        <DataGridPremium
                            components={{ Toolbar: GridToolbar   }}
                            rows={timetables}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </Box>
                </Scrollbar>
            </Card>
            <Card>
                <CardContent>
                    <Typography variant='h5' sx={{ mb: 1 }}>Lọc thời khóa biểu</Typography>
                    <ScheduledFilter timetables={timetables}/>
                </CardContent>
            </Card>
        </Stack>
    );
}
