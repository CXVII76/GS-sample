import React, { useState, useRef, useEffect } from 'react';
    import { ChatMessage } from '../types';
    import { sendMessageToGemini } from '../services/geminiService';
    import { Send, Bot, User, Loader2 } from 'lucide-react';
    
    const ChatAssistant: React.FC = () => {
      const [messages, setMessages] = useState<ChatMessage[]>([
        {
          id: 'init',
          role: 'model',
          text: 'Hello. I am your DevSecOps Consultant. I have reviewed your RFI context (CXVII Tech, FOI Tool, Azure). How can I help you configure your GitHub Actions pipeline today?',
          timestamp: Date.now()
        }
      ]);
      const [input, setInput] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const messagesEndRef = useRef<HTMLDivElement>(null);
    
      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };
    
      useEffect(scrollToBottom, [messages]);
    
      const handleSend = async () => {
        if (!input.trim()) return;
    
        const userMsg: ChatMessage = {
          id: Date.now().toString(),
          role: 'user',
          text: input,
          timestamp: Date.now()
        };
    
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);
    
        try {
          const responseText = await sendMessageToGemini(userMsg.text);
          
          const aiMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: responseText,
            timestamp: Date.now()
          };
          setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
          // Fallback handled in service, but safety here
          const errorMsg: ChatMessage = {
             id: (Date.now() + 1).toString(),
             role: 'model',
             text: "Communication breakdown. Please check console.",
             timestamp: Date.now()
          };
          setMessages(prev => [...prev, errorMsg]);
        } finally {
          setIsLoading(false);
        }
      };
    
      const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      };
    
      return (
        <div className="flex flex-col h-full bg-cxvii-card rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                    <Bot size={20} className="text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-white">DevSecOps Assistant</h3>
                    <div className="text-xs text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                        Gemini 2.5 Flash Connected
                    </div>
                </div>
             </div>
          </div>
    
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-slate-600' : 'bg-blue-600'
                  }`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                        ? 'bg-slate-700 text-white rounded-tr-sm' 
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm shadow-sm'
                  }`}>
                    <div className="markdown-body" dangerouslySetInnerHTML={{__html: msg.text.replace(/\n/g, '<br/>')}} />
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[80%]">
                         <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-600">
                            <Loader2 size={16} className="animate-spin" />
                         </div>
                         <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 rounded-tl-sm">
                            <span className="text-slate-400 text-xs animate-pulse">Analyzing context...</span>
                         </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>
    
          <div className="p-4 bg-slate-800 border-t border-slate-700">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about GitHub Actions, Azure Bicep, or OSCAL..."
                className="w-full bg-cxvii-dark border border-slate-600 rounded-lg pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-blue-400 disabled:opacity-50 disabled:hover:text-slate-400 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="text-[10px] text-slate-500 mt-2 text-center">
                AI can make mistakes. Verify commands before running in production.
            </div>
          </div>
        </div>
      );
    };
    
    export default ChatAssistant;