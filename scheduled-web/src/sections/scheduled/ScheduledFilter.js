import { Autocomplete, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { apiGetAllRooms } from "src/services/Room";
import { apiGetAllTeacher } from "src/services/Teacher";


const lessons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const days = [2, 3, 4, 5, 6];

const switchTimetable = (timetables) => {
    let switchArr = [];
    for (let i = 0; i < 6; i++) switchArr.push([]);
    for (let i = 0; i < 6; i++)
        for (let j = 0; j < 12; j++) switchArr[i].push(false);
    timetables.map((p) => {
        for (let i = p.start; i <= p.end; i++)
            switchArr[p.day - 2][i + 6 * p.session - 1] = p.course_code;
        return 0;
    })

    return switchArr;
}

export default function ScheduledFilter(props) {
    const timetables = useMemo(() => {
        return props.timetables;
    }, [props.timetables])
    const [room, setRoom] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [teacher, setTeacher] = useState(null);
    const [teachers, setTeachers] = useState([]);

    const timetableFilters = useMemo(() => {
        if (room === null && teacher === null) return switchTimetable([]);
        let result = timetables;
        if (room !== null) result = result.filter((e) => e.room === room.name);
        if (teacher !== null) result = result.filter((e) => e.teacher_id === teacher.id);
        return switchTimetable(result);
    }, [room, teacher])


    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await apiGetAllTeacher();
                setTeachers(response.data.data.map((p) => {
                    return {
                        ...p,
                        id: p._id
                    }
                }));
            } catch (err) {
                console.log(err);
            }
        }

        fetchAPI();
    }, [])

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await apiGetAllRooms();
                setRooms(response.data.data.map((p) => {
                    return {
                        ...p,
                        id: p._id
                    }
                }));
            } catch (err) {
                console.log(err);
            }
        }

        fetchAPI();
    }, [])

    const classes = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Autocomplete
                    options={rooms}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => value?.id === option?.id}
                    value={room}
                    onChange={(event, newValue) => {
                        setRoom(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            label="Phòng"
                            fullWidth
                            {...params}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={6}>
                <Autocomplete
                    options={teachers}
                    getOptionLabel={(option) => option.fullname}
                    isOptionEqualToValue={(option, value) => value?.id === option?.id}
                    value={teacher}
                    onChange={(event, newValue) => {
                        setTeacher(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            label="Giáo viên"
                            fullWidth
                            {...params}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.textCenter}>Buổi</TableCell>
                                <TableCell className={classes.textCenter}>Tiết</TableCell>
                                <TableCell className={classes.textCenter}>Thứ 2</TableCell>
                                <TableCell className={classes.textCenter}>Thứ 3</TableCell>
                                <TableCell className={classes.textCenter}>Thứ 4</TableCell>
                                <TableCell className={classes.textCenter}>Thứ 5</TableCell>
                                <TableCell className={classes.textCenter}>Thứ 6</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lessons.map((p, index) => {
                                return (
                                    <TableRow key={p}>
                                        {(index === 0 || index === 6) &&
                                            <TableCell rowSpan={6} className={clsx(classes.tableCell, classes.textCenter, classes.tableCellLeft)}>
                                                {index === 0 ? 'Sáng' : 'Chiều'}
                                            </TableCell>
                                        }
                                        <TableCell className={clsx(classes.tableCell, classes.textCenter)}>{p}</TableCell>
                                        {days.map((day) => {
                                            return (
                                                <TableCell
                                                    key={`${p}${day}`}
                                                    className={clsx(classes.tableCell,
                                                        classes.textCenter,
                                                        { [classes.tableCellHighlight]: timetableFilters[day - 2][p - 1] !== false }
                                                    )}
                                                >
                                                    {timetableFilters[day - 2][p - 1] !== false ? timetableFilters[day - 2][p - 1] : ''}
                                                </TableCell>
                                            )
                                        })}
                                        {/* <TableCell className={clsx(classes.tableCell, classes.textCenter)}></TableCell>
                                <TableCell className={clsx(classes.tableCell, classes.textCenter)}></TableCell>
                                <TableCell className={clsx(classes.tableCell, classes.textCenter)}></TableCell>
                                <TableCell className={clsx(classes.tableCell, classes.textCenter)}></TableCell>
                                <TableCell className={clsx(classes.tableCell, classes.textCenter)}></TableCell> */}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>

    )
}

const useStyles = makeStyles({
    tableCell: {
        borderRight: '1px solid rgba(224, 224, 224, 1)',
    },
    textCenter: {
        textAlign: 'center',
    },
    tableCellHighlight: {
        backgroundColor: '#74c2bb'
    },
    tableCellLeft: {
        borderLeft: '1px solid rgba(224, 224, 224, 1)',
    }
})