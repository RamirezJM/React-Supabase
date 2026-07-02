import supabase from "./supabase-client.js";
import { useEffect, useState } from 'react';

function Dashboard() {
  const [metrics, setMetrics] = useState([])


  useEffect(() => {
    fetchMetrics();
  }, []);
  /** 
	Challenge: 
* 1) Import the supabase client.
* 2) Wrap the Supabase client code in a 'fetchMetrics' asynchronous function.
* 3) Import useEffect and add this hook at the top of the Dashboard component. 
* 4) Call the 'fetchMetrics' function as the effect in this hook and have it run
		 only once after inital render.
* 5) Log the response to the console and save (Cmd/Ctrl + s).
     Hint: What makes useEffect only run on 1st render? Google is your friend.
*/

  async function fetchMetrics() {
    try {
      const {data, error} = await supabase
      .from('sales_deals')
      .select(`name, value.sum()`,)
      if(error){
        throw error;
      }
      console.log(data)
      setMetrics(data)
    } catch (error) {
      console.error('Fetching error:', error)
      
    }








    
// CONSULTA PARA USUARIO CON MAYOR VALOR
    // const { data, error } = 
   /*  const response = await supabase
      .from('sales_deals')
      .select(`name, value`,)
      .order('value', { ascending: false })
      .limit(1) */

//CONSULTA PARA TODOS LOS USUARIOS

/* const { data, error } */ 
/* const response = await supabase
  .from('sales_deals')
  .select(`name, value.sum()`,)
    console.log(response);
  }
 */
  }

  return (
    <div className="dashboard-wrapper">
      <div className="chart-container">
        <h2>Total Sales This Quarter ($)</h2>
      </div>
    </div>
  );
}

export default Dashboard;