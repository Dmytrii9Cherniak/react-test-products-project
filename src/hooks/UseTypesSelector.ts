import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../redux/all_reducers';


export const useTypesSelector: TypedUseSelectorHook<RootState> = useSelector;
