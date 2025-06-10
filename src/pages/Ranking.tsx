import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Crown, Flame, Target } from "lucide-react";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";

interface RankingUser {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  total_points: number;
  current_streak: number;
  longest_streak: number;
  lessons_completed: number;
}

const Ranking = () => {
  const [topUsers, setTopUsers] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopUsers();
  }, []);

  const fetchTopUsers = async () => {
    try {
      // Buscar estatísticas dos usuários
      const { data: statsData, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .order('total_points', { ascending: false })
        .limit(10);

      if (statsError) {
        console.error('Erro ao buscar estatísticas:', statsError);
        return;
      }

      if (!statsData || statsData.length === 0) {
        setTopUsers([]);
        return;
      }

      // Buscar perfis dos usuários
      const userIds = statsData.map(stat => stat.user_id);
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .in('id', userIds);

      if (profilesError) {
        console.error('Erro ao buscar perfis:', profilesError);
        return;
      }

      // Combinar dados de estatísticas e perfis
      const transformedData = statsData.map(userStat => {
        const profile = profilesData?.find(p => p.id === userStat.user_id);
        return {
          id: profile?.id || userStat.user_id,
          username: profile?.username || null,
          full_name: profile?.full_name || null,
          avatar_url: profile?.avatar_url || null,
          total_points: userStat.total_points,
          current_streak: userStat.current_streak,
          longest_streak: userStat.longest_streak,
          lessons_completed: userStat.lessons_completed,
        };
      });

      console.log('Dados do ranking carregados:', transformedData);
      setTopUsers(transformedData);
    } catch (error) {
      console.error('Erro ao buscar ranking:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Trophy className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <Award className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getRankColor = (position: number) => {
    switch (position) {
      case 1:
        return "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30";
      case 2:
        return "from-gray-400/20 to-gray-500/20 border-gray-400/30";
      case 3:
        return "from-amber-600/20 to-amber-700/20 border-amber-600/30";
      default:
        return "from-muted/50 to-muted/30 border-border";
    }
  };

  const getDisplayName = (user: RankingUser) => {
    return user.full_name || user.username || "Usuário Anônimo";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-24 px-4">
          <div className="container mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Carregando ranking...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Trophy className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Ranking <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">CodeHero</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conheça os maiores heróis da programação da nossa plataforma
          </p>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border border-primary/20 rounded-lg rotate-12 opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border border-accent/20 rounded-full opacity-20"></div>
      </section>

      {/* Ranking Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {topUsers.length === 0 ? (
            <Card className="p-8 text-center">
              <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum usuário no ranking ainda</h3>
              <p className="text-muted-foreground">
                Seja o primeiro a aparecer no ranking completando lições e ganhando pontos!
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {topUsers.map((user, index) => {
                const position = index + 1;
                const displayName = getDisplayName(user);
                
                return (
                  <Card
                    key={user.id}
                    className={`p-6 bg-gradient-to-r ${getRankColor(position)} hover:shadow-lg transition-all duration-300 group ${
                      position <= 3 ? 'hover:-translate-y-1' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Posição */}
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm">
                        {position <= 3 ? (
                          getRankIcon(position)
                        ) : (
                          <span className="text-lg font-bold text-muted-foreground">#{position}</span>
                        )}
                      </div>

                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        {user.avatar_url ? (
                          <img
                            src={user.avatar_url}
                            alt={displayName}
                            className="w-14 h-14 rounded-full border-2 border-background/50"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border-2 border-background/50">
                            <span className="text-white font-bold text-lg">
                              {getInitials(displayName)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Informações do usuário */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold truncate">{displayName}</h3>
                          {position <= 3 && (
                            <Badge variant="secondary" className="text-xs">
                              Top {position}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            <span>{user.lessons_completed} lições</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Flame className="h-4 w-4" />
                            <span>{user.current_streak} dias</span>
                          </div>
                        </div>
                      </div>

                      {/* Pontuação */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {user.total_points.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">pontos</div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Ranking; 