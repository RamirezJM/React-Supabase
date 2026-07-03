import supabase from "./supabase-client.js";
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Form from "./Form.jsx";

function Dashboard() {
  const [metrics, setMetrics] = useState([])


  useEffect(() => {
    fetchMetrics();
    const channel = supabase
      .channel('deal-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'sales_deals'
        },
        (payload) => {
          fetchMetrics();
        })
      .subscribe();

    // Clean up subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);




  async function fetchMetrics() {
    try {
      const { data, error } = await supabase
        .from('sales_deals')
        .select(`name, value.sum()`,)
      if (error) {
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
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={metrics}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            {/* Cuadrícula de fondo */}
            <CartesianGrid strokeDasharray="3 3" />

            {/* Eje X mapea la propiedad que tiene el nombre */}
            <XAxis dataKey="name" />

            {/* Eje Y calcula los números automáticamente */}
            <YAxis />

            {/* Cartelito flotante al pasar el mouse */}
            <Tooltip />
            <Legend />

            {/* La barra física. 'dataKey' debe coincidir con la suma/monto de tu DB */}
            <Bar dataKey="sum" fill="#58d675" name="Sellers" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <Form metrics={metrics} />
    </div>
  );
}

export default Dashboard;