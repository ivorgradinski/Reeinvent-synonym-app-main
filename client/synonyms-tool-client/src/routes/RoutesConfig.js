import React, { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ADD_SYNONYM, SEARCH_SYNONYM } from '../constants/routes';

const AddSynonymPage = lazy(() => import('../pages/AddSynonymPage/AddSynonymPage'));
const SearchPage = lazy(() => import('../pages/SearchPage/SearchPage'));

const RoutesConfig = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/" element={<Navigate to={ADD_SYNONYM} />} />
            <Route path={ADD_SYNONYM} element={<AddSynonymPage />} />
            <Route path={SEARCH_SYNONYM} element={<SearchPage />} />
        </Routes>
    </Suspense>
);

export default RoutesConfig;
