import {Paper} from "@mui/material";

export const AlliancePaper = ({children}) => {
    return <Paper style={{marginBottom: "1rem", marginTop: "1rem"}} variant={"outlined"}>{children}</Paper>
}