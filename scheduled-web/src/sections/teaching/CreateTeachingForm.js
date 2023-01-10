import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { apiGetAllClassCourse } from "src/services/ClassCourse";
import { apiGetAllTeacher } from "src/services/Teacher";
import { apiCreateTeaching } from "src/services/Teaching";

const initTeaching = {
    class_code: null,
    teacher_id: null,
}

export default function CreateTeachingForm(props) {
    const [teaching, setTeaching] = useState(initTeaching);
    const [classCourses, setClassCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await apiGetAllClassCourse();
                setClassCourses(response.data.data.map((p) => {
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

    

    const handleChangeTeaching = (property, value) => {
        setTeaching((pre) => {
            return {...pre, [property]: value }
        });
    }

    const handleCreateTeaching = async () => {
        try {
            const response = await apiCreateTeaching(teaching);
            if (response.data.status === 0) {
                alert("Add Teaching successfully");
                props.onLoad();
                // setTeaching(initTeaching);
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Autocomplete
                    options={classCourses}
                    getOptionLabel={(option) => option.code}
                    isOptionEqualToValue={(option, value) => value?.code === option?.code}
                    value={teaching.class_code === null ? null : classCourses.find((e) => e.code === teaching.class_code)}
                    onChange={(event, newValue) => {
                        handleChangeTeaching('class_code', newValue === null ? newValue : newValue.code);
                    }}
                    renderInput={(params) => (
                        <TextField
                            label="Mã lớp học"
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
                    value={teaching.teacher_id === null ? null : teachers.find((e) => e.id === teaching.teacher_id)}
                    onChange={(event, newValue) => {
                        handleChangeTeaching('teacher_id', newValue === null ? newValue : newValue.id);
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
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="secondary" onClick={handleCreateTeaching}>Thêm mới</Button>
            </Grid>
        </Grid>
    )
}