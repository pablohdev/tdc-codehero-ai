
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Lesson = () => {
  const { language, lessonId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [points, setPoints] = useState(1250);
  const [streak, setStreak] = useState(7);

  // Dados mock da lição
  const lessonData = {
    title: "Variáveis em JavaScript",
    description: "Aprenda como declarar e usar variáveis em JavaScript",
    progress: 25,
    totalLessons: 25,
    currentLesson: parseInt(lessonId || "1"),
    question: {
      text: "Qual é a forma correta de declarar uma variável em JavaScript?",
      code: "// Qual dessas opções está correta?",
      options: [
        { id: "a", text: "var myVariable = 'Hello';", correct: true },
        { id: "b", text: "variable myVariable = 'Hello';", correct: false },
        { id: "c", text: "declare myVariable = 'Hello';", correct: false },
        { id: "d", text: "myVariable := 'Hello';", correct: false }
      ]
    }
  };

  const handleAnswerSelect = (answerId: string) => {
    if (hasAnswered) return;
    setSelectedAnswer(answerId);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    setHasAnswered(true);
    const isCorrect = lessonData.question.options.find(opt => opt.id === selectedAnswer)?.correct;
    
    if (isCorrect) {
      setPoints(prev => prev + 50);
      setStreak(prev => prev + 1);
      toast({
        title: "Parabéns! 🎉",
        description: "Resposta correta! +50 pontos",
      });
    } else {
      setStreak(0);
      toast({
        title: "Ops! 😅",
        description: "Resposta incorreta. Continue tentando!",
        variant: "destructive"
      });
    }
  };

  const handleNext = () => {
    const nextLesson = lessonData.currentLesson + 1;
    if (nextLesson <= lessonData.totalLessons) {
      navigate(`/lesson/${language}/${nextLesson}`);
    } else {
      navigate('/languages');
      toast({
        title: "Módulo Concluído! 🏆",
        description: "Você completou todas as lições deste módulo!",
      });
    }
  };

  const getOptionClassName = (option: any) => {
    if (!hasAnswered) {
      return selectedAnswer === option.id 
        ? "border-primary bg-primary/10" 
        : "border-border hover:border-primary/50";
    }
    
    if (option.correct) {
      return "border-green-500 bg-green-500/10";
    }
    
    if (selectedAnswer === option.id && !option.correct) {
      return "border-red-500 bg-red-500/10";
    }
    
    return "border-border";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header com progresso */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">{lessonData.title}</h1>
                <p className="text-muted-foreground">{lessonData.description}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">⚡</span>
                    <span className="font-semibold">{streak}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">💎</span>
                    <span className="font-semibold">{points}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between text-sm mb-2">
              <span>Lição {lessonData.currentLesson} de {lessonData.totalLessons}</span>
              <span>{lessonData.progress}% completo</span>
            </div>
            <Progress value={lessonData.progress} className="h-2" />
          </div>

          {/* Conteúdo da lição */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Pergunta */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">{lessonData.question.text}</h2>
              
              {lessonData.question.code && (
                <Card className="p-4 mb-6 bg-secondary">
                  <pre className="text-sm">
                    <code>{lessonData.question.code}</code>
                  </pre>
                </Card>
              )}
              
              <div className="space-y-3">
                {lessonData.question.options.map((option) => (
                  <Card
                    key={option.id}
                    className={`p-4 cursor-pointer transition-all duration-200 ${getOptionClassName(option)}`}
                    onClick={() => handleAnswerSelect(option.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                        <span className="text-xs font-semibold">{option.id.toUpperCase()}</span>
                      </div>
                      <code className="flex-1">{option.text}</code>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Área de ação */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Sua Resposta</h3>
              
              {!hasAnswered ? (
                <div>
                  <p className="text-muted-foreground mb-6">
                    Selecione a opção que você considera correta e clique em enviar.
                  </p>
                  <Button 
                    className="w-full gradient-primary text-white hover:opacity-90 transition-opacity"
                    onClick={handleSubmit}
                    disabled={!selectedAnswer}
                  >
                    Enviar Resposta
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    {lessonData.question.options.find(opt => opt.id === selectedAnswer)?.correct ? (
                      <div className="text-green-500">
                        <h4 className="font-semibold mb-2">🎉 Correto!</h4>
                        <p>Excelente! A palavra-chave 'var' é uma das formas de declarar variáveis em JavaScript.</p>
                      </div>
                    ) : (
                      <div className="text-red-500">
                        <h4 className="font-semibold mb-2">❌ Incorreto</h4>
                        <p>A resposta correta é a opção A. Em JavaScript, usamos 'var', 'let' ou 'const' para declarar variáveis.</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/languages')}
                      className="flex-1"
                    >
                      Voltar
                    </Button>
                    <Button 
                      className="flex-1 gradient-primary text-white hover:opacity-90 transition-opacity"
                      onClick={handleNext}
                    >
                      Próxima Lição
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
