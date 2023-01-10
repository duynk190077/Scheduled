import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { apiCreateCourse } from "src/services/Course";

const initCourse = {
    name: '',
    code: '',
    semester: 1,
    lesson: 1,
    train_credit: 1,
}

export default function CreateCourseForm(props) {
    const [course, setCourse] = useState(initCourse);
    
    const handleChangeCourse = (property, value) => {
        setCourse({...course, [property]: value });
    }

    const handleCreateCourse = async() => {
        try {
            const response = await apiCreateCourse(course);
            if (response.data.status === 0) {
                alert("Add Course successfully");
                props.onLoad();
                setCourse(initCourse);
            }
        } catch(err){
            console.log(err);
        }
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField 
                    label="Tên môn học"
                    value={course.name}
                    onChange={(e) => handleChangeCourse('name', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    label="Mã môn học"
                    value={course.code}
                    onChange={(e) => handleChangeCourse('code', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    label="Kỳ học"
                    type={'number'}
                    value={course.semester}
                    onChange={(e) => handleChangeCourse('semester', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    label="Số tiết"
                    type={'number'}
                    value={course.lesson}
                    onChange={(e) => handleChangeCourse('lesson', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    label="Số tín chỉ"
                    type={'number'}
                    value={course.train_credit}
                    onChange={(e) => handleChangeCourse('train_credit', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="secondary" onClick={handleCreateCourse}>Thêm mới</Button>
            </Grid>
        </Grid>
    )
}