import React, { useState } from 'react';

const PaperAirplaneIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);


export const InviteFriendsPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setStatusMessage(`Invitation sent to ${email}! (Demo)`);
            setEmail('');
            setTimeout(() => setStatusMessage(''), 3000);
        }
    };

    return (
        <div className="w-full bg-slate-800/60 backdrop-blur-lg rounded-xl shadow-2xl p-6 md:p-8 border border-slate-700/80">
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Invite Friends</h1>
            <p className="text-slate-400 mb-8">Share KANE Music with your friends.</p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                    <label htmlFor="invite-email" className="sr-only">Email address</label>
                    <input
                        id="invite-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-grow w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="friend@example.com"
                    />
                    <button
                        type="submit"
                        className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-800"
                    >
                         <PaperAirplaneIcon className="w-5 h-5 mr-2 -ml-1 transform -rotate-45" />
                        Send Invite
                    </button>
                </div>
                 {statusMessage && <p className="mt-4 text-center text-sm text-green-400">{statusMessage}</p>}
            </form>
        </div>
    );
};