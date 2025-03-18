
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Reel } from "@/components/social/reels/ReelsData";

import { ProfileImageUpload } from "./ProfileImageUpload";
import { ProfileTagsSection } from "./ProfileTagsSection";
import { ProfileEducationSection } from "./ProfileEducationSection";
import { ProfileExperienceSection } from "./ProfileExperienceSection";
import { ProfileCertificatesSection } from "./ProfileCertificatesSection";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: Reel;
  onUpdate: (updatedData: Reel) => void;
}

interface ProfileFormData {
  bio: string;
  specialization: string;
  instruments: string[];
  genres: string[];
  education: {id: string; institution: string; degree: string; year: string}[];
  experience: {id: string; company: string; position: string; period: string}[];
  certificates: {id: string; name: string; issuer: string; year: string}[];
}

export const ProfileEditModal = ({ isOpen, onClose, userData, onUpdate }: ProfileEditModalProps) => {
  const defaultValues: ProfileFormData = {
    bio: userData.bio || "",
    specialization: userData.specialization || "",
    instruments: userData.instruments || [],
    genres: userData.genres || [],
    education: userData.education || [],
    experience: userData.experience || [],
    certificates: userData.certificates || []
  };

  const form = useForm<ProfileFormData>({
    defaultValues
  });

  const [specialization, setSpecialization] = useState<string>(defaultValues.specialization);
  const [instruments, setInstruments] = useState<string[]>(defaultValues.instruments);
  const [newInstrument, setNewInstrument] = useState("");
  
  const [genres, setGenres] = useState<string[]>(defaultValues.genres);
  const [newGenre, setNewGenre] = useState("");
  
  const [education, setEducation] = useState(defaultValues.education);
  const [experience, setExperience] = useState(defaultValues.experience);
  const [certificates, setCertificates] = useState(defaultValues.certificates);
  
  const [profileImage, setProfileImage] = useState<string>(userData.imageUrl || "");

  const handleSubmit = (data: ProfileFormData) => {
    // Save profile image to localStorage
    if (profileImage) {
      localStorage.setItem('userProfileImage', profileImage);
    }
    
    const updatedData = {
      ...userData,
      bio: data.bio,
      specialization,
      instruments,
      genres,
      education,
      experience,
      certificates,
      imageUrl: profileImage
    };
    
    onUpdate(updatedData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[800px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Profile Image Upload */}
            <ProfileImageUpload
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              avatarFallback={userData.avatar}
            />
            
            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>소개</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="자신을 소개해주세요." 
                      {...field} 
                      className="min-h-[100px]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Specialization */}
            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>전공</FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSpecialization(value);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="전공 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="piano">피아노</SelectItem>
                        <SelectItem value="guitar">기타</SelectItem>
                        <SelectItem value="violin">바이올린</SelectItem>
                        <SelectItem value="vocal">보컬</SelectItem>
                        <SelectItem value="composition">작곡</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Instruments Tags */}
            <ProfileTagsSection
              title="악기"
              tags={instruments}
              setTags={setInstruments}
              newTag={newInstrument}
              setNewTag={setNewInstrument}
              placeholder="악기 추가"
            />

            {/* Genres Tags */}
            <ProfileTagsSection
              title="장르"
              tags={genres}
              setTags={setGenres}
              newTag={newGenre}
              setNewTag={setNewGenre}
              placeholder="장르 추가"
            />

            {/* Education Section */}
            <ProfileEducationSection
              education={education}
              setEducation={setEducation}
            />

            {/* Experience Section */}
            <ProfileExperienceSection
              experience={experience}
              setExperience={setExperience}
            />

            {/* Certificates Section */}
            <ProfileCertificatesSection
              certificates={certificates}
              setCertificates={setCertificates}
            />

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                취소
              </Button>
              <Button type="submit">
                저장
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
