import { Helmet } from "react-helmet-async";
import RoomTable from "../sections/room/RoomTable";
import CreateroomForm from "../sections/room/CreateRoomForm";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function RoomPage(props) {
    const [load, setLoad] = useState(false);

    const handleChangeLoad = () => {
        setLoad(!load);
    }
    return (
        <>
            <Helmet>
                <title>Room | Scheduled App</title>
            </Helmet>
            <Container>
                <Stack direction={'column'} spacing={2}>
                    <Box>
                        <Typography variant="h5" sx={{ mb: 1 }}>Thêm phòng mới</Typography>
                        <CreateroomForm onLoad={handleChangeLoad}/>
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{ mb: 1 }}>Danh sách phòng</Typography>
                        <RoomTable load={load}/>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}