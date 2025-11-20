import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Map, Activity, MessageSquareText, ShieldCheck } from 'lucide-react';

interface LayoutProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, setView, children }) => {
  const navItems = [
    { id: ViewState.DASHBOARD, label: 'Command Center', icon: LayoutDashboard },
    { id: ViewState.ROADMAP, label: 'Implementation Plan', icon: Map },
    { id: ViewState.PIPELINE_VISUAL, label: 'Pipeline HMI', icon: Activity },
    { id: ViewState.ASSISTANT, label: 'AI Consultant', icon: MessageSquareText },
  ];

  return (
    <div className="flex h-screen bg-cxvii-dark text-cxvii-text font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-cxvii-card border-r border-slate-700 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-700">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
            CX
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">CXVII Tech</h1>
            <span className="text-xs text-cxvii-muted font-mono">SECURE OPS</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-cxvii-accent/20 text-cxvii-accent border border-cxvii-accent/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="bg-slate-800/50 rounded p-3 border border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={16} className="text-cxvii-success" />
              <span className="text-xs font-bold text-slate-300">COMPLIANCE TARGET</span>
            </div>
            <div className="text-xs text-slate-400">ISM PROTECTED (Oct 2025)</div>
            <div className="mt-2 w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cxvii-success h-full w-[35%]"></div>
            </div>
            <div className="flex justify-between text-[10px] mt-1 text-slate-500">
              <span>Current</span>
              <span>Goal</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-16 border-b border-slate-700 bg-cxvii-dark/50 backdrop-blur flex items-center px-8 justify-between shrink-0">
          <h2 className="text-xl font-semibold text-white">
            {navItems.find(i => i.id === currentView)?.label}
          </h2>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono rounded">
              ENV: RESTRICTED
            </span>
            <div className="h-8 w-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs">
              OP
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8 relative z-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;