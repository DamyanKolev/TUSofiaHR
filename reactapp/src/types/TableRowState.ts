import { Dispatch, SetStateAction } from "react";

export type TableRowState<T> = {
    selectedRow: T;
    setSelectedRow: Dispatch<SetStateAction<T>>;
}