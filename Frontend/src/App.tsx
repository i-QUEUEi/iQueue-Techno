import { useState } from 'react'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import { Button } from '@/components/ui/button'

function App() {
  const [currentPage, setCurrentPage] = useState<'user' | 'admin'>('user')

  return (
    <>
      {currentPage === 'user' && <UserDashboard />}
      {currentPage === 'admin' && <AdminDashboard />}
      
      <div className="fixed bottom-6 right-6 z-40">
        {currentPage === 'user' ? (
          <Button onClick={() => setCurrentPage('admin')} className="bg-slate-800 hover:bg-slate-900">
            🔧 Admin Access
          </Button>
        ) : (
          <Button onClick={() => setCurrentPage('user')} className="bg-blue-600 hover:bg-blue-700">
            ← Back to Dashboard
          </Button>
        )}
      </div>
    </>
  )
}

export default App
