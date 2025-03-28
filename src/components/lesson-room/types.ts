
export interface LessonInfo {
  title: string;
  teacherName: string;
  time: string;
}

export interface VideoLessonRoomProps {
  isOpen: boolean;
  onClose: () => void;
  lessonInfo: LessonInfo;
}

export interface ChatMessage {
  sender: string;
  text: string;
}

export interface ControlBarProps {
  micEnabled: boolean;
  videoEnabled: boolean;
  metronomeActive: boolean;
  onToggleMic: () => void;
  onToggleVideo: () => void;
  onShareScreen: () => void;
  onFileUpload: () => void;
  onEndLesson: () => void;
  setActiveTab: (tab: string) => void;
  onToggleMidiPanel: () => void; 
  practiceMode: boolean;
  onTogglePracticeMode: () => void;
}

export interface PracticeAreaProps {
  onTogglePracticeMode: () => void;
  practiceMode: boolean;
  selectedSheet?: string | null;
  sheetFile?: File | null;
}
