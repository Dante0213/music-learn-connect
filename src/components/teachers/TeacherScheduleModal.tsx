
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

import { ScheduleCalendar } from "./ScheduleCalendar";
import { TimeSlotSelection } from "./TimeSlotSelection";
import { TeacherScheduleModalProps, ScheduleItem } from "./types";
import { getTimeSlotsForDate, generateMockSchedule } from "./scheduleUtils";

export function TeacherScheduleModal({ isOpen, onClose, teacherName, teacherId }: TeacherScheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const { toast } = useToast();

  // 선생님 일정 데이터 불러오기
  useEffect(() => {
    // 실제로는 API를 통해 데이터를 가져와야 함
    // 여기서는 임시 데이터 사용
    const mockSchedule = generateMockSchedule();
    setSchedule(mockSchedule);
  }, [teacherId]);

  // 레슨 예약 처리
  const handleBookLesson = () => {
    if (!selectedTimeSlot) {
      toast({
        title: "시간을 선택해주세요",
        description: "레슨 시간을 선택해야 예약이 가능합니다.",
        variant: "destructive",
      });
      return;
    }

    // 실제로는 API를 통해 예약 처리
    toast({
      title: "레슨 예약 완료",
      description: `${teacherName} 선생님과 ${format(selectedDate, "yyyy년 MM월 dd일")} ${selectedTimeSlot} 레슨이 예약되었습니다.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[500px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>레슨 예약</DialogTitle>
          <DialogDescription>
            {teacherName} 선생님의 레슨 가능 시간을 확인하고 예약하세요
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <ScheduleCalendar 
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            schedule={schedule}
          />

          <TimeSlotSelection 
            timeSlots={getTimeSlotsForDate(schedule, selectedDate)}
            selectedTimeSlot={selectedTimeSlot}
            setSelectedTimeSlot={setSelectedTimeSlot}
          />
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-medium">선택 정보</div>
            <div className="text-sm text-muted-foreground">
              {selectedDate && (
                <span>날짜: {format(selectedDate, "yyyy년 MM월 dd일")}</span>
              )}
              {selectedTimeSlot && (
                <span className="ml-2">시간: {selectedTimeSlot}</span>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button onClick={handleBookLesson}>
              예약하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
