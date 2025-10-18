import React from 'react';

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

export const SettingsPage: React.FC = () => {
    return (
        <div className="w-full bg-slate-800/60 backdrop-blur-lg rounded-xl shadow-2xl p-6 md:p-8 border border-slate-700/80">
            <h1 className="text-3xl font-bold text-slate-100 mb-8">Settings</h1>

            <SettingsCard title="About KANE Music">
                <p>
                    A sleek and user-friendly React application that allows you to upload an audio file from your local machine and play it directly in the browser. The audio is processed locally for privacy and is not uploaded to any server.
                </p>
            </SettingsCard>

            <SettingsCard title="Appearance">
                <div className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-700/80 rounded-lg">
                    <span className="font-medium text-slate-300">Theme</span>
                    <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 text-sm rounded-md bg-sky-500/20 text-sky-300 ring-1 ring-inset ring-sky-500/30">Dark</span>
                        <span className="px-3 py-1 text-sm rounded-md bg-slate-800/60 text-slate-500 cursor-not-allowed border border-dashed border-slate-600" title="Coming soon!">Light</span>
                    </div>
                </div>
            </SettingsCard>
            
            <SettingsCard title="Privacy">
                 <p>
                    All audio processing happens entirely within your browser. Your files are never uploaded to any external servers, ensuring your data remains private and secure.
                </p>
            </SettingsCard>

        </div>
    );
};