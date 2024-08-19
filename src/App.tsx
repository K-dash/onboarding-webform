import React, { useState } from 'react'

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          Vite + React + TypeScript + Tailwind
        </h1>
        <p className="mb-4">This is a simple counter to test our setup.</p>
        <p className="text-2xl mb-4">Count: {count}</p>
        <button
          onClick={() => setCount(prevCount => prevCount + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Increment
        </button>
      </div>
    </div>
  )
}

export default App
