import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import './level.scss'
const LevelComponent = (props) => {
    const { levelProps } = props
    const type = levelProps.type

    useEffect(() => {

    }, [type])
    const color = type === 'hard' ? 'red' : type === 'easy' ? '#22C55E' : type === 'medium' ? '#F97316' : ''
    return (
        <>
            <Grid item xs={12} className={`title_Level ${type}`}>
                {type}
            </Grid>
            <Grid item xs={12}>
                <div className="border_Level" style={{ border: `1px solid ${color}` }}>
                    <div className={`bg_level ${type}`} style={{
                        backgroundColor: ``,
                    }}>


                    </div>
                </div>
            </Grid>
        </>
    )
}
export default LevelComponent