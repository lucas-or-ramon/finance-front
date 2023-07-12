import { Box, Button, IconButton, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteCategory, selectCategory, useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { NumericFormat } from "react-number-format";
import { useSnackbar } from "notistack";
import { useEffect } from "react";


export const CategoryList = () => {
    const { data, isFetching, error } = useGetCategoriesQuery();
    const [deleteCategory, deleteCategoryState] = useDeleteCategoryMutation();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const slotProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
        },
    };

    const rows: GridRowsProp = data
        ? data.data.map((category) => ({
            id: category.id,
            name: category.name,
            total: category.total / 100,
            budget: category.budget ? category.budget / 100 : 0,
            balance: (category.budget ? category.budget - category.total : 0) / 100,
            description: category.description,
            isActive: category.is_active,
            createdAt: new Date(category.created_at).toLocaleDateString('pt-BR')
        }))
        : [];

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            renderCell: renderNameCell
        },
        {
            field: 'isActive',
            headerName: 'Active',
            flex: 1,
            type: "boolean",
            renderCell: renderIsActiveCell
        },
        {
            field: 'budget',
            headerName: 'Budget',
            flex: 1,
            renderCell: renderCurrencyCell
        },
        {
            field: 'total',
            headerName: 'Total',
            flex: 1,
            renderCell: renderCurrencyCell
        },
        {
            field: 'balance',
            headerName: 'Balance',
            flex: 1,
            renderCell: renderCurrencyCell
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            flex: 1
        },
        {
            field: 'id',
            headerName: 'Actions',
            flex: 1,
            renderCell: renderActionsCell
        }
    ];

    function renderNameCell(rowData: GridRenderCellParams) {
        return (
            <Link
                style={{ textDecoration: "none" }}
                to={`/categories/edit/${rowData.id}`}
            >
                <Typography color="primary">{rowData.value}</Typography>
            </Link>
        );
    };

    function renderIsActiveCell(rowData: GridRenderCellParams) {
        return (
            <Typography color={rowData.value ? "primary" : "secondary"}>
                {rowData.value ? "Active" : "Inactive"}
            </Typography>
        );
    };

    function renderCurrencyCell(rowData: GridRenderCellParams) {
        return (
            <NumericFormat
                value={rowData.value}
                allowLeadingZeros={true}
                displayType={'text'}
                thousandSeparator={false}
                prefix={'R$ '}
            />
        );
    };

    async function handleDelete(id: string) {
        await deleteCategory({id});
        
    }

    useEffect(() => {
        if (deleteCategoryState.isSuccess) {
            enqueueSnackbar('Category deleted successfully', { variant: 'success' })
        }
        if (deleteCategoryState.isError) {
            enqueueSnackbar('Error deleting category', { variant: 'error' })
        }
    }, [deleteCategoryState, enqueueSnackbar])

    function renderActionsCell(rowData: GridRenderCellParams) {
        return (
            <IconButton
                color="secondary"
                onClick={() => handleDelete(rowData.value)}
                aria-label="delete"
            >
                <DeleteIcon />
            </IconButton>
        );
    };

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
                    Create Category
                </Button>
            </Box>

            <Box
                sx={{ display: 'flex', height: '600' }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    slotProps={slotProps}
                    slots={{ toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
};