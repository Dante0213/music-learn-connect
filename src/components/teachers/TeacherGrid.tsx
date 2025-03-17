
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { MessageCircle, Calendar, Video } from "lucide-react";

// Mock data for teachers
const teachersList = [
  { id: 1, name: "김태희", specialty: "피아노", image: "/placeholder.svg", education: "서울대학교 음악대학", experience: "10년 경력", certificates: "음악교육 자격증", introduction: "반갑습니다. 피아노를 가르치고 있습니다." },
  { id: 2, name: "이민호", specialty: "기타", image: "/placeholder.svg", education: "한양대학교 음악대학", experience: "8년 경력", certificates: "기타 지도사 자격증", introduction: "기타를 쉽고 재미있게 가르칩니다." },
  { id: 3, name: "박신혜", specialty: "바이올린", image: "/placeholder.svg", education: "연세대학교 음악대학", experience: "12년 경력", certificates: "바이올린 마스터 자격증", introduction: "바이올린의 아름다움을 전달합니다." },
  { id: 4, name: "정우성", specialty: "드럼", image: "/placeholder.svg", education: "고려대학교 음악대학", experience: "15년 경력", certificates: "드럼 마스터 자격증", introduction: "리듬과 비트를 느껴보세요." },
  { id: 5, name: "손예진", specialty: "보컬", image: "/placeholder.svg", education: "이화여자대학교 음악대학", experience: "7년 경력", certificates: "보컬 트레이너 자격증", introduction: "여러분의 목소리를 찾아드립니다." },
  { id: 6, name: "공유", specialty: "작곡", image: "/placeholder.svg", education: "중앙대학교 음악대학", experience: "9년 경력", certificates: "작곡가 자격증", introduction: "나만의 음악을 만들어보세요." },
];

export function TeacherGrid() {
  const [selectedTeacher, setSelectedTeacher] = useState<typeof teachersList[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openTeacherProfile = (teacher: typeof teachersList[0]) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">선생님 목록</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teachersList.map((teacher) => (
          <Card key={teacher.id} className="h-[280px] overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-4 flex flex-col items-center h-full">
              <Avatar className="w-28 h-28 mb-4">
                <AvatarImage src={teacher.image} alt={teacher.name} />
                <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="font-medium text-lg">{teacher.name}</h3>
              <p className="text-muted-foreground mb-4">{teacher.specialty}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-auto"
                onClick={() => openTeacherProfile(teacher)}
              >
                프로필 보기
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Teacher Profile Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[600px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
          {selectedTeacher && (
            <>
              <DialogHeader>
                <DialogTitle>선생님 프로필</DialogTitle>
              </DialogHeader>
              
              <div className="flex items-center gap-4 my-4">
                <Avatar className="w-[75px] h-[75px]">
                  <AvatarImage src={selectedTeacher.image} alt={selectedTeacher.name} />
                  <AvatarFallback>{selectedTeacher.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-medium">{selectedTeacher.name}</h3>
                  <p className="text-muted-foreground">{selectedTeacher.specialty}</p>
                </div>
              </div>
              
              <div className="flex gap-2 my-4">
                <Button size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  레슨 예약
                </Button>
                <Button size="sm" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  1:1 대화
                </Button>
                <Button size="sm" variant="secondary" onClick={() => console.log("Navigate to VOD")}>
                  <Video className="h-4 w-4 mr-2" />
                  VOD 보러가기
                </Button>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">학력</h4>
                  <p>{selectedTeacher.education}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">경력</h4>
                  <p>{selectedTeacher.experience}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">자격증</h4>
                  <p>{selectedTeacher.certificates}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">소개글</h4>
                  <p>{selectedTeacher.introduction}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
