import { Dispatch, SetStateAction } from 'react';

interface SnackProps {
    label: string
    action: SnackAction,
    snackVisible: boolean;
    setSnackVisible: Dispatch<SetStateAction<boolean>>
}

type SnackAction = () => void;

export default SnackProps;