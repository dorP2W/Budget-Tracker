import React, { useEffect, useState } from 'react'
import { useTransContext } from '../context/TransContext';

type Props = {}

export default function Summary({}: Props) {
    const { trans } = useTransContext();

    const [finalAmount, setFinalAmount] = useState<number>(0)
    useEffect(()=>{
        let amountHelp = 0
        for(let i=0; i<trans.length;i++){
            if(trans[i].transType === 'expense'){
                amountHelp -= trans[i].amount
            }else{
                amountHelp += trans[i].amount
            }
        }
        setFinalAmount(amountHelp)
        
    },[trans])

  return (
    <div className='flex flex-col w-3/4 bg-slate-300 p-3'>
        <h1 className='text-2xl'>Summary</h1>
        <p className='text-2xl'>Final Balance: {finalAmount}</p>
    </div>
  )
}