
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Languages = () => {
  const navigate = useNavigate();

  const languages = [
    {
      id: 'javascript',
      name: 'JavaScript',
      description: 'A linguagem da web moderna',
      icon: '⚡',
      difficulty: 'Iniciante',
      progress: 0,
      color: 'from-yellow-500 to-orange-500',
      lessons: 25
    },
    {
      id: 'python',
      name: 'Python',
      description: 'Simples, poderoso e versátil',
      icon: '🐍',
      difficulty: 'Iniciante',
      progress: 0,
      color: 'from-green-500 to-blue-500',
      lessons: 30
    },
    {
      id: 'html',
      name: 'HTML & CSS',
      description: 'Fundamentos da web',
      icon: '🌐',
      difficulty: 'Básico',
      progress: 0,
      color: 'from-red-500 to-pink-500',
      lessons: 20
    },
    {
      id: 'react',
      name: 'React',
      description: 'Biblioteca moderna para UI',
      icon: '⚛️',
      difficulty: 'Intermediário',
      progress: 0,
      color: 'from-blue-500 to-cyan-500',
      lessons: 35
    }
  ];

  const startLearning = (languageId: string) => {
    navigate(`/lesson/${languageId}/1`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Escolha sua Linguagem
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Selecione a linguagem de programação que deseja dominar e inicie sua jornada épica no mundo do código.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {languages.map((language) => (
              <Card 
                key={language.id} 
                className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${language.color} rounded-lg flex items-center justify-center text-2xl`}>
                      {language.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{language.name}</h3>
                      <p className="text-sm text-muted-foreground">{language.difficulty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{language.lessons} lições</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">{language.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progresso</span>
                    <span>{language.progress}%</span>
                  </div>
                  <Progress value={language.progress} className="h-2" />
                </div>
                
                <Button 
                  className="w-full gradient-primary text-white hover:opacity-90 transition-opacity"
                  onClick={() => startLearning(language.id)}
                >
                  {language.progress > 0 ? 'Continuar' : 'Começar'}
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Não sabe por onde começar? Recomendamos JavaScript para iniciantes!
            </p>
            <Button 
              variant="outline" 
              className="border-primary/30 hover:bg-primary/10"
              onClick={() => startLearning('javascript')}
            >
              Começar com JavaScript
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Languages;
