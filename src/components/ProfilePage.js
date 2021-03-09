import React from 'react';
import {Button, TextField, Typography, Container, Paper} from '@material-ui/core';
import {makeStyles, ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {teal, orange} from '@material-ui/core/colors';
import 'fontsource-roboto';

// const useStyles = makeStyles({
//     root: {
        
//     }
// })

const theme = createMuiTheme({
    typography: {
        h1: {
            fontSize: 36,
        }
    },
    palette: {
        primary: {
            main: teal[500],
        },
        secondary: {
            main: orange[500],
        }
    }
})

const ProfilePage = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Container maxWidth="lg">
                    <Typography variant="h1" color="primary" align="center">Profile page</Typography>
                    <Paper elevation={3} style={{ padding: "40px", 
                                                margin: "30px", 
                                                alignItems: "center", 
                                                display: "flex", 
                                                flexFlow: "column" }}>
                        <TextField 
                            variant="filled"
                            label="input field"
                            size="medium"
                            // value="value"
                            placeholder="placeholder" 
                            />
                        <Button variant="contained" color="primary">Details</Button>
                    </Paper>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default ProfilePage;
