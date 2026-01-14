import {
  BarChart3,
  Code,
  FileEdit,
  Files,
  Fingerprint,
  FolderOpen,
  Heart,
  Image as ImageIcon,
  Lock,
  MessageCircle,
  Search,
  Share2,
  Shield,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";

export interface Competency {
  title: string;
  icon: any;
}

export interface Category {
  name: string;
  color: string;
  bgColor: string;
  icon: any;
  competencias: Competency[];
}

export const categories: Category[] = [
  {
    name: "INFORMA�?�.ES E DADOS",
    color: "#FFD700",
    bgColor: "#FFF9E6",
    icon: BarChart3,
    competencias: [
      { title: "Realizar pesquisa e monitoramento", icon: Search },
      { title: "Realizar o tratamento de dados", icon: BarChart3 },
      { title: "Gerenciar dados", icon: FolderOpen },
    ],
  },
  {
    name: "COMUNICA�?�fOO E COLABORA�?�fO",
    color: "#00BCD4",
    bgColor: "#E0F7FA",
    icon: Users,
    competencias: [
      { title: "Interagir", icon: MessageCircle },
      { title: "Gerir a identidade digital", icon: Fingerprint },
      { title: "Compartilhar e publicar", icon: Share2 },
      { title: "Colaborar", icon: Users },
    ],
  },
  {
    name: "CRIA�?�fO DE CONTE�sDO",
    color: "#FF9800",
    bgColor: "#FFF3E0",
    icon: FileEdit,
    competencias: [
      { title: "Programar sistemas", icon: Code },
      { title: "Editar texto multimídia", icon: ImageIcon },
      { title: "Editar texto escrito", icon: FileEdit },
      { title: "Adaptar arquivos", icon: Files },
    ],
  },
  {
    name: "PROTE�?�Z�?ŸO E SEGURAN�?�ZA",
    color: "#4CAF50",
    bgColor: "#E8F5E9",
    icon: Shield,
    competencias: [
      { title: "Proteger o ambiente digital", icon: Shield },
      { title: "Proteger dados pessoais e privacidade", icon: Lock },
      { title: "Proteger a saúde e o meio ambiente", icon: Heart },
    ],
  },
  {
    name: "RESOLU�?�fO DE PROBLEMAS",
    color: "#E91E63",
    bgColor: "#FCE4EC",
    icon: Wrench,
    competencias: [
      { title: "Resolver problemas técnicos", icon: Wrench },
      { title: "Evoluir em um ambiente digital", icon: TrendingUp },
    ],
  },
];
