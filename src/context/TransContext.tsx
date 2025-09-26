import React, { ReactNode, createContext, useContext, useState } from "react";
import { TransType } from "../types/types";

type ContextType = {
    trans : TransType[];
    setTrans: React.Dispatch<React.SetStateAction<TransType[]>>;
}
const TransContext = createContext<ContextType | undefined>(undefined)

export const TransProvider = ({children}:{children: ReactNode}) => {
    const [trans , setTrans] = useState<TransType[]>([])

    return (
        <TransContext.Provider value={{trans , setTrans}}>
            {children}
        </TransContext.Provider>
    )
}

export const useTransContext = ()=>{
    const context =useContext(TransContext);
    if(!context) throw new Error('useTransContext must be used within a provider!')

    return context;
}