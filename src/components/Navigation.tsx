
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">{'<>'}</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            CodeHero
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          {location.pathname !== '/' && (
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="hover:bg-primary/10"
            >
              Home
            </Button>
          )}
          <Button 
            className="gradient-primary text-white hover:opacity-90 transition-opacity"
            onClick={() => navigate('/auth')}
          >
            Começar Agora
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
