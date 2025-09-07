"use client";

import { useEffect, useState } from "react";

// Extend Window interface for Voiceflow
declare global {
  interface Window {
    voiceflow?: {
      chat: {
        load: (config: any) => void;
      };
    };
  }
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      });
      setCurrentTime(timeString);
    };

    // Set initial time
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Suppress audio context warnings (non-critical for text-only chat)
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0]?.includes?.('audio context suspended') || 
          args[0]?.includes?.('error initializing audio')) {
        return; // Suppress audio-related errors
      }
      originalError.apply(console, args);
    };

    // Add CSS for proper Voiceflow widget display
    const style = document.createElement("style");
    style.textContent = `
      #voiceflow-chat {
        height: 100% !important;
        max-height: 600px !important;
        overflow: hidden !important;
      }
      #voiceflow-chat > div {
        height: 100% !important;
        display: flex !important;
        flex-direction: column !important;
      }
      #voiceflow-chat .vfrc-chat {
        height: 100% !important;
        max-height: none !important;
        border-radius: 1rem !important;
      }
      #voiceflow-chat .vfrc-chat--container {
        height: 100% !important;
        display: flex !important;
        flex-direction: column !important;
      }
      #voiceflow-chat .vfrc-chat--dialog {
        flex: 1 !important;
        overflow-y: auto !important;
      }
    `;
    document.head.appendChild(style);

    // Official Voiceflow embed code
    (function (d, t) {
      const v = d.createElement(t) as HTMLScriptElement;
      const s = d.getElementsByTagName(t)[0];
      v.onload = function () {
        if (window.voiceflow) {
          window.voiceflow.chat.load({
            verify: { projectID: "68bdc519d1715034556f9461" },
            url: "https://general-runtime.voiceflow.com",
            versionID: "production",
            voice: {
              url: "https://runtime-api.voiceflow.com",
            },
            render: {
              mode: "embedded",
              target: document.getElementById("voiceflow-chat"),
            },
          });
        }
      };
      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      v.type = "text/javascript";
      if (s.parentNode) {
        s.parentNode.insertBefore(v, s);
      }
    })(document, "script");

    return () => {
      // Cleanup
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
      // Restore original console.error
      console.error = originalError;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Phone Mockup */}
      <div className="w-[375px] h-[812px] bg-black rounded-[40px] p-2 shadow-2xl">
        <div className="w-full h-full bg-gray-900 rounded-[32px] flex flex-col text-white overflow-hidden">
          {/* Status Bar */}
          <div className="h-11 flex items-center justify-between px-6 text-sm font-medium">
            <span>{currentTime || "9:41"}</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-white rounded-sm">
                <div className="w-3 h-1 bg-white rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Header */}
          {/* <header className="px-6 py-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1L3 7v11a1 1 0 001 1h3v-7h6v7h3a1 1 0 001-1V7l-7-6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h1 className="text-lg font-bold leading-tight">
                Houston Emergency
                <br />
                Preparedness Assistant
              </h1>
            </div>
            <p className="text-gray-400 text-xs">
              Get help with emergency planning and safety
              <br />
              information for Houston, TX
            </p>
          </header> */}

          {/* Chat Area */}
          <div className="flex-1 mx-4 mb-4 overflow-hidden">
            <div
              id="voiceflow-chat"
              className="w-full h-full min-h-[500px] max-h-[600px] overflow-auto"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            ></div>
          </div>

          {/* Footer */}
          <footer className="px-4 py-3 text-center text-xs text-gray-500 border-t border-gray-800">
            <div className="mb-1">© City of Houston</div>
            <div className="mb-1">Harris County Emergency Management</div>
            <div className="flex items-center justify-center gap-1">
              <span>📞</span>
              <span>Emergency: 911</span>
            </div>
          </footer>

          {/* Home Indicator */}
          <div className="h-5 flex items-center justify-center">
            <div className="w-32 h-1 bg-white rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
