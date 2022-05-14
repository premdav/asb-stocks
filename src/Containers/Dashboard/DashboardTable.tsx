import React, { useState } from 'react';
import {
  Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { useAppDispatch } from '../../Redux/hooks';
import { Stock } from '../../Types/AppTypes';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { stockInfoActions } from '../../Redux/slices/stockInfoSlice';
import { useDialogContext } from '../../Components/Dialogs/dialogContext';
import { useNavigate } from 'react-router-dom';

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


const DashboardTable = ({ stocks, favoriteStocks }: { stocks: Stock[], favoriteStocks: Stock[] }) => {
  const dispatch = useAppDispatch();
  const { openDialog } = useDialogContext();
  const navigate = useNavigate();
  console.log('stocks', stocks);
  console.log('favs', favoriteStocks);
  return (

      <TableContainer className='content'>
        <Table size='small'>
          <TableHead>
            <TableRow>
              {
                tableHeaders.map((col) => (
                  <TableCell
                  variant='head'
                  key={col.field}
                  >{col.headerName}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              favoriteStocks.map((stock) => (
                <TableRow key={stock.id} hover>
                  <TableCell>
                    <Favorite color='primary' onClick={() => {
                      dispatch(stockInfoActions.setDetailStock(stock));
                      openDialog('unfavorite');
                      }} />
                  </TableCell>
                  <TableCell>{stock.symbol}</TableCell>
                  <TableCell>{stock.companyName}</TableCell>
                  <TableCell>
                    <Button onClick={() => console.log('detail', stock.id)}>View Details</Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
          <TableBody>
            {
              stocks.filter((s) => !favoriteStocks.includes(s)).map((stock) => (
                <TableRow key={stock.id} hover>
                  <TableCell>
                    <FavoriteBorder onClick={() => dispatch(stockInfoActions.addFavorite(stock))} />
                  </TableCell>
                  <TableCell>{stock.symbol}</TableCell>
                  <TableCell>{stock.companyName}</TableCell>
                  <TableCell>
                    <Button onClick={() => {
                      dispatch(stockInfoActions.setDetailStock(stock));
                      navigate('/details')
                    }}>View Details</Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    
  );
};

export default DashboardTable;