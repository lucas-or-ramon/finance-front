import { Box, Button, FormControl, Grid, Paper, TextField, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategoryById } from "./categorySlice";
import { useState } from "react";

export const CategoryEdit = () => {
    const id = useParams().id || "";
    const [isDisabled, setIsDisabled] = useState(false);
    const category = useAppSelector((state) => selectCategoryById(state, id));

    const handleChange = (e: any) => { }

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h1">
                            Category Edit Page
                        </Typography>
                    </Box>
                </Box>

                <Box p={2}>
                    <form>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        name="name"
                                        label="Name"
                                        value={category.name}
                                        disabled={isDisabled}
                                        onChange={handleChange}
                                    ></TextField>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        name="description"
                                        label="Description"
                                        value={category.description}
                                        disabled={isDisabled}
                                        onChange={handleChange}
                                    ></TextField>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" gap={2}>
                                    <Button variant="contained" compoment={Link} to="/category">
                                        Back
                                    </Button>
                                    <Button variant="contained" color="secondary" type="submit" disabled={isLoadind || isDisabled}>

                                    </Button>

                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Paper>
        </Box>
    );
};
