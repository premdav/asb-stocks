import React, { useState } from 'react';
import {
  Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { Stock, TenDay } from '../../Types/AppTypes';

const tableHeaders = [
  {
    field: 'date', headerName: 'Date', flex: 1,
  },
  {
    field: 'open', headerName: 'Open', flex: 2,
  },
  {
    field: 'high', headerName: 'High', flex: 2,
  },
  {
    field: 'low', headerName: 'Low', flex: 2,
  },
  {
    field: 'close', headerName: 'Close', flex: 2,
  },
  {
    field: 'volume', headerName: 'Volume', flex: 1,
  }
];


const DetailTable = ({ tenday }: { tenday: TenDay[] }) => {
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
              tenday.map((day) => (
                <TableRow key={day.date} hover>
                  <TableCell>{day.date}</TableCell>
                  <TableCell>{day.open}</TableCell>
                  <TableCell>{day.high}</TableCell>
                  <TableCell>{day.low}</TableCell>
                  <TableCell>{day.close}</TableCell>
                  <TableCell>{day.volume}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    
  );
};

export default DetailTable;