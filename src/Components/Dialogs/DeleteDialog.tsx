import {
  Dialog, DialogTitle, Breakpoint, DialogContent, DialogActions, Button,
} from '@mui/material';
import { useDeleteStockMutation } from '../../Redux/api';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { stockInfoActions } from '../../Redux/slices/stockInfoSlice';
import { useDialogContext } from './dialogContext';

const DeleteDialog = ({ open }: { open: boolean}): JSX.Element => {
  const dispatch = useAppDispatch();
  const { closeDialog } = useDialogContext();
  const { detailStock } = useAppSelector((store) => store.stockInfo);
  const [deleteStock] = useDeleteStockMutation();

  return (<>
        <Dialog
          open={open}
          onClose={closeDialog}
        >
          <DialogTitle>
            Delete Stock
          </DialogTitle>
          <>
            <DialogContent>
              Are you sure you want to delete <strong>{detailStock ? detailStock.companyName : 'stock'}</strong>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => {
                closeDialog();
                dispatch(stockInfoActions.setDetailStock(null));
              }}>
                No
              </Button>
              <Button
                type='submit'
                onClick={async () => {
                  await deleteStock(detailStock.id);
                  dispatch(stockInfoActions.setDetailStock(null));
                  closeDialog();
                }}
              >
                Yes
              </Button>
            </DialogActions>
          </>
        </Dialog>
    </>);
};

export default DeleteDialog;