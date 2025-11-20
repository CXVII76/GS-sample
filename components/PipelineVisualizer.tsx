import React from 'react';
import { GitCommit, Package, Shield, Cloud, Server, FileCode } from 'lucide-react';

const PipelineVisualizer: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg mb-6 flex justify-between items-center">
        <div>
            <h3 className="text-white font-bold">Pipeline HMI: PROTECTED_FLOW_V1</h3>
            <p className="text-slate-400 text-sm">Real-time visualization of the target architecture</p>
        </div>
        <div className="flex gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-green-400">SYSTEM ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                <span className="text-slate-400">IDLE</span>
            </div>
        </div>
      </div>

      <div className="flex-1 bg-[#0a0e17] rounded-xl border border-slate-700 p-8 relative overflow-auto flex items-center justify-center">
        
        {/* SVG Background Grid */}
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

        <div className="flex items-center gap-8 relative z-10">
            {/* Stage 1: Source */}
            <div className="flex flex-col items-center gap-4 group">
                <div className="w-24 h-24 bg-slate-900 border-2 border-slate-600 rounded-xl flex items-center justify-center relative group-hover:border-blue-500 transition-colors shadow-lg shadow-black/50">
                    <GitCommit size={32} className="text-slate-400 group-hover:text-blue-500" />
                    <div className="absolute -bottom-3 bg-slate-800 px-2 text-[10px] border border-slate-600 rounded text-slate-300">SOURCE</div>
                </div>
                <div className="text-center">
                    <div className="text-sm font-mono font-bold text-slate-300">GitHub</div>
                    <div className="text-xs text-slate-500">Push / PR</div>
                </div>
            </div>

            {/* Arrow */}
            <ConnectionLine />

            {/* Stage 2: Build */}
            <div className="flex flex-col items-center gap-4 group">
                <div className="w-24 h-24 bg-slate-900 border-2 border-slate-600 rounded-xl flex items-center justify-center relative group-hover:border-yellow-500 transition-colors shadow-lg shadow-black/50">
                    <Package size={32} className="text-slate-400 group-hover:text-yellow-500" />
                    <div className="absolute -bottom-3 bg-slate-800 px-2 text-[10px] border border-slate-600 rounded text-slate-300">BUILD</div>
                </div>
                <div className="text-center">
                    <div className="text-sm font-mono font-bold text-slate-300">Runner</div>
                    <div className="text-xs text-slate-500">npm install/build</div>
                </div>
            </div>

            {/* Arrow */}
            <ConnectionLine />

            {/* Stage 3: Security Scan (Parallel) */}
            <div className="flex flex-col gap-4">
                {/* Top: CodeQL */}
                <div className="flex items-center gap-4">
                     <div className="w-32 h-16 bg-slate-900 border-2 border-slate-600 rounded-lg flex items-center justify-center gap-2 relative group hover:border-red-500 transition-colors">
                        <Shield size={20} className="text-red-500" />
                        <span className="text-xs font-bold text-slate-300">CodeQL (SAST)</span>
                     </div>
                </div>
                {/* Bottom: Trivy */}
                <div className="flex items-center gap-4">
                     <div className="w-32 h-16 bg-slate-900 border-2 border-slate-600 rounded-lg flex items-center justify-center gap-2 relative group hover:border-orange-500 transition-colors">
                        <FileCode size={20} className="text-orange-500" />
                        <span className="text-xs font-bold text-slate-300">Trivy (Dep)</span>
                     </div>
                </div>
            </div>

            {/* Arrow */}
            <ConnectionLine />

            {/* Stage 4: Deploy */}
            <div className="flex flex-col items-center gap-4 group">
                <div className="w-24 h-24 bg-slate-900 border-2 border-slate-600 rounded-xl flex items-center justify-center relative group-hover:border-green-500 transition-colors shadow-lg shadow-black/50">
                    <Cloud size={32} className="text-slate-400 group-hover:text-green-500" />
                    <div className="absolute -bottom-3 bg-slate-800 px-2 text-[10px] border border-slate-600 rounded text-slate-300">DEPLOY</div>
                </div>
                <div className="text-center">
                    <div className="text-sm font-mono font-bold text-slate-300">Azure</div>
                    <div className="text-xs text-slate-500">App Service</div>
                </div>
            </div>
            
            {/* Arrow */}
            <ConnectionLine />

            {/* Stage 5: Production */}
            <div className="flex flex-col items-center gap-4 group">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-600 rounded-full flex items-center justify-center relative group-hover:border-cxvii-accent transition-colors shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                    <Server size={32} className="text-slate-400 group-hover:text-cxvii-accent" />
                </div>
                <div className="text-center">
                    <div className="text-sm font-mono font-bold text-white">PROD</div>
                    <div className="text-xs text-green-400">Running</div>
                </div>
            </div>

        </div>

        {/* Legend overlay */}
        <div className="absolute bottom-4 right-4 bg-slate-900/90 p-3 border border-slate-700 rounded text-[10px] font-mono">
            <div className="text-slate-400 mb-1">PIPELINE STATUS</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <span className="text-blue-400">● Source</span>
                <span className="text-yellow-400">● Build</span>
                <span className="text-red-400">● Scan</span>
                <span className="text-green-400">● Deploy</span>
            </div>
        </div>
      </div>
    </div>
  );
};

const ConnectionLine = () => (
    <div className="h-0.5 w-12 bg-slate-700 relative">
        <div className="absolute -right-1 -top-1 w-2 h-2 border-t-2 border-r-2 border-slate-700 rotate-45"></div>
    </div>
);

export default PipelineVisualizer;