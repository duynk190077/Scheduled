import { useState } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { DataGridPremium, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid-premium';
import { useEffect } from 'react';
import Scrollbar from '../../components/scrollbar/Scrollbar';
import { apiGetScheduled } from 'src/services/ClassCourse';
import ScheduledFilter from './ScheduledFilter';
import { useDispatch } from 'react-redux';
import { openLoadingModal, closeLoadingModal } from 'src/redux/loadingSlice';

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

const constraints = [
    {
        id: 1,
        name: 'Sức chứa phòng'
    },
    {
        id: 2,
        name: 'Nhóm môn'
    },
    {
        id: 3,
        name: 'Giảng viên'
    }
]

const generateTypes = [
    {
        id: 1,
        name: 'Lần lượt',
    },
    {
        id: 2,
        name: 'Ngẫu nhiên'
    }
]

export default function ScheduledTable(props) {
    const [scheduled, setScheduled] = useState({
        constraints: [],
        scale: 1,
        pm: 0,
        genType: null,
        stopFitness: 0
    })
    const [timetables, setTimetables] = useState([]);
    const dispatch = useDispatch();

    const handleChangeScheduled = (property, value) => {
        setScheduled({ ...scheduled, [property]: value });
    }

    const handleCreateScheduled = async(event) => {
        try {
            let data = {
                ...scheduled,
                genType: scheduled.genType?.id,
                constraints: scheduled.constraints?.map((e) => e.id),
            }
            dispatch(openLoadingModal());
            const response = await apiGetScheduled(data);
            dispatch(closeLoadingModal());
            if (response.data.status === 0) {
                setTimetables(response.data.data.map((p) => {
                    return {
                        ...p,
                        id: p._id
                    }
                }));
            }
        } catch(err) {
            dispatch(closeLoadingModal());
            console.log(err);
        }
    }
    return (
        <Stack spacing={2} direction={'column'}>
            <Card>
                <CardContent>
                    <Typography variant='h5' sx={{ mb: 1 }}>Tạo lịch mở lớp</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Autocomplete
                                options={constraints}
                                getOptionLabel={(option) => option.name}
                                multiple={true}
                                value={scheduled.constraints}
                                onChange={(event, newValue) => handleChangeScheduled("constraints", newValue)}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        label="Ràng buộc"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                type="number"
                                label="Tỷ lệ kích thước quần thể so với số lớp"
                                fullWidth
                                value={scheduled.scale}
                                onChange={(event) => handleChangeScheduled('scale', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                label="Xác suất đột biến"
                                fullWidth
                                value={scheduled.pm}
                                onChange={(event) => handleChangeScheduled('pm', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete 
                                options={generateTypes}
                                getOptionLabel={(option) => option.name}
                                value={scheduled.genType}
                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                onChange={(event, newValue) => handleChangeScheduled('genType', newValue)}
                                renderInput={(params) => 
                                    <TextField {...params} label="Tuần thực hành"/>
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                type='number'
                                label="Ngưỡng dừng"
                                value={scheduled.stopFitness}
                                onChange={(event) => handleChangeScheduled('stopFitness', event.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant='contained' onClick={handleCreateScheduled}>Tạo lịch</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 1 }}>Danh sách lớp mở </Typography>
                    <Scrollbar>
                        <Box sx={{ height: '25em' }}>
                            <DataGridPremium
                                components={{ Toolbar: GridToolbar }}
                                rows={timetables}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                pagination={true}
                                checkboxSelection
                                disableSelectionOnClick
                            />
                        </Box>
                    </Scrollbar>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography variant='h5' sx={{ mb: 1 }}>Lọc thời khóa biểu</Typography>
                    <ScheduledFilter timetables={timetables} />
                </CardContent>
            </Card>
        </Stack>
    );
}
