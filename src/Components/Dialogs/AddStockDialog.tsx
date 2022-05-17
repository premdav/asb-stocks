import {
  Dialog, DialogTitle, Breakpoint, DialogContent, DialogActions, Button, TextField,
} from '@mui/material';
import { useState } from 'react';
import { useAddStockMutation, useGetStocksQuery, api } from '../../Redux/api';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { stockInfoActions } from '../../Redux/slices/stockInfoSlice';
import { StockRequest } from '../../Types/AppTypes';
import { useDialogContext } from './dialogContext';

const AddStockDialog = ({ open }: { open: boolean}): JSX.Element => {
  const dispatch = useAppDispatch();
  const { closeDialog } = useDialogContext();
  const { detailStock } = useAppSelector((store) => store.stockInfo);
  const [formErr, setFormErr] = useState({ companyName: false, symbol: false });
  // const [] = useGetStocksQuery();
  const [addStock] = useAddStockMutation();

  const validateAddStock = ({ symbol, companyName }: StockRequest): boolean => {
    let companyNameMissing = false, symbolMissing = false;
    if (!companyName.length) companyNameMissing = true;
    if (!symbol.length) symbolMissing = true;
    setFormErr({ companyName: companyNameMissing, symbol: symbolMissing });
    return !(companyNameMissing || symbolMissing);
  };

  return (<>
        <Dialog
          open={open}
          onClose={closeDialog}
        >
          <DialogTitle>
            Add Stock
          </DialogTitle>
          <>
          <form 
            noValidate 
            onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const fieldValues = Object.fromEntries(formData.entries()) as unknown as StockRequest;

              const isValidRequest = validateAddStock(fieldValues);
              if (isValidRequest) {
                try {
                    const stockVal = await addStock(fieldValues);
                    closeDialog();
                  } 
                catch (err: unknown) {
                  // set error and show error toast
                }
              }
            }}
          >
            <DialogContent>

              <TextField
                variant="outlined" margin="dense" fullWidth 
                key='symbol-input'
                id='symbol-input'
                label='Symbol'
                name='symbol'
                required
                error={formErr.symbol}
                helperText={formErr.symbol ? 'Symbol Required' : undefined }
                defaultValue=''
                onClick={(e) => { 
                  e.stopPropagation();
                }}
              />
              <TextField
                variant="outlined" margin="dense" fullWidth 
                key='companyName-input'
                id='companyName-input'
                label='Company Name'
                name='companyName'
                required
                error={formErr.companyName}
                helperText={formErr.companyName ? 'Company Name Required' : undefined }
                defaultValue=''
                onClick={(e) => { 
                  e.stopPropagation();
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit">
                Submit
              </Button>
            </DialogActions>
          </form>
          </>
        </Dialog>
    </>);
};

export default AddStockDialog;