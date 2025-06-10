
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow">
              Aprenda a Programar
              <span className="block">Como um Herói</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Domine JavaScript, Python, HTML e muito mais através de desafios gamificados 
              e lições interativas que tornam o aprendizado divertido e eficaz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gradient-primary text-white text-lg px-8 py-6 hover:opacity-90 transition-opacity"
                onClick={() => navigate('/languages')}
              >
                Começar Jornada
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10"
                onClick={() => navigate('/demo')}
              >
                Ver Demo
              </Button>
            </div>
          </div>
          
          {/* Floating Code Elements */}
          <div className="mt-16 relative">
            <div className="animate-float">
              <Card className="inline-block p-4 bg-card/50 backdrop-blur-sm border-primary/20">
                <pre className="text-primary">
                  <code>{`function hero() {\n  return "Amazing!";\n}`}</code>
                </pre>
              </Card>
            </div>
            <div className="animate-float" style={{ animationDelay: '2s' }}>
              <Card className="inline-block p-4 ml-8 bg-card/50 backdrop-blur-sm border-accent/20">
                <pre className="text-accent">
                  <code>{`<h1>Hello World!</h1>`}</code>
                </pre>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Por que escolher o <span className="text-primary">CodeHero</span>?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🎮</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Aprendizado Gamificado</h3>
              <p className="text-muted-foreground">
                Ganhe pontos, suba de nível e desbloqueie conquistas enquanto aprende programação de forma divertida.
              </p>
            </Card>
            
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-colors">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Feedback Imediato</h3>
              <p className="text-muted-foreground">
                Receba correções e explicações detalhadas em tempo real para acelerar seu aprendizado.
              </p>
            </Card>
            
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Projetos Práticos</h3>
              <p className="text-muted-foreground">
                Aplique conhecimentos em desafios reais e construa um portfólio impressionante.
              </p>
            </Card>
          </div>
        </div>
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
