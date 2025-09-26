import  { useState } from 'react'
import { useTransContext } from '../context/TransContext'
import { format } from 'date-fns';
import { TransType } from '../types/types';

type Props = {}

export default function Trans({}: Props) {
    const {trans , setTrans} = useTransContext();
    const [tranEdit, setTransEdit] = useState<TransType>({
        transType: 'expense',
        category: '',
        amount: 0,
        date:new Date,
        description: '',
        editMode:true
      })

    function deleteTran(tranIndex:number){
       setTrans((prevTrans)=>prevTrans.filter((_,index)=> index !== tranIndex)) 
    }
    function editTran(index:number){
        setTrans((prev)=> {
            const updated = [...prev]
            updated[index] ={
                ...updated[index],
                editMode : false
            }
            return updated;
        })
        setTransEdit(trans[index])
    }
    function finishEditTran(index:number){
        setTrans((prev)=>{
            const updated = [...prev]
            updated[index] = tranEdit
            return updated;
        })
    }
  
    return (
    <div className='bg-slate-300 w-3/4 flex flex-col items-center p-2 gap-1'>
        <h1 className=''>Transactions</h1>
        {trans.length === 0 ? <p className='text-2xl font-mono'>No transactions recorded.</p>
        : ''}
        {trans.map((ele, index)=>{
            let bgc:string , minos:string='-' 
            if(ele.transType === 'expense') bgc= '#CD5C5C'
            else {bgc = '#90EE90'
                minos=''
            }
            return (
                <>{ele.editMode ? <div className='flex justify-between w-full p-1' style={{backgroundColor: bgc}}>
                <div className='flex flex-col justify-between ml-3'>
                    <h3 className='text-2xl'>{ele.description}</h3>
                    <p>{ele.category} - {format(ele.date, 'yyyy-mm-dd') }</p>
                </div>
                <div className='flex gap-5 p-2 items-center'>
                    <p className='text-2xl'>{minos}{ele.amount}₪</p>
                    <button onClick={()=>editTran(index)} className='border-2 bg-blue-700 border-black  p-3 rounded-md'>Edit</button>
                    <button onClick={()=>deleteTran(index)} className='border-2 border-black bg-red-600  p-3 rounded-md'>Delete</button>
                </div>
            </div>
            :
            <div className='flex justify-between w-full p-1' style={{backgroundColor: bgc}}>
                <div className='grid grid-cols-2 ml-3 gap-2'>
                    <input type="text" className='border-2 border-black rounded-2xl p-2'
                     value={tranEdit.description} onChange={(e)=>{setTransEdit((prevTrans)=>({...prevTrans, description: e.target.value}))}}/>
                    <input type="text" className='border-2 border-black rounded-2xl p-2' 
                    value={tranEdit.category} onChange={(e)=>{setTransEdit((prevTrans)=>({...prevTrans, category: e.target.value}))}}/>
                    <input type="date" className='border-2 border-black rounded-2xl p-2'
                    value={tranEdit.date.toISOString().split('T')[0]}
                    onChange={(e)=>{setTransEdit((prevTrans)=>({...prevTrans, date:new Date(e.target.value) }))}} />
                </div>
                <div className='flex gap-5 p-2 items-center'>
                    <input type='number' className='text-2xl border-2 border-black rounded-2xl p-2' 
                    value={ tranEdit.amount}
                    onChange={(e)=>{setTransEdit((prevTrans)=>({...prevTrans, amount:parseInt( e.target.value)}))}}/>
                    <button onClick={()=>finishEditTran(index)} className='border-2 bg-blue-700 border-black  p-3 rounded-md'>Edit</button>
                    <button onClick={()=>deleteTran(index)} className='border-2 border-black bg-red-600  p-3 rounded-md'>Delete</button>
                </div>
            </div>
        }</>
            )
        })}
    </div>
  )
}