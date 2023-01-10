import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { apiCreateTeacher } from "src/services/Teacher";

const initTeacher = {
    fullname: '',
    email: '',
}

export default function CreateTeacherForm(props) {
    const [teacher, setTeacher] = useState(initTeacher);
    
    const handleChangeTeacher = (property, value) => {
        setTeacher({...teacher, [property]: value });
    }

    const handleCreateTeacher = async() => {
        try {
            const response = await apiCreateTeacher(teacher);
            if (response.data.status === 0) {
                alert("Add Teacher successfully");
                props.onLoad();
                setTeacher(initTeacher);
            }
        } catch(err){
            console.log(err);
        }
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField 
                    label="Họ và tên"
                    value={teacher.fullname}
                    onChange={(e) => handleChangeTeacher('fullname', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    label="email"
                    value={teacher.email}
                    onChange={(e) => handleChangeTeacher('email', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="secondary" onClick={handleCreateTeacher}>Thêm mới</Button>
            </Grid>
        </Grid>
    )
}