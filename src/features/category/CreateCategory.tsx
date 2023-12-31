import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Category, createCategory } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";
import { useAppDispatch } from "../../app/hooks";
import { useSnackbar } from "notistack";

export const CategoryCreate = () => {
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [isLoadind, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [categoryState, setCategoryState] = useState<Category>({
        id: "",
        name: "",
        total: 0,
        budget: null,
        description: "",
        is_active: false,
        deleted_at: "",
        created_at: "",
        updated_at: ""
    })

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(createCategory(categoryState))
        enqueueSnackbar("Category created successfully!", { variant: "success" });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategoryState({ ...categoryState, [name]: value });
    };

    const handleToggle = (e: any) => {
        const { name, checked } = e.target;
        setCategoryState({ ...categoryState, [name]: checked });
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
