import DeleteIcon from '@mui/icons-material/Delete'
import { Box, IconButton, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridFilterModel, GridPaginationModel, GridRenderCellParams, GridRowsProp, GridToolbar } from "@mui/x-data-grid"
import { NumericFormat } from "react-number-format"
import { Link } from "react-router-dom"
import { Results } from "../../../types/Category"
import { on } from 'events'

type Props = {
    data: Results | undefined
    perPage: number
    isFetching: boolean
    rowsPerPage?: number[]

    handleOnDelete: (id: string) => void
    handleOnFilterChange: (filterModel: GridFilterModel) => void
    handleOnPaginationChange: (model: GridPaginationModel) => void
}

export function CategoryTable({
    data,
    perPage,
    isFetching,
    rowsPerPage,
    handleOnFilterChange,
    handleOnPaginationChange,
    handleOnDelete
}: Props) {

    const slotProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
        },
    };

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

    function renderActionsCell(rowData: GridRenderCellParams) {
        return (
            <IconButton
                color="secondary"
                onClick={() => handleOnDelete(rowData.value)}
                aria-label="delete"
            >
                <DeleteIcon />
            </IconButton>
        );
    };

    function mapDataToGridRows(data: Results) {
        const { data: categories } = data;
        return categories.map((category) => ({
            id: category.id,
            name: category.name,
            total: category.total / 100,
            budget: category.budget ? category.budget / 100 : 0,
            balance: (category.budget ? category.budget - category.total : 0) / 100,
            description: category.description,
            isActive: category.is_active,
            createdAt: new Date(category.created_at).toLocaleDateString('pt-BR')
        }))
    }

    const rows: GridRowsProp = data ? mapDataToGridRows(data) : [];
    const rowCount = data?.meta.total ?? 0;

    return (
        <Box sx={{ display: 'flex', height: '600' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                loading={isFetching}
                rowCount={rowCount}
                slotProps={slotProps}
                filterMode={"server"}
                paginationMode={"server"}
                pageSizeOptions={rowsPerPage || [3, 5, 10]}
                paginationModel={{
                    page: 0,
                    pageSize: perPage,
                }}
                slots={{ toolbar: GridToolbar }}
                checkboxSelection={false}
                onFilterModelChange={handleOnFilterChange}
                disableColumnSelector={true}
                disableDensitySelector={true}
                onPaginationModelChange={handleOnPaginationChange}
                disableRowSelectionOnClick={true}
            />
        </Box>
    )
}