import React, { useState } from 'react';
import { DialogContext } from './dialogContext';

export interface UseDialogHookReturn {
  dialogType: 'unfavorite' | 'addStock' | 'deleteStock' | '',
  openDialog: (d: UseDialogHookReturn['dialogType']) => void, 
  closeDialog: () => void,
}

const useDialog = (): UseDialogHookReturn => {

  const [dialogType, setDialogType] = 
    useState<UseDialogHookReturn['dialogType']>('');
  const openDialog = (
    d: UseDialogHookReturn['dialogType'],
  ) => { 
    setDialogType(d);
  };
  const closeDialog = () => {
    setDialogType('');
  };

  return { 
    dialogType, 
    openDialog, 
    closeDialog } as const;
};

const DialogProvider = ({ children }: React.PropsWithChildren<{}>): JSX.Element => {
  const { dialogType, openDialog, closeDialog } = useDialog();

  return (
    <DialogContext.Provider value={{ 
      dialogType, openDialog, closeDialog, 
    }}>
        {children}
    </DialogContext.Provider>
  );

};

export default DialogProvider;