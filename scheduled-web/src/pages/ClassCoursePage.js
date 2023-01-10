import { Box, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ClassCourseTable from "src/sections/class_course/ClassCourseTable";
import CreateClassCourseForm from "src/sections/class_course/CreateClassCourseForm";

export default function ClassCoursePage(props) {
    const [load, setLoad] = useState(false);

    const handleChangeLoad = () => {
        setLoad(!load);
    }
    return (
        <>
            <Helmet>
                <title>Class Course | Scheduled App</title>
            </Helmet>
            <Container>
                <Stack direction={'column'} spacing={2}>
                    <Box>
                        <Typography variant="h5" sx={{ mb: 1 }}>Thêm lớp mới</Typography>
                        <CreateClassCourseForm onLoad={handleChangeLoad}/>
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{ mb: 1 }}>Danh sách lớp</Typography>
                        <ClassCourseTable load={load}/>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}