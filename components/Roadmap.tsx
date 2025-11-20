import React, { useState } from 'react';
import { INITIAL_STEPS, Step } from '../types';
import { ChevronRight, Check, Clock, Circle, ArrowRight } from 'lucide-react';

const Roadmap: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS);
  const [selectedStep, setSelectedStep] = useState<Step | null>(INITIAL_STEPS[0]);

  const getComplexityColor = (c: string) => {
    switch (c) {
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  return (
    <div className="flex h-full gap-6">
      {/* Steps List */}
      <div className="w-1/3 overflow-y-auto pr-2 space-y-3">
        <h3 className="text-lg font-semibold mb-4 px-1">Implementation Sequence</h3>
        {steps.map((step, index) => (
          <div 
            key={step.id}
            onClick={() => setSelectedStep(step)}
            className={`p-4 rounded-lg border cursor-pointer transition-all group relative overflow-hidden ${
              selectedStep?.id === step.id 
                ? 'bg-slate-800 border-blue-500 shadow-md' 
                : 'bg-cxvii-card border-slate-700 hover:border-slate-500'
            }`}
          >
             {/* Connecting Line for Timeline Effect */}
             {index !== steps.length - 1 && (
                <div className="absolute left-6 bottom-0 top-14 w-px bg-slate-700 z-0"></div>
             )}

            <div className="flex items-start gap-3 relative z-10">
              <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center border ${
                step.status === 'Complete' ? 'bg-green-500 border-green-500 text-white' : 
                step.status === 'In Progress' ? 'bg-blue-500/20 border-blue-500 text-blue-500' :
                'bg-slate-800 border-slate-600 text-slate-500'
              }`}>
                {step.status === 'Complete' ? <Check size={14} /> : 
                 step.status === 'In Progress' ? <Clock size={14} /> : 
                 <span className="text-xs font-mono">{index + 1}</span>}
              </div>
              <div>
                <h4 className={`text-sm font-medium ${selectedStep?.id === step.id ? 'text-white' : 'text-slate-300'}`}>
                  {step.title}
                </h4>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${getComplexityColor(step.complexity)}`}>
                    {step.complexity} Effort
                  </span>
                </div>
              </div>
              <ChevronRight size={16} className={`ml-auto transition-transform ${selectedStep?.id === step.id ? 'text-blue-400 translate-x-1' : 'text-slate-600'}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Detail View */}
      <div className="flex-1 bg-cxvii-card border border-slate-700 rounded-xl p-8 overflow-y-auto">
        {selectedStep ? (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-blue-400 font-mono text-sm">PHASE 0{selectedStep.id}</span>
                <div className="h-px bg-slate-700 flex-1"></div>
              </div>
              <h2 className="text-3xl font-bold text-white">{selectedStep.title}</h2>
              <p className="text-lg text-slate-400 mt-4 leading-relaxed">
                {selectedStep.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tooling Required</h5>
                <div className="text-white font-mono text-lg flex items-center gap-2">
                  <Circle size={12} className="text-cxvii-accent fill-current" />
                  {selectedStep.tool}
                </div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">ISM Control Reference</h5>
                <div className="text-white font-mono text-lg flex items-center gap-2">
                  <Circle size={12} className="text-cxvii-warning fill-current" />
                  {selectedStep.ismControl}
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg border border-slate-700 p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <ArrowRight size={18} className="text-cxvii-success" /> Action Item
                </h3>
                <div className="font-mono text-sm text-slate-300 bg-black p-4 rounded border border-slate-800 overflow-x-auto">
                    {/* Conditional content based on step for demo purposes */}
                    {selectedStep.id === '1' && (
                        <>
                            # Go to GitHub Repo Settings -&gt; Branches<br/>
                            # Add Rule: "main"<br/>
                            # Check "Require a pull request before merging"<br/>
                            # Check "Require status checks to pass before merging"
                        </>
                    )}
                    {selectedStep.id === '2' && (
                        <>
                            mkdir -p .github/workflows<br/>
                            touch .github/workflows/ci.yml<br/>
                            # Copy standard Node.js template into ci.yml
                        </>
                    )}
                    {['3','4','5','6'].includes(selectedStep.id) && (
                        <span className="text-slate-500">// Ask the AI Consultant for the specific configuration code for this step.</span>
                    )}
                </div>
            </div>
          </div>
        ) : (
            <div className="h-full flex items-center justify-center text-slate-500">
                Select a step to view details
            </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;