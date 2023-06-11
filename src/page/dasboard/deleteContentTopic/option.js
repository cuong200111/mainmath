import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Grid } from '@mui/material';
import axios from 'axios';
import { apiKeys } from '../../../config/api';

export default function BasicSelect(props) {
    const [nameDir, setNameDir] = React.useState('');
    const [mapTopic, setMapTopic] = React.useState([]);
    const [mapTopics, setMapTopics] = React.useState([]);
    const [nameDirTopic, setNameDirTopic] = React.useState('');
    const [nameTopics, setnameTopics] = React.useState('');
    const { activeDraw } = props





    const handleChange = async (event) => {
        const value = event.target.value
        setNameDir(value)
        if(activeDraw){
            
        }else{
            const listTopic = await axios.get(`${apiKeys}/getDirTopic/${value}`)
            setMapTopic(listTopic.data);
        }
      

    };
    const handleChange2 = async (event) => {
        const value = event.target.value
        setNameDirTopic(value)
        if (nameDir.length > 0) {
            const value = event.target.value
            
            const listTopic = await axios.get(`${apiKeys}/getDirTopics/${nameDir}/${value}`)
            setMapTopics(listTopic.data);

        } else {
            alert('vui long nhap IB truoc')
        }

    }
    const handleChange3 = (event) => {
        const value = event.target.value
        setnameTopics(value)

    }
    return (
        <Box textAlign={"center"} display={Boolean(activeDraw) ? `flex` : `flex`}
            alignItems="center" justifyContent="center" flexDirection="column" height={Boolean(activeDraw) ? `100vh` : `100vh`}>
            <FormControl style={{ width: "50%" }}>
                <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={nameDir}
                    label={props.label}
                    onChange={handleChange}
                >

                    {props.name && props.name.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl style={{ width: "50%", margin: "50px",display:activeDraw?`flex`:`flex` }}>
                <InputLabel id="demo-simple-select-label">Chọn Topic muốn thêm ảnh </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={nameDirTopic}
                    label={'Chọn Topic muốn thêm ảnh'}
                    onChange={handleChange2}
                >

                    {mapTopic && mapTopic.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl style={{ width: "50%", margin: "50px",display:activeDraw?`flex`:`flex` }}>
                <InputLabel id="demo-simple-select-label">Chọn ten topic </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={nameTopics}
                    label={'Chọn ten topic'}
                    onChange={handleChange3}
                >

                    {mapTopics && mapTopics.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <button style={{display:activeDraw?`block`:`block`}} onClick={() => {
                props.handleClick(nameDirTopic, nameDir, nameTopics)
            }}>
                cliick
            </button>
        </Box>
    );
}