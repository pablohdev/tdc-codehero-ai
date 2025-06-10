
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Demo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Veja o CodeHero em Ação
            </h1>
            <p className="text-xl text-muted-foreground">
              Descubra como nossa plataforma gamificada torna o aprendizado de programação divertido e eficaz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">📚 Lições Interativas</h3>
              <div className="space-y-3 mb-4">
                <div className="bg-secondary p-3 rounded">
                  <code className="text-sm">console.log("Hello, World!");</code>
                </div>
                <p className="text-sm text-muted-foreground">
                  Aprenda conceitos através de exemplos práticos e exercícios hands-on.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">🎮 Sistema de Pontuação</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">💎</span>
                  <span className="font-semibold">1,250 pontos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">⚡</span>
                  <span className="font-semibold">7 dias</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Ganhe pontos e mantenha sua sequência para subir de nível!
              </p>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 mb-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Pronto para começar?</h3>
              <p className="text-muted-foreground mb-6">
                Experimente uma lição completa e veja como o CodeHero pode acelerar seu aprendizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="gradient-primary text-white hover:opacity-90 transition-opacity"
                  onClick={() => navigate('/lesson/javascript/1')}
                >
                  Testar Lição Demo
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/languages')}
                  className="border-primary/30 hover:bg-primary/10"
                >
                  Ver Todas as Linguagens
                </Button>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Recursos Principais</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="font-semibold mb-2">Foco no Prático</h4>
                <p className="text-sm text-muted-foreground">
                  Exercícios baseados em projetos reais
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-semibold mb-2">Feedback Instantâneo</h4>
                <p className="text-sm text-muted-foreground">
                  Correções e dicas em tempo real
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🏆</div>
                <h4 className="font-semibold mb-2">Conquistas</h4>
                <p className="text-sm text-muted-foreground">
                  Sistema de recompensas motivador
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
