import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Dashboard } from './pages/Dashboard';
import { MyUrls } from './pages/MyUrls';
import { Analytics } from './pages/Analytics';
import PixelBlast from './components/backgrounds/PixelBlast';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    {/* Global PixelBlast Background */}
                    <div className="global-bg">
                        <PixelBlast
                            variant="square"
                            pixelSize={4}
                            color="#B19EEF"
                            patternScale={2}
                            patternDensity={1.0}
                            pixelSizeJitter={0.3}
                            enableRipples
                            rippleSpeed={0.3}
                            rippleThickness={0.1}
                            rippleIntensityScale={1.2}
                            speed={0.4}
                            edgeFade={0.15}
                            transparent
                        />
                    </div>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/my-urls"
                            element={
                                <ProtectedRoute>
                                    <MyUrls />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/analytics"
                            element={
                                <ProtectedRoute>
                                    <Analytics />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 3000,
                            style: {
                                background: 'var(--color-bg-secondary)',
                                color: 'var(--color-text-primary)',
                                border: '1px solid var(--color-glass-border)',
                                borderRadius: 'var(--radius-lg)',
                                backdropFilter: 'blur(10px)',
                            },
                            success: {
                                iconTheme: {
                                    primary: 'var(--color-success)',
                                    secondary: 'white',
                                },
                            },
                            error: {
                                iconTheme: {
                                    primary: 'var(--color-error)',
                                    secondary: 'white',
                                },
                            },
                        }}
                    />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
