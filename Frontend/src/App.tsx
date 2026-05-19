import { useState } from 'react'
import UserDashboard from './pages/UserDashboard'
import AdminLayout from './pages/admin/AdminLayout'
import { Button } from '@/components/ui/button'

function App() {
  const [isAdminView, setIsAdminView] = useState<boolean>(false)

  return (
    <>
      {!isAdminView && (
        <>
          <UserDashboard />
          <div className="fixed bottom-6 right-6 z-40">
            <Button onClick={() => setIsAdminView(true)} className="bg-slate-800 hover:bg-slate-900">
              🔧 Admin Access
            </Button>
          </div>
        </>
      )}
      {isAdminView && <AdminLayout />}
    </>
  )
}

export default App
