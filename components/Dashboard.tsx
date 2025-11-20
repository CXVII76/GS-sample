import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, CheckCircle, Lock, Server } from 'lucide-react';

const Dashboard: React.FC = () => {
  const data = [
    { name: 'Access Control', score: 85, color: '#10b981' }, // Success
    { name: 'Encryption', score: 90, color: '#10b981' },
    { name: 'Logging', score: 40, color: '#ef4444' }, // Error/Low
    { name: 'CI/CD Security', score: 20, color: '#ef4444' },
    { name: 'Vulnerability Mgmt', score: 60, color: '#f59e0b' }, // Warning
  ];

  const stats = [
    { label: 'Repo Security', value: 'BASIC', icon: Lock, color: 'text-fuchsia-400', sub: 'Branch protection needed' },
    { label: 'Automated Tests', value: '0/25', icon: CheckCircle, color: 'text-slate-400', sub: 'No tests found' },
    { label: 'Security Issues', value: 'DETECTED', icon: AlertTriangle, color: 'text-cxvii-warning', sub: 'Dependencies outdated' },
    { label: 'Target Hosts', value: 'AZURE-EAST', icon: Server, color: 'text-cxvii-accent', sub: 'App Service Plan B1' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Introduction Card */}
      <div className="bg-gradient-to-r from-blue-900/40 to-slate-800 border border-blue-800 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-white mb-2">Welcome, Operations Lead.</h3>
        <p className="text-slate-300 max-w-3xl leading-relaxed">
          This dashboard translates your RFI commitments (Attachments 3-5) into an actionable technical reality. 
          We have analyzed your "foi-tool-sample" repository requirements against the ISM PROTECTED baseline.
          Your immediate goal: Establish a <strong>Trusted Build Pipeline</strong>.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-cxvii-card border border-slate-700 rounded-lg p-5 hover:border-slate-500 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-md bg-slate-800 ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
              <div className="text-3xl font-mono font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
              <div className="text-xs text-slate-500 mt-2 border-t border-slate-700 pt-2">{stat.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-cxvii-card border border-slate-700 rounded-xl p-6">
          <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <ActivityIcon /> ISM Compliance Readiness Assessment
          </h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis type="category" dataKey="name" width={140} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-cxvii-card border border-slate-700 rounded-xl p-6 flex flex-col justify-center">
          <h4 className="text-lg font-semibold mb-4">Recommended Next Action</h4>
          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 border-dashed">
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white animate-pulse">
              1
            </div>
            <div>
              <h5 className="font-bold text-white">Secure the Repository</h5>
              <p className="text-sm text-slate-400 mt-1">
                Enable "Branch Protection" on <code>main</code> branch.
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm font-medium transition-colors w-full">
              View in Roadmap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cxvii-accent">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);

export default Dashboard;