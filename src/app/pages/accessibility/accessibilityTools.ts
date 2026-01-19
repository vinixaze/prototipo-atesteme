import { Eye, Volume2, Smartphone, Monitor } from "lucide-react";
import type { AccessibilityTool } from "./types";

export const accessibilityTools: AccessibilityTool[] = [
  {
    id: "vlibras",
    name: "VLibras",
    description: "Tradutor de conteÇ§do digital para Libras",
    fullDescription:
      "As aplicaÇõÇæes da SuÇðte VLibras permitem que pessoas surdas acessem conteÇ§do multimÇðdia em sua lÇðngua natural de comunicaÇõÇœo, o que contribui para com a acessibilidade de computadores, dispositivos mÇüveis e pÇ­ginas Web.",
    icon: Eye,
    gradient: "from-[#1E40AF] to-[#3B82F6]",
    platforms: ["Windows", "Linux", "macOS", "Android", "Chrome", "Firefox"],
    downloadLink: "https://www.gov.br/governodigital/pt-br/vlibras",
    learnMoreLink: "https://www.gov.br/governodigital/pt-br/vlibras",
    features: [
      "TraduÇõÇœo automÇ­tica de texto para Libras",
      "Avatar 3D realista",
      "CompatÇðvel com navegadores web",
      "Aplicativo mÇüvel disponÇðvel",
      "Software gratuito e open source",
    ],
  },
  {
    id: "talkback",
    name: "Google TalkBack",
    description: "Leitor de tela para Android",
    fullDescription:
      "O TalkBack Ç¸ o leitor de tela do Google incluÇðdo em dispositivos Android. O TalkBack oferece feedback falado para que vocÇ¦ possa usar seu dispositivo sem olhar para a tela.",
    icon: Volume2,
    gradient: "from-[#7C3AED] to-[#A855F7]",
    platforms: ["Android"],
    downloadLink: "https://play.google.com/store/apps/details?id=com.google.android.marvin.talkback",
    learnMoreLink: "https://support.google.com/accessibility/android/answer/6283677",
    features: [
      "Feedback por voz de aÇõÇæes na tela",
      "Gestos de navegaÇõÇœo personalizÇ­veis",
      "Suporte a braille",
      "Controle de velocidade de fala",
      "Integrado ao Android",
    ],
  },
  {
    id: "voiceover",
    name: "VoiceOver",
    description: "Leitor de tela da Apple",
    fullDescription:
      "O VoiceOver Ç¸ um leitor de tela lÇðder do setor baseado em gestos que permite aproveitar o iPhone, iPad e iPod touch mesmo que vocÇ¦ nÇœo consiga ver a tela.",
    icon: Smartphone,
    gradient: "from-[#059669] to-[#10B981]",
    platforms: ["iOS", "macOS"],
    downloadLink: "https://www.apple.com/br/accessibility/voiceover/",
    learnMoreLink: "https://support.apple.com/pt-br/guide/iphone/iph3e2e415f/ios",
    features: [
      "DescriÇõÇœo de elementos na tela",
      "Gestos intuitivos para navegaÇõÇœo",
      "Rotor para acesso rÇ­pido",
      "Suporte a mais de 30 idiomas",
      "PrÇ¸-instalado em dispositivos Apple",
    ],
  },
  {
    id: "narrador",
    name: "Narrador do Windows",
    description: "Leitor de tela integrado ao Windows",
    fullDescription:
      "O Narrador Ç¸ um leitor de tela integrado ao Windows 10 e Windows 11 que lÇ¦ o texto na tela e descreve eventos, como notificaÇõÇæes e compromissos do calendÇ­rio.",
    icon: Monitor,
    gradient: "from-[#DC2626] to-[#EF4444]",
    platforms: ["Windows 10", "Windows 11"],
    downloadLink:
      "https://support.microsoft.com/pt-br/windows/guia-completo-do-narrador-e4397a0d-ef4f-b386-d8ae-c172f109bdb1",
    learnMoreLink:
      "https://support.microsoft.com/pt-br/windows/cap%C3%ADtulo-1-introdu%C3%A7%C3%A3o-ao-narrador-7fe8fd72-541f-4536-7658-bfc37ddaf9c6",
    features: [
      "Leitura de texto e descriÇõÇœo de eventos",
      "Comandos de teclado para navegaÇõÇœo",
      "Suporte a displays braille",
      "Vozes naturais em mÇ§ltiplos idiomas",
      "Integrado ao sistema operacional",
    ],
  },
  {
    id: "ubuntu",
    name: "Acessibilidade no Ubuntu",
    description: "Recursos de acessibilidade do Ubuntu",
    fullDescription:
      "O Ubuntu oferece um conjunto completo de ferramentas de acessibilidade, incluindo leitor de tela Orca, ampliaÇõÇœo de tela, teclado na tela e muito mais para tornar o sistema operacional acessÇðvel a todos.",
    icon: Monitor,
    gradient: "from-[#EA580C] to-[#F97316]",
    platforms: ["Ubuntu", "Linux"],
    downloadLink: "https://help.ubuntu.com/stable/ubuntu-help/a11y.html.pt_BR",
    learnMoreLink: "https://ubuntu.com/accessibility",
    features: [
      "Leitor de tela Orca integrado",
      "Ampliador de tela",
      "Teclado virtual na tela",
      "Alto contraste e temas acessÇðveis",
      "Software livre e gratuito",
    ],
  },
];
