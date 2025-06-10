
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Question {
  id: number;
  text: string;
  code?: string;
  options: {
    id: string;
    text: string;
    correct: boolean;
  }[];
}

const Lesson = () => {
  const { language, lessonId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Dados mock do quiz com 5 questões
  const quizData = {
    title: "Variáveis em JavaScript",
    description: "Aprenda como declarar e usar variáveis em JavaScript",
    questions: [
      {
        id: 1,
        text: "Qual é a forma correta de declarar uma variável em JavaScript?",
        code: "// Qual dessas opções está correta?",
        options: [
          { id: "a", text: "var myVariable = 'Hello';", correct: true },
          { id: "b", text: "variable myVariable = 'Hello';", correct: false },
          { id: "c", text: "declare myVariable = 'Hello';", correct: false },
          { id: "d", text: "myVariable := 'Hello';", correct: false }
        ]
      },
      {
        id: 2,
        text: "Qual palavra-chave introduzida no ES6 permite criar variáveis com escopo de bloco?",
        options: [
          { id: "a", text: "var", correct: false },
          { id: "b", text: "let", correct: true },
          { id: "c", text: "const", correct: false },
          { id: "d", text: "block", correct: false }
        ]
      },
      {
        id: 3,
        text: "Como você declara uma constante em JavaScript?",
        code: "// Selecione a sintaxe correta",
        options: [
          { id: "a", text: "const PI = 3.14;", correct: true },
          { id: "b", text: "constant PI = 3.14;", correct: false },
          { id: "c", text: "final PI = 3.14;", correct: false },
          { id: "d", text: "readonly PI = 3.14;", correct: false }
        ]
      },
      {
        id: 4,
        text: "Qual das seguintes variáveis foi declarada corretamente usando camelCase?",
        options: [
          { id: "a", text: "my_variable", correct: false },
          { id: "b", text: "MyVariable", correct: false },
          { id: "c", text: "myVariable", correct: true },
          { id: "d", text: "my-variable", correct: false }
        ]
      },
      {
        id: 5,
        text: "O que acontece quando você tenta redeclarar uma variável 'const'?",
        code: "const name = 'João';\nconst name = 'Maria';",
        options: [
          { id: "a", text: "A variável é atualizada normalmente", correct: false },
          { id: "b", text: "Ocorre um erro de sintaxe", correct: true },
          { id: "c", text: "Apenas um aviso é exibido", correct: false },
          { id: "d", text: "A primeira declaração é ignorada", correct: false }
        ]
      }
    ]
  };

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

  const handleAnswerSelect = (answerId: string) => {
    if (hasAnswered) return;
    setSelectedAnswer(answerId);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    setHasAnswered(true);
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    
    const isCorrect = currentQuestion.options.find(opt => opt.id === selectedAnswer)?.correct;
    
    if (isCorrect) {
      toast({
        title: "Parabéns! 🎉",
        description: "Resposta correta!",
      });
    } else {
      toast({
        title: "Ops! 😅",
        description: "Resposta incorreta. Continue tentando!",
        variant: "destructive"
      });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = async () => {
    if (!user) return;
    
    setLoading(true);
    
    // Calcular pontuação
    let score = 0;
    answers.forEach((answer, index) => {
      const question = quizData.questions[index];
      const isCorrect = question.options.find(opt => opt.id === answer)?.correct;
      if (isCorrect) score++;
    });

    try {
      // Salvar progresso no banco
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          language: language || 'javascript',
          lesson_id: parseInt(lessonId || '1'),
          score,
          total_questions: quizData.questions.length
        });

      if (error) {
        console.error('Erro ao salvar progresso:', error);
        toast({
          title: "Erro",
          description: "Não foi possível salvar seu progresso.",
          variant: "destructive"
        });
      } else {
        setQuizCompleted(true);
        toast({
          title: "Quiz Concluído! 🏆",
          description: `Você acertou ${score} de ${quizData.questions.length} questões!`,
        });
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNextLesson = () => {
    const nextLesson = parseInt(lessonId || '1') + 1;
    navigate(`/lesson/${language}/${nextLesson}`);
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      const question = quizData.questions[index];
      const isCorrect = question.options.find(opt => opt.id === answer)?.correct;
      if (isCorrect) score++;
    });
    return score;
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

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
            <p className="text-muted-foreground mb-6">
              Você precisa estar logado para acessar as lições.
            </p>
            <Button onClick={() => navigate('/auth')}>
              Fazer Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const finalScore = calculateScore();
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="p-8 text-center bg-card/50 backdrop-blur-sm">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏆</span>
                </div>
                <h1 className="text-3xl font-bold mb-2">Quiz Concluído!</h1>
                <p className="text-xl text-muted-foreground">
                  Você acertou {finalScore} de {quizData.questions.length} questões
                </p>
              </div>
              
              <div className="mb-8">
                <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {Math.round((finalScore / quizData.questions.length) * 100)}%
                </div>
                <p className="text-muted-foreground">Pontuação</p>
              </div>

              <div className="flex gap-4 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/languages')}
                >
                  Voltar aos Cursos
                </Button>
                <Button 
                  className="gradient-primary text-white hover:opacity-90 transition-opacity"
                  onClick={handleNextLesson}
                >
                  Próxima Lição
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header com progresso */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">{quizData.title}</h1>
                <p className="text-muted-foreground">{quizData.description}</p>
              </div>
            </div>
            
            <div className="flex justify-between text-sm mb-2">
              <span>Questão {currentQuestionIndex + 1} de {quizData.questions.length}</span>
              <span>{Math.round(progress)}% completo</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Conteúdo da lição */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Pergunta */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">{currentQuestion.text}</h2>
              
              {currentQuestion.code && (
                <Card className="p-4 mb-6 bg-secondary">
                  <pre className="text-sm">
                    <code>{currentQuestion.code}</code>
                  </pre>
                </Card>
              )}
              
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
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
                    {currentQuestion.options.find(opt => opt.id === selectedAnswer)?.correct ? (
                      <div className="text-green-500">
                        <h4 className="font-semibold mb-2">🎉 Correto!</h4>
                        <p>Excelente! Você acertou esta questão.</p>
                      </div>
                    ) : (
                      <div className="text-red-500">
                        <h4 className="font-semibold mb-2">❌ Incorreto</h4>
                        <p>A resposta correta é: {currentQuestion.options.find(opt => opt.correct)?.text}</p>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full gradient-primary text-white hover:opacity-90 transition-opacity"
                    onClick={handleNext}
                    disabled={loading}
                  >
                    {currentQuestionIndex < quizData.questions.length - 1 ? 'Próxima Questão' : 'Finalizar Quiz'}
                  </Button>
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
