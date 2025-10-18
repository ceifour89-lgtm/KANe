import React, { useState } from 'react';

const HeartIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.672l1.318-1.354a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

const ClipboardIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m-8 4h4" />
    </svg>
);

const CheckIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);


export const SupportPage: React.FC = () => {
    const mobileNumber = "+250795652320";
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(mobileNumber).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="w-full bg-slate-800/60 backdrop-blur-lg rounded-xl shadow-2xl p-6 md:p-8 border border-slate-700/80">
            <div className="text-center">
                <HeartIcon className="w-16 h-16 mx-auto text-pink-400 mb-4" />
                <h1 className="text-3xl font-bold text-slate-100 mb-2">Support KANE Foundation</h1>
                <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                    Your generous support helps us continue our mission. Donations can be made via mobile money.
                </p>
            </div>
            
            <div className="max-w-md mx-auto bg-slate-900/50 border border-slate-700/80 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-slate-200 text-center mb-4">Payment Details</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Mobile Money Number</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                readOnly
                                value={mobileNumber}
                                className="flex-grow w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-slate-200 focus:outline-none"
                            />
                            <button
                                onClick={handleCopy}
                                className={`flex-shrink-0 flex items-center justify-center w-[42px] h-[42px] border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${copied ? 'bg-green-600' : 'bg-sky-600 hover:bg-sky-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-900`}
                                title="Copy number"
                            >
                               {copied ? <CheckIcon className="w-5 h-5" /> : <ClipboardIcon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Minimum Donation</label>
                        <p className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-slate-200 font-mono">
                            500 FRW
                        </p>
                    </div>
                </div>
                <p className="mt-6 text-xs text-slate-500 text-center">
                    Thank you for your contribution. Every bit helps!
                </p>
            </div>
        </div>
    );
};
