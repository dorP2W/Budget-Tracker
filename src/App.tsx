

import './App.css'
import AddTran from './components/AddTran'
import Summary from './components/Summary'
import Trans from './components/Trans'
import { TransProvider } from './context/TransContext'

function App() {


  return (
    <div className='flex flex-col items-center  gap-5 p-5 m-5'>
      <h1 className='text-2xl font-mono text-amber-100'>Personal Budget Tracker</h1>
      <TransProvider>
        <AddTran />
        <Trans />
        <Summary />
      </TransProvider>
    </div>
  )
}

export default App
