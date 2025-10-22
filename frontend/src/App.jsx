import axios from "axios";
import { useState } from "react";

export default function App() {
    const [link,setLink]=useState('')
    const [error,setError]=useState(null)
    const [response,setResponse]=useState('')
    const [gmail,setGmail] = useState('')

    const getSummary =async(e)=>{
        e.preventDefault()
        setResponse('')
        try{
            const res=await axios.post('https://videra-1.onrender.com',{link})
            setResponse(res.data)
        }catch(err){
            setError(err)
        }
        
        
    }
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen bg-linear-to-br from-purple-900 via-indigo-900 to-black text-gray-200">
        <main className="flex flex-col items-center justify-center space-y-10 w-full max-w-xl p-8 rounded-2xl bg-gray-900/40 backdrop-blur-sm shadow-2xl shadow-purple-900/50">
          <h1 className="text-5xl font-extrabold text-gray-100 text-center tracking-tight">
            Videra
          </h1>
          <p className="text-center font-semibold">Get instant summary on your Gmail with Videra. Just paste the link to get Started!</p>
          <input
            type="gmail"
            placeholder="Enter your gmail"
            value={gmail}
            onChange={e=>setGmail(e.target.value)}
            className="p-4 w-full text-lg bg-gray-800/70 text-gray-200 border border-gray-700 rounded-xl transition duration-300
           placeholder:text-gray-500
           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          <input
            type="text"
            placeholder="Paste YouTube Link Here"
            value={link}
            onChange={e=>setLink(e.target.value)}
            className="p-4 w-full text-lg bg-gray-800/70 text-gray-200 border border-gray-700 rounded-xl transition duration-300
           placeholder:text-gray-500
           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
            {response && (
                <p className="text-blue-400">{response}</p>
            )}
          <button
          onClick={getSummary}
            className="text-lg cursor-pointer font-semibold py-3 px-8 w-60 rounded-xl transition duration-300 ease-in-out
           bg-linear-to-r from-purple-600 to-fuchsia-600 text-white
           hover:from-purple-500 hover:to-fuchsia-500 hover:scale-[1.03]
           hover:shadow-xl hover:shadow-purple-700/60"
          >
            Get Summary
          </button>
          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}
        </main>
      </div>
    </>
  );
}
