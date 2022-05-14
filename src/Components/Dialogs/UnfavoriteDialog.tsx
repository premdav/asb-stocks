import {
  Dialog, DialogTitle, Breakpoint, DialogContent, DialogActions, Button,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { stockInfoActions } from '../../Redux/slices/stockInfoSlice';
import { useDialogContext } from './dialogContext';

const UnfavoriteDialog = ({ open }: { open: boolean}): JSX.Element => {
  const dispatch = useAppDispatch();
  const { closeDialog } = useDialogContext();
  const { detailStock } = useAppSelector((store) => store.stockInfo);

  return (<>
        <Dialog
          open={open}
          onClose={closeDialog}
        >
          <DialogTitle>
            Unfavorite Stock
          </DialogTitle>
          <>
            <DialogContent>
              Are you sure you want to unfavorite <strong>{detailStock ? detailStock.companyName : 'stock'}</strong>
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
                onClick={() => {
                  dispatch(stockInfoActions.removeFavorite(detailStock));
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

export default UnfavoriteDialog;