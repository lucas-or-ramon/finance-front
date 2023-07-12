import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCategoryById, updateCategory } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";
import { useSnackbar } from "notistack";

export const CategoryEdit = () => {
    const id = useParams().id || "";
    const [isLoadind, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const category = useAppSelector((state) => selectCategoryById(state, id));
    const [categoryState, setCategoryState] = useState(category);
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(updateCategory(categoryState))
        enqueueSnackbar("Category updated successfully!", { variant: "success" });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategoryState({ ...category, [name]: value });
    };

    const handleToggle = (e: any) => {
        const { name, checked } = e.target;
        setCategoryState({ ...category, [name]: checked });
    }

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h3">
                            Category Edit Page
                        </Typography>
                    </Box>
                </Box>

                <CategoryForm
                    category={categoryState}
                    isLoadind={isLoadind}
                    isDisabled={isDisabled}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleToggle={handleToggle}
                />
            </Paper>
        </Box>
    );
};
