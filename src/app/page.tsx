"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useEffect, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [isPinned, setIsPinned] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, stop, setMessages, error } = useChat({
    onError: (err) => {
      console.error("Chat Error:", err);
    },
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const isThinking = status === "submitted";
  const isStreaming = status === "streaming";
  const isLoading = isThinking || isStreaming;
  const isDark = theme === "dark";

  useEffect(() => {
    if (isPinned) {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isThinking, isPinned]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setIsPinned(distanceFromBottom < 80);
  }, []);

  const jumpToBottom = () => {
    setIsPinned(true);
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleNewChat = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMessages([]);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;
    setInput("");
    sendMessage({ text });
  };

  return (
    <div
      className={`flex h-screen w-full font-sans overflow-hidden transition-colors ${
        isDark ? "bg-[#0D1B2A] text-cyan-50" : "bg-[#E8F5E9] text-emerald-950"
      }`}
    >
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 z-50 transition-all duration-300 border-r flex flex-col justify-between overflow-hidden shrink-0 ${
          sidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full md:translate-x-0 md:w-0 border-r-0"
        } ${
          isDark ? "bg-[#0B132B] border-cyan-900/50" : "bg-[#C8E6C9] border-emerald-300"
        }`}
      >
        <div className="p-4 space-y-4 w-64">
          <button
            type="button"
            onClick={handleNewChat}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-semibold shadow-sm transition-all cursor-pointer select-none ${
              isDark
                ? "bg-cyan-900/40 hover:bg-cyan-900/70 border-cyan-700/50 text-cyan-100"
                : "bg-emerald-100 hover:bg-emerald-200 border-emerald-300 text-emerald-900"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-sm">+</span> New Chat
            </span>
          </button>
        </div>

        <div className={`p-4 border-t space-y-3 w-64 ${isDark ? "border-cyan-900/50" : "border-emerald-300"}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium opacity-80">Theme</span>
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                isDark
                  ? "bg-cyan-800 hover:bg-cyan-700 text-cyan-100"
                  : "bg-emerald-200 hover:bg-emerald-300 text-emerald-900"
              }`}
            >
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden z-10">
        <header
          className={`h-14 px-4 flex items-center justify-between border-b backdrop-blur-md shrink-0 z-20 ${
            isDark
              ? "border-cyan-900/40 bg-[#0D1B2A]/90 text-cyan-100"
              : "border-emerald-200 bg-[#E8F5E9]/90 text-emerald-900"
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Toggle Navigation Sidebar"
              className={`p-2 rounded-lg text-sm cursor-pointer transition-colors ${
                isDark ? "hover:bg-cyan-900/50 text-cyan-300" : "hover:bg-emerald-200 text-emerald-800"
              }`}
            >
              ☰
            </button>
            <h1 className="text-sm font-semibold tracking-tight">AI Engine</h1>
          </div>

          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full animate-pulse ${error ? "bg-red-400" : "bg-teal-400"}`} />
            <span className="text-xs font-mono opacity-70">
              {error ? "High Demand / Error" : "Gemini 1.5 Flash"}
            </span>
          </div>
        </header>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto relative z-10" ref={scrollRef} onScroll={handleScroll}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 max-w-2xl mx-auto space-y-6 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">How can I help today?</h2>
                <p className={`text-xs ${isDark ? "text-cyan-300/70" : "text-emerald-700"}`}>
                  Ask questions, generate ideas, or analyze code in real time.
                </p>
              </div>

              <div className="w-full relative">
                <div
                  className={`p-3 rounded-2xl border shadow-lg transition-all ${
                    isDark
                      ? "bg-[#1B263B] border-cyan-800 focus-within:border-cyan-400"
                      : "bg-white border-emerald-200 focus-within:border-emerald-500"
                  }`}
                >
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Message AI Engine..."
                    rows={3}
                    className="w-full bg-transparent resize-none text-sm focus:outline-none placeholder:opacity-50"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                  <div className="flex items-center justify-between pt-2 border-t border-emerald-500/10">
                    <span className="text-[10px] opacity-60 font-mono">Press Shift+Enter for new line</span>
                    <button
                      type="button"
                      onClick={() => handleSend()}
                      disabled={!input.trim()}
                      className={`px-4 py-1.5 disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isDark ? "bg-cyan-600 hover:bg-cyan-500" : "bg-emerald-600 hover:bg-emerald-500"
                      }`}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
                {[
                  "Explain React Server Components",
                  "Optimize a Next.js API route",
                  "Write CSS for a responsive grid",
                  "Debug a streaming state hook",
                ].map((prompt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                      isDark
                        ? "bg-[#1B263B]/60 border-cyan-900/60 hover:border-cyan-500 text-cyan-200"
                        : "bg-white/80 border-emerald-200 hover:border-emerald-400 text-emerald-900"
                    }`}
                  >
                    {prompt} →
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6 pb-28">
              {messages.map((m) => (
                <div key={m.id} className={`flex gap-3 text-sm ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role !== "user" && (
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isDark
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                          : "bg-emerald-600/20 text-emerald-800 border border-emerald-600/30"
                      }`}
                    >
                      AI
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-2xl max-w-[85%] leading-relaxed text-xs sm:text-sm shadow-sm ${
                      m.role === "user"
                        ? isDark
                          ? "bg-cyan-600 text-white rounded-tr-none"
                          : "bg-emerald-600 text-white rounded-tr-none"
                        : isDark
                        ? "bg-[#1B263B] border border-cyan-900/60 text-cyan-100 rounded-tl-none"
                        : "bg-white border border-emerald-200 text-emerald-950 rounded-tl-none"
                    }`}
                  >
                    <div className="prose dark:prose-invert text-xs sm:text-sm max-w-none">
                      <ReactMarkdown>
                        {m.parts
                          ? m.parts
                              .filter((p): p is { type: "text"; text: string } => p.type === "text")
                              .map((p) => p.text)
                              .join("")
                          : (m as any).text || (m as any).content || ""}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex gap-3 items-center text-xs">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isDark ? "bg-cyan-500/20 text-cyan-300" : "bg-emerald-600/20 text-emerald-800"
                    }`}
                  >
                    AI
                  </div>
                  <div
                    className={`flex items-center gap-1.5 px-4 py-3 rounded-2xl border ${
                      isDark ? "bg-[#1B263B] border-cyan-900/60" : "bg-white border-emerald-200"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full animate-bounce ${isDark ? "bg-cyan-400" : "bg-emerald-500"}`} />
                    <span className={`w-2 h-2 rounded-full animate-bounce [animation-delay:0.2s] ${isDark ? "bg-cyan-400" : "bg-emerald-500"}`} />
                    <span className={`w-2 h-2 rounded-full animate-bounce [animation-delay:0.4s] ${isDark ? "bg-cyan-400" : "bg-emerald-500"}`} />
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 text-xs bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center">
                  {error.message || "Model is currently overloaded. Please wait a moment and try again."}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Bar */}
        {messages.length > 0 && (
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 z-20 transition-colors ${
              isDark ? "bg-[#0D1B2A]" : "bg-[#E8F5E9]"
            }`}
          >
            {!isPinned && (
              <button
                type="button"
                onClick={jumpToBottom}
                className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-white text-xs shadow-md cursor-pointer ${
                  isDark ? "bg-cyan-600 hover:bg-cyan-500" : "bg-emerald-600 hover:bg-emerald-500"
                }`}
              >
                ↓ Jump to latest
              </button>
            )}

            <div className="max-w-3xl mx-auto flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message AI Engine..."
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                className={`flex-1 px-4 py-3 rounded-xl border text-sm focus:outline-none shadow-sm ${
                  isDark
                    ? "bg-[#1B263B] border-cyan-900/80 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-500"
                    : "bg-white border-emerald-200 text-emerald-950 placeholder:text-emerald-700/50 focus:border-emerald-500"
                }`}
              />
              {isLoading ? (
                <button
                  type="button"
                  onClick={stop}
                  className="px-5 py-3 bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs rounded-xl cursor-pointer"
                >
                  Stop
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className={`px-5 py-3 disabled:opacity-30 text-white font-medium text-xs rounded-xl cursor-pointer transition-colors ${
                    isDark ? "bg-cyan-600 hover:bg-cyan-500" : "bg-emerald-600 hover:bg-emerald-500"
                  }`}
                >
                  Send
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}