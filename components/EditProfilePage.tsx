import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const SettingsCard: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-100 border-b border-slate-700 pb-3 mb-4">
            {title}
        </h2>
        <div className="text-slate-400 leading-relaxed">
            {children}
        </div>
    </div>
);

export const EditProfilePage: React.FC = () => {
    const { user } = useAuth();
    const [email, setEmail] = useState(user?.email || '');
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMessage('Profile updated successfully! (Demo)');
        setTimeout(() => setStatusMessage(''), 3000);
    };

    return (
        <div className="w-full bg-slate-800/60 backdrop-blur-lg rounded-xl shadow-2xl p-6 md:p-8 border border-slate-700/80">
            <h1 className="text-3xl font-bold text-slate-100 mb-8">Edit My Profile</h1>

            <form onSubmit={handleSubmit}>
                <SettingsCard title="Personal Information">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full max-w-md px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                placeholder="you@example.com"
                                disabled
                            />
                             <p className="text-xs text-slate-500 mt-1">Changing email is not supported in this demo.</p>
                        </div>
                         <div>
                            <label htmlFor="current-password"
                                   className="block text-sm font-medium text-slate-300 mb-1">Current Password</label>
                            <input
                                id="current-password"
                                type="password"
                                className="w-full max-w-md px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label htmlFor="new-password"
                                   className="block text-sm font-medium text-slate-300 mb-1">New Password</label>
                            <input
                                id="new-password"
                                type="password"
                                className="w-full max-w-md px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                </SettingsCard>

                <div className="flex items-center justify-end space-x-4">
                    {statusMessage && <p className="text-sm text-green-400">{statusMessage}</p>}
                    <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-800">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};