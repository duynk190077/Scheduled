import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { apiCreateRoom } from "src/services/Room";

const initRoom = {
    name: '',
    size: 0,
    type: null
}

const ROOM_TYPES = ['LT+BT', 'TN'];

export default function CreateRoomForm(props) {
    const [room, setRoom] = useState(initRoom);
    
    const handleChangeRoom = (property, value) => {
        setRoom({...room, [property]: value });
    }

    console.log(room);

    const handleCreateRoom = async() => {
        try {
            const response = await apiCreateRoom(room);
            if (response.data.status === 0) {
                //alert("Add Room successfully");
                props.onLoad();
                // setRoom(initRoom);
            }
        } catch(err){
            console.log(err);
        }
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField 
                    label="Tên phòng"
                    value={room.name}
                    onChange={(e) => handleChangeRoom('name', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    label="Sức chứa"
                    value={room.size}
                    onChange={(e) => handleChangeRoom('size', e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={6}>
                <Autocomplete 
                    options={ROOM_TYPES}
                    getOptionLabel={(option) => option}
                    value={room.type}
                    onChange={(event, value) => handleChangeRoom('type', value)}
                    renderInput={(params) => 
                        <TextField 
                            label="Loại phòng"
                            {...params}
                        />
                    }
                />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="secondary" onClick={handleCreateRoom}>Thêm mới</Button>
            </Grid>
        </Grid>
    )
}