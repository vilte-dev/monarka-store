import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import PageLoader from '@/components/ui/PageLoader.jsx'
import AuthProvider from '@/features/auth/AuthProvider.jsx'
import ProtectedRoute from '@/features/auth/ProtectedRoute.jsx'
import CartDrawer from '@/features/cart/CartDrawer.jsx'
import CartProvider from '@/features/cart/CartProvider.jsx'
import HomePage from '@/pages/home/HomePage.jsx'

// Login y Admin se cargan bajo demanda: los clientes de la tienda no descargan el panel.
const LoginPage = lazy(() => import('@/pages/login/LoginPage.jsx'))
const AdminPage = lazy(() => import('@/pages/admin/AdminPage.jsx'))

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
        <CartDrawer />
      </CartProvider>
    </AuthProvider>
  )
}
