import { Helmet } from "react-helmet-async";
import RoomTable from "../sections/room/RoomTable";
import CreateroomForm from "../sections/room/CreateRoomForm";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ScheduledTable from "src/sections/scheduled/ScheduledTable";

export default function ScheduledPage(props) {
    const [load, setLoad] = useState(false);

    const handleChangeLoad = () => {
        setLoad(!load);
    }
    return (
        <>
            <Helmet>
                <title>Scheduled | Scheduled App</title>
            </Helmet>
            <Container>
                <Stack direction={'column'} spacing={2}>
                    <Box>
                        <ScheduledTable load={load}/>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}