"use client";

import React, { useRef } from "react";
import { JaaSMeeting } from "@jitsi/react-sdk";
import { X } from "lucide-react";
import { animate } from "animejs";

const JAAS_APP_ID = "vpaas-magic-cookie-6436a23d00f04079b73ff4bd1764f534";

interface JitsiMeetingEmbedProps {
  roomName?: string;
  displayName?: string;
  onClose?: () => void;
}

export function JitsiMeetingEmbed({
  roomName = "osguild-workshop",
  displayName = "OS-Guild Member",
  onClose,
}: JitsiMeetingEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleButtonHover = (e: React.MouseEvent<HTMLElement>) => {
    animate(e.currentTarget, {
      scale: 1.05,
      boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)",
      duration: 200,
      easing: "easeOutQuad",
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLElement>) => {
    animate(e.currentTarget, {
      scale: 1,
      boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)",
      duration: 200,
      easing: "easeOutQuad",
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col bg-[#0d1117] border-[3px] border-black shadow-[6px_6px_0px_0px_#39d353]"
    >
      {/* Meeting Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b-[3px] border-black">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[#39d353] border-2 border-black rounded-full animate-pulse" />
          <span className="font-mono text-sm font-bold text-[#39d353] uppercase tracking-wider">
            Live — {roomName}
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            className="flex items-center gap-2 bg-[#da3633] text-white font-black uppercase text-xs px-3 py-2 border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-[#f85149]"
          >
            <X className="h-4 w-4" />
            Leave
          </button>
        )}
      </div>

      {/* Jitsi Iframe */}
      <div className="flex-1 min-h-0">
        <JaaSMeeting
          appId={JAAS_APP_ID}
          roomName={roomName}
          configOverwrite={{
            startWithAudioMuted: true,
            startWithVideoMuted: false,
            disableModeratorIndicator: true,
            prejoinPageEnabled: true,
            hideConferenceSubject: false,
          }}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            DEFAULT_BACKGROUND: "#010409",
            TOOLBAR_BUTTONS: [
              "microphone",
              "camera",
              "desktop",
              "chat",
              "raisehand",
              "participants-pane",
              "tileview",
              "hangup",
            ],
          }}
          userInfo={{
            displayName: displayName,
            email: "",
          }}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.width = "100%";
            iframeRef.style.height = "100%";
            iframeRef.style.border = "none";
          }}
          onApiReady={(externalApi) => {
            // Listen for hangup to auto-close
            externalApi.addListener("videoConferenceLeft", () => {
              onClose?.();
            });
          }}
        />
      </div>
    </div>
  );
}
