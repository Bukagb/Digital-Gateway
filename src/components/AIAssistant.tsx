import React, { useState } from 'react';
import { Bot, Send, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string, sender: 'user' | 'ai' }[]>([
    { text: "Hello! I'm your relocation assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "I'm looking that up for you in our official sources...", sender: 'ai' }]);
    }, 1000);
  };

  return (
    <>
      <button
        id="ai-assistant-toggle"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-[0_8px_16px_rgba(0,109,91,0.3)] flex items-center justify-center hover:scale-110 transition-transform active:scale-95 z-50 cursor-pointer"
      >
        <Bot size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20, y: 20 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-[24px] shadow-2xl flex flex-col overflow-hidden z-50 border border-organic"
          >
            {/* Header */}
            <div className="bg-primary p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg leading-none">Relocation Guide</h3>
                  <p className="text-[10px] text-teal-100 uppercase tracking-widest mt-1">AI Assistant • Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1 rounded-md transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
              {messages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-white text-text-main shadow-sm border border-teal-50 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-1 border border-gray-100">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  className="flex-1 py-3 text-sm bg-transparent outline-none"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  className="p-2 text-primary hover:bg-teal-50 rounded-lg transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide text-[10px]">
                {['NIF requirements', 'Bank account', 'Metro pass'].map(suggestion => (
                  <button 
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="whitespace-nowrap px-2 py-1 bg-teal-50 text-primary rounded-full hover:bg-teal-100 transition-colors border border-teal-100"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
