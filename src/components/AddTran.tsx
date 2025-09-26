import  { useState } from 'react'
import { useTransContext } from '../context/TransContext'
import { TransType } from '../types/types';

type Props = {}

export default function AddTran({}: Props) {

  const { setTrans} = useTransContext();
  const [transState, setTransState] = useState<TransType>({
    transType: 'expense',
    category: '',
    amount: 0,
    date:new Date,
    description: '',
    editMode: true
  })

  function addTrans(){
    if(transState.category === ''){
      const input = document.getElementById('categoryInput') as HTMLInputElement;
      input.value = "Please enter category."
      input.style.color = "red";
      return; 
    }else if(transState.description === ''){
      const input = document.getElementById('desInput') as HTMLInputElement;
      input.value = "Please enter description."
      input.style.color = "red";
      return;
    }

    setTrans((prevTrans) => [...prevTrans, transState]);
  }

  return (
    <div className='flex flex-col shadow-lg border-2 rounded-2xl  border-slate-400 p-5 gap-5 bg-slate-300'>
      <div>
        <h4>Type</h4>
        <select value={transState.transType} 
        onChange={(e)=>{setTransState((prevTrans)=>({...prevTrans, transType: e.target.value}))}} 
        id='tansType' className='shadow-md p-1 border-2 w-80 text-2xl ' >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <div>
        <h4>Category</h4>
        <input id='categoryInput'
         onChange={(e)=>{setTransState((prevTrans)=>({...prevTrans, category: e.target.value}))}} 
         type="text" className='shadow-md p-1 border-2 w-80 text-2xl'/>
      </div>
      <div>
        <h4>Description</h4>
        <input value={transState.description} id='desInput'
         onChange={(e)=>{setTransState((prevTrans)=>({...prevTrans, description: e.target.value}))}} 
         type="text" className='shadow-md p-1 border-2 w-80 text-2xl'/>
      </div>
      <div>
        <h4>Amount</h4>
        <input 
         onChange={(e)=>{setTransState((prevTrans)=>({...prevTrans, amount: parseInt(e.target.value)}))}} 
         type="number" className='shadow-md p-1 border-2 w-80 text-2xl'/>
      </div>
      <div>
        <h4>Date</h4>
        <input 
         onChange={(e)=>{setTransState((prevTrans)=>({...prevTrans, date:new Date(e.target.value) }))}} 
         type="date" className='shadow-md p-1 border-2 w-80 text-2xl'/>
      </div>

      <button onClick={addTrans} 
      className='border-2 bg-blue-700 text-white p-3 rounded-md w-2/3'>Add Transaction</button>
    </div>
  )
}