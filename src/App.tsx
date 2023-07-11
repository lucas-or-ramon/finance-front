import React from 'react';
import './App.css';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import appTheme from './config/theme';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from '@mui/icons-material';
import { CategoryList } from './features/category/ListCategory';
import { CategoryCreate } from './features/category/CreateCategory';
import { CategoryEdit } from './features/category/EditCategory';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Box
        component="main"
        sx={{
          height: '100vh',
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<CategoryList />} />
            <Route path="/category" element={<CategoryList />} />
            <Route path="/category/create" element={<CategoryCreate />} />
            <Route path="/category/edit/:id" element={<CategoryEdit />} />

            <Route
              path="*"
              element={
                <Box sx={{ color: "white" }}>
                  <Typography variant="h1">404</Typography>
                  <Typography variant="h2">Page not found</Typography>
                </Box>
              }
            />
          </Routes>
        </Layout>
      </Box>
    </ThemeProvider>
  );
}

export default App;
