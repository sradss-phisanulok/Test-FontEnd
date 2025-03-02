import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import config from './config'
import Swal from 'sweetalert2'
import axios from 'axios'

function App() {
  const [data,setData] = useState([])


  useEffect(()=>{
    loadData()
  },[])

  const loadData = async () => {
    try {
      const res = await axios.get(config.api_path + "/user/list");
      // เก็บข้อมูลจาก res.data.results ลงใน state
      if (res.data && res.data.results) {
        setData(res.data.results);
      } else {
        setData([]); // ถ้าไม่มีข้อมูลให้ set ค่าว่าง
      }
      console.log(res);
    } catch (err) {
      Swal.fire({
        title: "error",
        text: err.message,
        icon: "error",
      });
    }
  };
  

  return (
    <>
    <h1 className='text-xl font-bold text-red-500'>Hello Tester</h1>
    {/* แสดงตารางข้อมูล */}
    <div className="container mx-auto p-4">
        <h2 className="text-lg font-semibold mb-2">User List</h2>
        {data.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Created At</th>
                <th className="border p-2">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="border p-2">{item.id}</td>
                  <td className="border p-2">{item.firstName}</td>
                  <td className="border p-2">{item.lastName}</td>
                  <td className="border p-2">
                    {(item.createdAt)}
                  </td>
                  <td className="border p-2">
                    {(item.updatedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No data available</p>
        )}
      </div>
    </>
  )
}

export default App
