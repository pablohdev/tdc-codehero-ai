import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Code, Trophy, Zap, Layers } from "lucide-react";

// Card decorator component for the feature cards
const CardDecorator = () => (
  <>
    <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
    <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
    <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
    <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
  </>
);

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 overflow-hidden relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col space-y-6">
              <Badge variant="outline" className="w-fit animate-fade-in">
                <span className="text-primary font-medium">Novo</span> - Aprenda programação de forma divertida
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                Aprenda a Programar 
                <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Como um Herói
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-md">
                Domine JavaScript, Python, HTML e muito mais através de desafios gamificados 
                e lições interativas que tornam o aprendizado divertido e eficaz.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button 
                  size="lg" 
                  className="gap-2 text-white text-lg px-8 py-6 hover:opacity-90 transition-opacity"
                  onClick={() => navigate('/languages')}
                >
                  Começar Jornada
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 text-lg px-8 py-6 border-primary/30 hover:bg-primary/10"
                  onClick={() => navigate('/demo')}
                >
                  Ver Demo
                  <BookOpen className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent border-2 border-background"></div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Junte-se a <span className="font-bold text-foreground">+10.000</span> estudantes
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 grid grid-cols-3 gap-4 p-4">
                <Card className="col-span-2 row-span-1 p-4 bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Code className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">HTML & CSS</h3>
                      <p className="text-xs text-muted-foreground">Fundamentos</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="col-span-1 row-span-2 p-4 bg-card/80 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-colors animate-float" style={{ animationDelay: '0.2s' }}>
                  <div className="flex flex-col h-full justify-between">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-accent" />
                    </div>
                    <div className="text-center mt-4">
                      <span className="text-4xl font-bold text-accent">42</span>
                      <p className="text-xs text-muted-foreground">dias seguidos</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="col-span-2 row-span-1 p-4 bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors animate-float" style={{ animationDelay: '0.4s' }}>
                  <pre className="text-primary text-sm">
                    <code>{`function hero() {\n  return "Amazing!";\n}`}</code>
                  </pre>
                </Card>
                
                <Card className="col-span-1 row-span-1 p-4 bg-card/80 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-colors animate-float" style={{ animationDelay: '0.6s' }}>
                  <div className="flex items-center justify-center h-full">
                    <span className="text-2xl">🚀</span>
                  </div>
                </Card>
                
                <Card className="col-span-2 row-span-1 p-4 bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors animate-float" style={{ animationDelay: '0.8s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                      <span className="text-white text-sm font-bold">JS</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-lg rotate-12 opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 border border-accent/20 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-primary/40 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-accent/40 rounded-full"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que escolher o <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">CodeHero</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nossa plataforma combina tecnologia de ponta com métodos de ensino comprovados para oferecer a melhor experiência de aprendizado.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="group relative overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardDecorator />
              <div className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-primary/20 transition-all duration-300">
                  <span className="text-white text-2xl">🎮</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Aprendizado Gamificado</h3>
                <p className="text-muted-foreground">
                  Ganhe pontos, suba de nível e desbloqueie conquistas enquanto aprende programação de forma divertida e envolvente.
                </p>
                <div className="mt-6 flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Saiba mais</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Card>
            
            {/* Card 2 */}
            <Card className="group relative overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardDecorator />
              <div className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent/70 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-accent/20 transition-all duration-300">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">Feedback Imediato</h3>
                <p className="text-muted-foreground">
                  Receba correções e explicações detalhadas em tempo real para acelerar seu aprendizado e evitar erros comuns.
                </p>
                <div className="mt-6 flex items-center text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Saiba mais</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Card>
            
            {/* Card 3 */}
            <Card className="group relative overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardDecorator />
              <div className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/80 to-accent/80 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-primary/20 transition-all duration-300">
                  <Layers className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary/90 transition-colors">Projetos Práticos</h3>
                <p className="text-muted-foreground">
                  Aplique conhecimentos em desafios reais e construa um portfólio impressionante que demonstra suas habilidades.
                </p>
                <div className="mt-6 flex items-center text-primary/90 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Saiba mais</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Card>
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 text-lg px-8 py-6 border-primary/30 hover:bg-primary/10"
              onClick={() => navigate('/features')}
            >
              Explorar Todos os Recursos
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para se tornar um <span className="text-primary">CodeHero</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de desenvolvedores que já transformaram suas carreiras conosco.
          </p>
          <Button 
            size="lg" 
            className="gradient-primary text-white text-lg px-8 py-6 hover:opacity-90 transition-opacity"
            onClick={() => navigate('/languages')}
          >
            Iniciar Agora - É Grátis!
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
