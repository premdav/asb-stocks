import { createContext, useContext } from 'react';
import { UseDialogHookReturn } from './DialogProvider';

export const DialogContext = createContext<UseDialogHookReturn | undefined>(undefined);

export const useDialogContext = (): UseDialogHookReturn => {
  const context = useContext(DialogContext);
    
  // Error 
  if (context === undefined) {
    throw Error(
      'This component must be wrapped with <DialogProvider />, '
          + 'otherwise it will not function correctly.',
    );
  }
  
  return context;
};

export default DialogContext;
