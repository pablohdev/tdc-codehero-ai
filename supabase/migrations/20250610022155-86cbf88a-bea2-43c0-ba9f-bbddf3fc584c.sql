
-- Criar tabela para armazenar o progresso dos usuários
CREATE TABLE public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  language TEXT NOT NULL,
  lesson_id INTEGER NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 5,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(user_id, language, lesson_id)
);

-- Criar tabela para armazenar estatísticas gerais do usuário
CREATE TABLE public.user_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  total_points INTEGER NOT NULL DEFAULT 0,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  lessons_completed INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(user_id)
);

-- Habilitar RLS nas tabelas
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para user_progress
CREATE POLICY "Users can view their own progress" 
  ON public.user_progress 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" 
  ON public.user_progress 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
  ON public.user_progress 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Políticas RLS para user_stats
CREATE POLICY "Users can view their own stats" 
  ON public.user_stats 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stats" 
  ON public.user_stats 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats" 
  ON public.user_stats 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Função para atualizar estatísticas do usuário
CREATE OR REPLACE FUNCTION public.update_user_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Inserir ou atualizar estatísticas do usuário
  INSERT INTO public.user_stats (user_id, total_points, lessons_completed)
  VALUES (
    NEW.user_id,
    NEW.score * 10, -- 10 pontos por acerto
    1
  )
  ON CONFLICT (user_id) 
  DO UPDATE SET
    total_points = user_stats.total_points + (NEW.score * 10),
    lessons_completed = user_stats.lessons_completed + 1,
    current_streak = CASE 
      WHEN NEW.score >= 3 THEN user_stats.current_streak + 1 
      ELSE 0 
    END,
    longest_streak = CASE 
      WHEN NEW.score >= 3 AND user_stats.current_streak + 1 > user_stats.longest_streak 
      THEN user_stats.current_streak + 1 
      ELSE user_stats.longest_streak 
    END,
    updated_at = now();
    
  RETURN NEW;
END;
$$;

-- Trigger para atualizar estatísticas quando progresso é inserido
CREATE OR REPLACE TRIGGER on_progress_created
  AFTER INSERT ON public.user_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_user_stats();
