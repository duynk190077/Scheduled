import { Box, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import CourseTable from "../sections/course/CourseTable";
import CreateCourseForm from "../sections/course/CreateCourseForm";

export default function CoursePage(props) {
    const [load, setLoad] = useState(false);

    const handleChangeLoad = () => {
        setLoad(!load);
    }
    return (
        <>
            <Helmet>
                <title>Course | Scheduled App</title>
            </Helmet>
            <Container>
                <Stack direction={'column'} spacing={2}>
                    <Box>
                        <Typography variant="h5" sx={{ mb: 1 }}>Thêm môn học mới</Typography>
                        <CreateCourseForm onLoad={handleChangeLoad}/>
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{ mb: 1 }}>Danh sách môn học</Typography>
                        <CourseTable load={load}/>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}