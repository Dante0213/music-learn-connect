
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Music, FileQuestion, Bell, Info, Menu, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to="/" className="flex items-center">
          <Music className="w-6 h-6 mr-2 text-primary" />
          <span className="text-xl font-bold">Harmonic Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/about">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Info className="w-4 h-4 mr-2" />
                    소개
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/notices">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Bell className="w-4 h-4 mr-2" />
                    공지사항
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/guide">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Info className="w-4 h-4 mr-2" />
                    이용안내
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <FileQuestion className="w-4 h-4 mr-2" />
                    문의
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/sign-in">로그인</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/sign-up">회원가입</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="p-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col px-4 py-6 space-y-4 bg-background md:hidden top-16">
          <Link 
            to="/about" 
            className="flex items-center p-2 text-lg hover:bg-accent rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            <Info className="w-5 h-5 mr-3" /> 소개
          </Link>
          <Link 
            to="/notices" 
            className="flex items-center p-2 text-lg hover:bg-accent rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            <Bell className="w-5 h-5 mr-3" /> 공지사항
          </Link>
          <Link 
            to="/guide" 
            className="flex items-center p-2 text-lg hover:bg-accent rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            <Info className="w-5 h-5 mr-3" /> 이용안내
          </Link>
          <Link 
            to="/contact" 
            className="flex items-center p-2 text-lg hover:bg-accent rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            <FileQuestion className="w-5 h-5 mr-3" /> 문의
          </Link>
          
          <div className="pt-4 mt-4 border-t">
            <div className="grid gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/sign-in" onClick={() => setIsMenuOpen(false)}>로그인</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/sign-up" onClick={() => setIsMenuOpen(false)}>회원가입</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
