
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Music, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserProfileDropdown() {
  // 여기에 로그인 상태를 확인하는 로직을 추가할 수 있습니다.
  const isLoggedIn = false; // 예시: 실제로는 인증 상태에 따라 변경
  const isProfessional = false; // 예시: 실제로는 사용자 정보에 따라 변경 (전문가 여부)
  
  if (!isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link to="/sign-in">로그인</Link>
        </Button>
        <Button size="sm" asChild>
          <Link to="/sign-up">회원가입</Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/user-avatar.png" alt="사용자 프로필" />
            <AvatarFallback>사용자</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-1">
              <p className="text-sm font-medium leading-none">사용자</p>
              {isProfessional && (
                <Music className="h-3 w-3 text-purple-500" fill="currentColor" />
              )}
            </div>
            <p className="text-xs leading-none text-muted-foreground">
              user@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to="/mypage" className="flex w-full items-center">
              <User className="mr-2 h-4 w-4" />
              마이페이지
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/settings" className="flex w-full items-center">
              <Settings className="mr-2 h-4 w-4" />
              설정
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center">
          <LogOut className="mr-2 h-4 w-4" />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
