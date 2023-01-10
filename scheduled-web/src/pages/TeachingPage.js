import { Box, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import CreateTeachingForm from "src/sections/teaching/CreateTeachingForm";
import TeachingTable from "src/sections/teaching/TeachingTable";

export default function TeachingPage(props) {
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
                        <Typography variant="h5" sx={{ mb: 1 }}>Thêm phân công mới</Typography>
                        <CreateTeachingForm onLoad={handleChangeLoad}/>
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{ mb: 1 }}>Danh sách phân công</Typography>
                        <TeachingTable load={load}/>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}