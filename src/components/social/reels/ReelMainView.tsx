
import { ReelUserInfo } from "./ReelUserInfo";
import { Reel } from "./ReelsData";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share2, Volume2, VolumeX } from "lucide-react";

interface ReelMainViewProps {
  reel: Reel;
  onUserClick?: (user: Reel) => void;
}

export const ReelMainView = ({ reel, onUserClick }: ReelMainViewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(reel.isLiked || false);
  const [likeCount, setLikeCount] = useState(reel.likeCount || reel.likes || 0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsPlaying(true);
          videoRef.current?.play();
        } else {
          setIsPlaying(false);
          videoRef.current?.pause();
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // 인터랙티브 컨트롤 렌더링 함수
  const renderInteractiveControls = () => (
    <div className="flex items-center gap-2 mb-2">
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full bg-black/50 hover:bg-black/70 text-white ${isLiked ? 'text-red-500' : ''}`}
        onClick={toggleLike}
      >
        <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
        <span className="text-xs absolute -bottom-5">{likeCount}</span>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-black/50 hover:bg-black/70 text-white"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-xs absolute -bottom-5">{reel.commentCount || reel.comments || 0}</span>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-black/50 hover:bg-black/70 text-white"
      >
        <Share2 className="w-5 h-5" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-black/50 hover:bg-black/70 text-white"
        onClick={toggleMute}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </Button>
    </div>
  );

  return (
    <div className="relative h-full w-full bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={reel.videoUrl || "https://example.com/placeholder.mp4"}
        loop
        muted={isMuted}
        playsInline
        onClick={togglePlay}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          {renderInteractiveControls()}
          <ReelUserInfo reel={reel} onUserClick={() => onUserClick && onUserClick(reel)} />
          
          <div className="mb-4">
            <p className="text-base mb-2">{reel.description || reel.content}</p>
            <div className="flex flex-wrap gap-2">
              {reel.hashtags && reel.hashtags.map((tag, index) => (
                <span key={index} className="text-sm text-blue-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 재생/일시정지 버튼 중앙에 배치 */}
      <div className="absolute inset-0 flex items-center justify-center">
        {!isPlaying && (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/50 hover:bg-black/70 text-white w-16 h-16"
            onClick={togglePlay}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          </Button>
        )}
      </div>
    </div>
  );
};
