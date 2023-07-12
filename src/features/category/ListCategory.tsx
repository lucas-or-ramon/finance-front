import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice";
import { CategoryTable } from './components/CategoryTable';
import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid";


export const CategoryList = () => {
    const [perPage] = useState(3);
    const [rowsPerPage] = useState([3, 6, 12]);
    const { data, isFetching, error } = useGetCategoriesQuery();
    const [deleteCategory, deleteCategoryState] = useDeleteCategoryMutation();
    const { enqueueSnackbar } = useSnackbar();

    function handleOnPaginationChange(model: GridPaginationModel) {
        console.log(model.page, model.pageSize);
    }

    function handleOnFilterChange(filterModel: GridFilterModel) {
        console.log(filterModel);
    }

    async function handleOnDelete(id: string) {
        await deleteCategory({ id });
    }

    useEffect(() => {
        if (deleteCategoryState.isSuccess) {
            enqueueSnackbar('Category deleted successfully', { variant: 'success' })
        }
        if (deleteCategoryState.isError) {
            enqueueSnackbar('Error deleting category', { variant: 'error' })
        }
    }, [deleteCategoryState, enqueueSnackbar])

    return (
        <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/categories/create"
                    style={{ marginBottom: "1rem" }}
                >
                    New Category
                </Button>
            </Box>

            <CategoryTable
                data={data}
                perPage={perPage}
                isFetching={isFetching}
                rowsPerPage={rowsPerPage}
                handleOnDelete={handleOnDelete}
                handleOnFilterChange={handleOnFilterChange}
                handleOnPaginationChange={handleOnPaginationChange}
            />
        </Box>
    )
};