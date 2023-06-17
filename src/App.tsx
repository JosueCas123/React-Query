import { useEffect, useReducer, useState } from 'react'
import logo from './logo.svg'
import './App.css'

const getNumberFromApi = async ():Promise<number> => {
  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new')
  const numberString = await res.text();
 
  
  return +numberString;
}




export const App = () => {
  const [count, setCount] = useState<number>()
  const [isloading, setInsloading] = useState<boolean>(true)
  const [error, setError] = useState<string>()
 const [key, forceRefetch] = useReducer((x) => x + 1 , 0)
  
  useEffect(() => {
    setInsloading(true)
    getNumberFromApi()
      .then(num => setCount(num))
      .catch(error => setError(error.message))
  }, [key])

  useEffect(() => {
      if (count) setInsloading(false)
  }, [count])
  
  useEffect(() => {
      if (error) setInsloading(false)
  }, [error])
  

  return (
    <div className="App App-header">
      {
        isloading 
          ? (<h2>Cargando......</h2>)
          : (<h2>numero aleatorio: {count}</h2>)
      }
      {
        !isloading && error && (<h3>{error}</h3>)
      }

      <button  onClick={ forceRefetch } >
        {
          isloading ? '...' : "Nuevo numero"
        }
      </button>
    </div>
  )
}

