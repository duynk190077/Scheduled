import { Box, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import CreateTeacherForm from "src/sections/teacher/CreateTeacherForm";
import TeacherTable from "src/sections/teacher/TeacherTable";

export default function TeacherPage(props) {
    const [load, setLoad] = useState(false);

    const handleChangeLoad = () => {
        setLoad(!load);
    }
    return (
        <>
            <Helmet>
                <title>Teacher | Scheduled App</title>
            </Helmet>
            <Container>
                <Stack direction={'column'} spacing={2}>
                    <Box>
                        <Typography variant="h5" sx={{ mb: 1 }}>Thêm giáo viên mới</Typography>
                        <CreateTeacherForm onLoad={handleChangeLoad}/>
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{ mb: 1 }}>Danh sách môn học</Typography>
                        <TeacherTable load={load}/>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}