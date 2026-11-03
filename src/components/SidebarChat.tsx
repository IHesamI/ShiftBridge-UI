import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  ShieldCheck,
  CheckCircle,
  Clock,
  Check,
  ChevronRight,
  Info
} from 'lucide-react';
import type { ChatMessage, AiProposal, Worker, Scenario } from '../types';

interface SidebarChatProps {
  currentUser: Worker;
  currentRole: 'worker' | 'manager';
  scenario: Scenario;
  aiProposals: AiProposal[];
  onApplyProposal: (proposal: AiProposal) => void;
  onRequestApproval: (proposal: AiProposal) => void;
  pendingProposalId: 'opt_A' | 'opt_B' | null;
  approvalStatus: {
    workerApproved: boolean;
    managerApproved: boolean;
    applied: boolean;
    selectedOption: 'opt_A' | 'opt_B' | null;
  };
  onResetChat: () => void;
}

export const SidebarChat: React.FC<SidebarChatProps> = ({
  currentUser,
  currentRole,
  scenario,
  aiProposals,
  onApplyProposal,
  onRequestApproval,
  pendingProposalId,
  approvalStatus,
  onResetChat
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat when scenario loads
  useEffect(() => {
    setMessages((prev) => {
      // Keep existing conversation and proposals across role switches if they already exist
      if (prev.length > 0) return prev;
      return [
        {
          id: 'msg_welcome',
          sender: 'assistant',
          text: `Hello ${currentUser.name}! I am ShiftBridge AI. I continuously monitor staff availability, qualifications, and shifts to resolve sudden caregiving disruptions with zero patient coverage loss.`,
          timestamp: 'Just now'
        },
        
      ];
    });
  }, [currentUser]);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', });
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages, isTyping]);

  const handleSendPrompt = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      roleName: currentUser.name,
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI reasoning and option generation
    setTimeout(() => {
      setIsTyping(false);
      const isResolutionPrompt =
        text.toLowerCase().includes('childcare') ||
        text.toLowerCase().includes('wednesday') ||
        text.toLowerCase().includes('swap') ||
        text.toLowerCase().includes('resolve') ||
        text.toLowerCase().includes('option') ||
        text.toLowerCase().includes('help');

      if (isResolutionPrompt) {
        const assistantMessage: ChatMessage = {
          id: `ai_${Date.now()}`,
          sender: 'assistant',
          text: `I've analyzed your schedule constraint against team competencies, weekly hour limits (max 40h), and unit staffing minimums. Here are 2 balanced resolution options:`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: aiProposals
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const assistantMessage: ChatMessage = {
          id: `ai_${Date.now()}`,
          sender: 'assistant',
          text: `I understand: "${text}". You can ask me to evaluate coverage options for Sarah's Wednesday shift, or pick one of the quick prompts below.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    }, 1100);
  };

  const quickPrompts = [
    scenario.promptText,
    "Show available qualified coverage for Wednesday",
    "Evaluate overtime risk for me"
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/25">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-sm text-slate-900 flex items-center gap-1.5">
              ShiftBridge AI
            </div>
          </div>
        </div>

        <button
          onClick={onResetChat}
          className="text-xs text-slate-500 hover:text-indigo-600 px-2.5 py-1 rounded-md hover:bg-slate-100 transition-colors"
          title="Restart scenario dialog"
        >
          Reset Dialog
        </button>
      </div>

      {/* Disruption Alert Banner */}
      {/* <div className="px-4 py-3 bg-amber-50/90 border-b border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5">
        <div className="p-1 bg-amber-200 text-amber-800 rounded-lg flex-shrink-0 mt-0.5">
          <Clock className="w-3.5 h-3.5" />
        </div>
        <div className="flex-1">
          <div className="font-bold flex items-center justify-between">
            <span>Caregiver Conflict Flagged</span>
            <span className="text-[10px] bg-amber-200/60 px-1.5 py-0.5 rounded text-amber-800">Wednesday</span>
          </div>
          <div className="text-amber-800/90 mt-0.5">
            <strong>Sarah Jenkins:</strong> "{scenario.constraint}"
          </div>
        </div>
      </div> */}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
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
              className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} ${
                !isUser ? 'animate-agent-message' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs ${
                  isUser ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] space-y-2 ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/60 shadow-2xs'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {/* AI Resolution Option Cards */}
                {msg.options && (
                  <div className="mt-3 space-y-3 pt-1">
                    {msg.options.map((opt, optIndex) => {
                      const isOptionApplied =
                        approvalStatus.applied && approvalStatus.selectedOption === opt.optionId;
                      const isOptionPending =
                        pendingProposalId === opt.optionId && !approvalStatus.applied;

                      return (
                        <div
                          key={opt.optionId}
                          style={{ animationDelay: `${(optIndex + 1) * 120}ms` }}
                          className={`p-4 rounded-xl border transition-all text-left animate-proposal-card ${
                            isOptionApplied
                              ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-400'
                              : isOptionPending
                              ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-300'
                              : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                {opt.title}
                              </div>
                              <div className="text-[11px] text-indigo-700 font-medium">{opt.subtitle}</div>
                            </div>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              {opt.solutionType === 'swap' ? 'Peer Swap' : 'Split Shift'}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                            {opt.description}
                          </p>

                          {/* Impact Metrics Box */}
                          <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200/80 mb-3 text-xs space-y-1.5">
                            <div className="flex items-center justify-between text-slate-700">
                              <span className="font-medium">Impact on Hours:</span>
                              <span className="text-slate-900 font-semibold text-[11px]">
                                {opt.impact.worker1Name}: {opt.impact.worker1HoursChange} | {opt.impact.worker2Name}: {opt.impact.worker2HoursChange}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-slate-700">
                              <span className="font-medium">Team Coverage Score:</span>
                              <span className="inline-flex items-center font-bold text-emerald-700 text-xs">
                                <Check className="w-3.5 h-3.5 mr-1" />
                                {opt.impact.coverageText} ({opt.impact.teamCoverageScore}%)
                              </span>
                            </div>
                          </div>

                          {/* Approval Status Badges & Action Buttons */}
                          {isOptionApplied ? (
                            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-100/80 p-2.5 rounded-lg border border-emerald-300">
                              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                              <span>All Approvals Secured — Shift Schedule Updated</span>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {/* Workflow pills */}
                              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                                <div
                                  className={`p-1.5 rounded flex items-center justify-center gap-1 border ${
                                    approvalStatus.workerApproved && pendingProposalId === opt.optionId
                                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-medium'
                                      : 'bg-slate-50 border-slate-200'
                                  }`}
                                >
                                  {approvalStatus.workerApproved && pendingProposalId === opt.optionId ? (
                                    <Check className="w-3 h-3 text-emerald-600" />
                                  ) : (
                                    <Clock className="w-3 h-3 text-slate-400" />
                                  )}
                                  Worker: {approvalStatus.workerApproved && pendingProposalId === opt.optionId ? 'Approved' : 'Pending'}
                                </div>

                                <div
                                  className={`p-1.5 rounded flex items-center justify-center gap-1 border ${
                                    approvalStatus.managerApproved && pendingProposalId === opt.optionId
                                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-medium'
                                      : 'bg-slate-50 border-slate-200'
                                  }`}
                                >
                                  {approvalStatus.managerApproved && pendingProposalId === opt.optionId ? (
                                    <Check className="w-3 h-3 text-emerald-600" />
                                  ) : (
                                    <ShieldCheck className="w-3 h-3 text-slate-400" />
                                  )}
                                  Manager: {approvalStatus.managerApproved && pendingProposalId === opt.optionId ? 'Approved' : 'Pending'}
                                </div>
                              </div>

                              {/* Action button */}
                              <div className="flex gap-2 pt-1">
                                {currentRole === 'worker' ? (
                                  <button
                                    onClick={() => onRequestApproval(opt)}
                                    className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    {isOptionPending && approvalStatus.workerApproved
                                      ? 'Worker Approved (Awaiting Manager)'
                                      : 'Approve & Request Manager Sign-off'}
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => onApplyProposal(opt)}
                                    className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                                  >
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    Manager: Approve & Apply Changes
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="text-[10px] text-slate-400 px-1">{msg.timestamp}</div>
              </div>
            </div>
          );
        })}

        {/* Simulated Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 items-center text-slate-500 text-xs">
            <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-100 border border-slate-200 px-3.5 py-2.5 rounded-2xl rounded-bl-none flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-slate-500 ml-1">Analyzing schedule matrix & worker qualifications...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium mb-1.5">
          <Info className="w-3 h-3 text-slate-400" />
          Suggested Actions:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(prompt)}
              className="text-[11px] text-left bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-700 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
            >
              <ChevronRight className="w-3 h-3 text-indigo-500" />
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
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
          placeholder={`Type a request (e.g. "${scenario.promptText}")`}
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
    </div>
  );
};
