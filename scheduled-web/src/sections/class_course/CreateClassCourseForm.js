import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { apiCreateClassCourse } from "src/services/ClassCourse";
import { apiGetAllCourse } from "src/services/Course";

const initClassCourse = {
    code: '',
    course_code: null,
    lesson: 0,
    size: 0,
}

export default function ClassCreateCourseForm(props) {
    const [classCourse, setClassCourse] = useState(initClassCourse);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await apiGetAllCourse();
                setCourses(response.data.data.map((p) => {
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

    const handleChangeClassCourse = (property, value) => {
        setClassCourse((pre) => {
            return {...pre, [property]: value }
        });
    }

    console.log(classCourse);

    const handleCreateClassCourse = async () => {
        try {
            const response = await apiCreateClassCourse(classCourse);
            if (response.data.status === 0) {
                alert("Add Class Course successfully");
                props.onLoad();
                // setClassCourse(initClassCourse);
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Mã lớp học"
                    value={classCourse.code}
                    onChange={(e) => handleChangeClassCourse('code', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={6}>
                <Autocomplete
                    options={courses}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => value?.code === option?.code}
                    value={classCourse.course_code === null ? null : courses.find((e) => e.code === classCourse.course_code)}
                    onChange={(event, newValue) => {
                        handleChangeClassCourse('course_code', newValue === null ? newValue : newValue.code);
                        handleChangeClassCourse('lesson', newValue === null ? 0 : newValue.lesson);
                    }}
                    renderInput={(params) => (
                        <TextField
                            label="Mã môn học"
                            fullWidth
                            {...params}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Số lượng đăng kí"
                    type={'number'}
                    value={classCourse.size}
                    onChange={(e) => handleChangeClassCourse('size', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="secondary" onClick={handleCreateClassCourse}>Thêm mới</Button>
            </Grid>
        </Grid>
    )
}