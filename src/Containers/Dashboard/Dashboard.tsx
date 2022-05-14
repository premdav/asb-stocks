import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import DashboardTable from './DashboardTable';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { useGetStocksQuery } from '../../Redux/api';

const tableHeaders = [
  {
    field: 'actions', headerName: 'Actions', flex: 1,
  },
  {
    field: 'symbol', headerName: 'Symbol', flex: 3,
  },
  {
    field: 'companyName', headerName: 'Company Name', flex: 3,
  },
  {
    field: 'details', headerName: 'Details', flex: 2,
  }
];


const Dashboard = () => {
  const { data: stocks } = useGetStocksQuery();
  const { favorites } = useAppSelector((store) => store.stockInfo);
  const dispatch = useAppDispatch();
  const [favStocks, setFaveStocks] = useState([]);

  return (<>
  {
    stocks && favorites !== undefined && <>
      <DashboardTable stocks={stocks} favoriteStocks={favorites} />
    </>
  }
  </>
  );
};

export default Dashboard;