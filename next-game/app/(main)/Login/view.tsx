"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Gamepad2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function GamingLogin() {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (!email || !password) {
            setErrorMsg('Please fill in all fields');
            return;
        }
        if (password.length < 6) {
            setErrorMsg('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        setErrorMsg('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            router.push('/');
            
        } catch (err) {
            setErrorMsg(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center p-4 relative overflow-hidden">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
        `}</style>

            <div
                className="absolute inset-0 opacity-50"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,215,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,215,0,0.1) 1px, transparent 1px)
            `,
                    backgroundSize: '50px 50px',
                    transform: 'perspective(500px) rotateX(60deg) translateZ(-100px)',
                }}
            />

            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ffd700]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff8888]/20 rounded-full blur-3xl" />

            <motion.div
                className="relative z-10 w-full max-w-md"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring' }}
            >
                <div className="bg-[rgba(10,10,20,0.9)] backdrop-blur-xl rounded-3xl border-2 border-[rgba(255,215,0,0.4)] shadow-[0_0_50px_rgba(255,215,0,0.3)] p-8">
                    <div className="mb-8 text-center">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <Gamepad2 className="w-10 h-10 text-[#ffd700] drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]" />
                            <span
                                style={{ fontFamily: 'Orbitron' }}
                                className="text-2xl font-bold bg-linear-to-r from-[#ffd700] to-[#ff8888] bg-clip-text text-transparent"
                            >
                                GameStore
                            </span>
                        </Link>
                    </div>

                    <h1
                        style={{ fontFamily: 'Orbitron' }}
                        className="text-4xl font-black text-white mb-2 text-center bg-linear-to-r from-[#ffd700] to-[#ff8888] bg-clip-text"
                    >
                        WELCOME BACK!
                    </h1>
                    <p
                        style={{ fontFamily: 'Orbitron' }}
                        className="text-gray-400 text-center mb-8"
                    >
                        Continue your gaming adventure
                    </p>

                    <div className="space-y-6">
                        <div>
                            <label
                                style={{ fontFamily: 'Orbitron' }}
                                className="text-[#ffd700] text-sm mb-2 block font-semibold"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ffd700]" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrorMsg('');
                                    }}
                                    placeholder="gamer@example.com"
                                    style={{ fontFamily: 'Orbitron' }}
                                    className="w-full bg-[rgba(0,0,0,0.6)] border-2 border-[rgba(255,215,0,0.4)] rounded-xl py-4 px-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#ffd700] focus:ring-2 focus:ring-[rgba(255,215,0,0.5)] transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                style={{ fontFamily: 'Orbitron' }}
                                className="text-[#ffd700] text-sm mb-2 block font-semibold"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ffd700]" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrorMsg('');
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') handleSubmit();
                                    }}
                                    placeholder="••••••••"
                                    style={{ fontFamily: 'Orbitron' }}
                                    className={`w-full bg-[rgba(0,0,0,0.6)] border-2 ${errorMsg ? 'border-red-500' : 'border-[rgba(255,215,0,0.4)]'
                                        } rounded-xl py-4 px-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#ffd700] focus:ring-2 focus:ring-[rgba(255,215,0,0.5)] transition-all`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#ffd700]"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errorMsg && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ fontFamily: 'Orbitron' }}
                                    className="text-[#ff8888] text-sm mt-2"
                                >
                                    {errorMsg}
                                </motion.p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-[#ffd700] bg-[rgba(0,0,0,0.6)] checked:bg-[#ffd700]"
                                />
                                <span
                                    style={{ fontFamily: 'Orbitron' }}
                                    className="text-gray-400 text-sm"
                                >
                                    Remember me
                                </span>
                            </label>
                            <button
                                type="button"
                                style={{ fontFamily: 'Orbitron' }}
                                className="text-gray-400 text-sm hover:text-[#ff8888] transition-colors"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            style={{ fontFamily: 'Orbitron' }}
                            className="w-full bg-linear-to-r from-[#ffd700] to-[#ff8888] text-white font-bold py-4 rounded-xl shadow-[0_0_30px_rgba(255,215,0,0.6)] text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'LOADING...' : 'START PLAYING'}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[rgba(255,215,0,0.3)]" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span
                                    style={{ fontFamily: 'Orbitron' }}
                                    className="px-4 bg-[rgba(0,0,0,0.4)] text-gray-400"
                                >
                                    OR
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            style={{ fontFamily: 'Orbitron' }}
                            className="w-full bg-[rgba(255,255,255,0.1)] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3 border-2 border-[rgba(255,215,0,0.4)] hover:bg-[rgba(255,255,255,0.15)] transition-all"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </button>

                        <p
                            style={{ fontFamily: 'Orbitron' }}
                            className="text-center text-gray-400 text-sm"
                        >
                            Don't have an account?{' '}
                            <Link
                                href="/Register"
                                className="text-[#ffd700] hover:text-[#ff8888] font-semibold transition-colors"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}