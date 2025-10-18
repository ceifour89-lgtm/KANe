import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ForgotPasswordModal } from './ForgotPasswordModal';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { login, signup } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!isLogin && password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await signup(email, password);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300">
                <div className="w-full max-w-sm">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-2 tracking-tight">
                            KANE Music
                        </h1>
                        <p className="text-lg text-slate-400">
                            Your personal in-browser music player.
                        </p>
                    </div>

                    <div className="w-full bg-slate-800/60 backdrop-blur-lg rounded-xl shadow-2xl p-6 md:p-8 border border-slate-700/80">
                        <h2 className="text-2xl font-bold text-slate-100 text-center mb-6">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium text-slate-300">Password</label>
                                    {isLogin && (
                                        <button
                                            type="button"
                                            onClick={() => setIsForgotPasswordModalOpen(true)}
                                            className="text-xs font-medium text-sky-400 hover:text-sky-300 focus:outline-none focus:underline"
                                        >
                                            Forgot Password?
                                        </button>
                                    )}
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete={isLogin ? "current-password" : "new-password"}
                                    required
                                    minLength={6}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                    placeholder="••••••••"
                                />
                            </div>
                            {!isLogin && (
                                <div>
                                    <label htmlFor="confirmPassword"
                                           className="block text-sm font-medium text-slate-300 mb-1">Confirm
                                        Password</label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        minLength={6}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                        placeholder="••••••••"
                                    />
                                </div>
                            )}
                            {error && <p className="text-sm text-red-400 text-center">{error}</p>}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                                </button>
                            </div>
                        </form>
                        <p className="mt-6 text-center text-sm text-slate-400">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button onClick={() => {
                                setIsLogin(!isLogin);
                                setError(null);
                            }}
                                    className="font-medium text-sky-400 hover:text-sky-300 focus:outline-none focus:underline">
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <ForgotPasswordModal
                isOpen={isForgotPasswordModalOpen}
                onClose={() => setIsForgotPasswordModalOpen(false)}
            />
        </>
    );
};

export default AuthPage;