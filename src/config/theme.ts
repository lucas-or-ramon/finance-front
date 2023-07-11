import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const appTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#f5f5f1"
        },
        secondary: {
            main: "#e50914"
        },
        text: {
            primary: "#f5f5f1",
        },
        background: {
            default: grey[900]
        }
    }

})

export default appTheme