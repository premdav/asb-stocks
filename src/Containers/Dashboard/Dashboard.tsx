import React, { useEffect, useState } from 'react';
import {
  Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import DashboardTable from './DashboardTable';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { useGetStocksQuery } from '../../Redux/api';
import UnfavoriteDialog from '../../Components/Dialogs/UnfavoriteDialog';
import { useDialogContext } from '../../Components/Dialogs/dialogContext';
import { Box } from '@mui/system';
import AddStockDialog from '../../Components/Dialogs/AddStockDialog';
import DeleteDialog from '../../Components/Dialogs/DeleteDialog';

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
  const { dialogType, openDialog } = useDialogContext();
  const { data: stocks } = useGetStocksQuery();
  const { favorites } = useAppSelector((store) => store.stockInfo);
  const dispatch = useAppDispatch();
  const [favStocks, setFaveStocks] = useState([]);

  return (<Box className='content'>
  <Button onClick={() => openDialog('addStock')} className='add-stock'>
    Add Stock
  </Button>
  {
    stocks && favorites !== undefined && <>
      <DashboardTable stocks={stocks} favoriteStocks={favorites} />
    </>
  }
  {
    dialogType === 'unfavorite' ?
    <UnfavoriteDialog open={dialogType === 'unfavorite'} /> : null
  }
  {
    dialogType === 'addStock' ?
    <AddStockDialog open={dialogType === 'addStock'} /> : null
  }
  {
    dialogType === 'deleteStock' ?
    <DeleteDialog open={dialogType === 'deleteStock'} /> : null
  }
  </Box>
  );
};

export default Dashboard;