import React from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import DetailTable from './DetailTable';
import { stockInfoActions } from '../../Redux/slices/stockInfoSlice';
import { useGetTenDayQuery } from '../../Redux/api';

const Details = () => {
  const { detailStock } = useAppSelector((store) => store.stockInfo);
  const { data: tenday } = useGetTenDayQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
    { tenday && <>
        <Box className='content'>
          <div className='detail-header'>
            <div className='detail-header-content'>
              <h2>
                {detailStock.companyName}, {detailStock.symbol}
              </h2>

              
              <Button
              style={{ color: 'white', border: '1px solid white'}}
              onClick={() => {
                navigate('/dashboard');
                dispatch(stockInfoActions.setDetailStock(null));
              }}
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
          <DetailTable tenday={tenday} />
        </Box>
    </>}
    </>
  );
};

export default Details;