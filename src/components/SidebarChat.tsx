import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  MessageSquare,
  ListFilter
} from 'lucide-react';
import type { ChatMessage, Worker, ProposalType } from '../types';
import { api } from '../services/api';
import { ProposalCard } from './ProposalCard';


interface SidebarChatProps {
  currentUser: Worker;
  currentRole: 'worker' | 'manager';
  aiProposals: ProposalType[];
  onResetChat: () => void;
}

export const SidebarChat: React.FC<SidebarChatProps> = ({
  currentUser,
  currentRole,
  aiProposals,
  onResetChat
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'proposals'>('chat');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const fetched = useRef(false);
  const [allProposals, setAllProposals] = useState<ProposalType[]>(aiProposals);
  console.error(allProposals)
  useEffect(() => {
    const fetchProposals = async () => {
      if (fetched.current) return;
      const data = await api.getProposals();
      fetched.current = true;
      setAllProposals(data);
    };
    if (activeTab === 'proposals') {
      fetchProposals();
    }
  }, [activeTab]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendPrompt = async (text: string) => {
    if (!text.trim()) return;

    setIsTyping(true);

    const userMessage: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      roleName: currentUser.name,
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    try {
      const aiResponse = await api.sendMessage(text, messages.map(item => ({ "role": item.sender, "content": item.text })));

      const assistantMessage: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        text: aiResponse.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        proposal: aiResponse.created_proposal
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    } catch {
      alert('ShiftBridge is not able to answer you');
      setIsTyping(false);
    }
  };

  const handleApproveProposal = async (proposalId: string) => {
    try {
      const updatedProposal = await api.approveProposal(proposalId);
      // Update local proposals list state
      setAllProposals(prev => prev.map(p => p.id === proposalId ? updatedProposal : p));

      // Update chat messages proposal states if present
      setMessages(prev => prev.map(msg => {
        if (msg.proposal && (msg.proposal as unknown as ProposalType).id === proposalId) {
          return { ...msg, proposal: updatedProposal as any };
        }
        return msg;
      }));
    } catch (error) {
      alert('Failed to approve proposal');
    }
  };

  // Reusable Proposal Card Component with dynamic state UI

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Chat Header & Tab Switcher */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/25">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-slate-900 flex items-center gap-1.5">
                ShiftBridge
              </div>
            </div>
          </div>

          {activeTab === 'chat' && <button
            onClick={onResetChat}
            className="text-xs text-slate-500 hover:text-indigo-600 px-2.5 py-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
            title="Restart scenario dialog"
          >
            Reset Dialog
          </button>}
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-200/70 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${activeTab === 'chat'
              ? 'bg-white text-indigo-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> Chat Sidebar
          </button>
          <button
            onClick={() => setActiveTab('proposals')}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${activeTab === 'proposals'
              ? 'bg-white text-indigo-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            <ListFilter className="w-3.5 h-3.5" /> All Proposals ({allProposals.length})
          </button>
        </div>
      </div>

      {/* Main Content Area based on Active Tab */}
      {activeTab === 'chat' ? (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length > 0 ? messages.map((msg) => {
              if (msg.sender === 'system') {
                return (
                  <div
                    key={msg.id}
                    className="mx-auto my-2 max-w-sm text-center text-xs text-slate-500 bg-slate-100 rounded-lg p-2 border border-slate-200"
                  >
                    {msg.text}
                  </div>
                );
              }

              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs ${isUser ? 'bg-indigo-600' : 'bg-slate-700'
                      }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`max-w-[85%] space-y-2 ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3.5 rounded-2xl text-sm leading-relaxed ${isUser
                        ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                        : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/60 shadow-2xs'
                        }`}
                    >
                      <p>{msg.text}</p>
                    </div>

                    {msg.proposal && (
                      <div className="mt-2">
                        <ProposalCard
                          currentRole={currentRole}
                          handleApproveProposal={handleApproveProposal}
                          proposal={msg.proposal as unknown as ProposalType} />
                      </div>
                    )}

                    <div className="text-[10px] text-slate-400 px-1">{msg.timestamp}</div>
                  </div>
                </div>
              );
            }) : (
              <div className="border p-4 py-8 border-gray-200 rounded-lg items-center text-center text-gray-400">
                <p>Start To chat with ShiftBridge</p>
              </div>
            )}

            {isTyping && (
              <div className="flex gap-3 items-center text-slate-500 text-xs">
                <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-100 border border-slate-200 px-3.5 py-2.5 rounded-2xl rounded-bl-none flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt(inputText);
            }}
            className="p-3 border-t border-slate-200 bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a request (e.g. swap shift)..."
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-1">
            All Generated Proposals ({allProposals.length})
          </div>
          {allProposals.length > 0 ? (
            allProposals.map((prop, idx) => (
              <ProposalCard key={prop.id || idx}
                proposal={prop}
                currentRole={currentRole}
                handleApproveProposal={handleApproveProposal}
              />
            ))
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              No proposals generated yet. Chat with ShiftBridge AI to generate shift proposals.
            </div>
          )}
        </div>
      )}
    </div>
  );
};