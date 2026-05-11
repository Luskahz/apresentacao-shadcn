import { useState } from "react";
import { Check, ChevronRight, Copy, LayoutDashboard, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FlipCard } from "@/components/ui/flip-card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const techStack = [
  {
    name: "React",
    role: "estrutura",
    stage: 1,
    description: "Os componentes são escritos como componentes React comuns.",
    example: "<Button />",
  },
  {
    name: "Tailwind CSS",
    role: "estilo",
    stage: 2,
    description: "Define o visual usando classes utilitárias direto nos componentes.",
    example: "rounded-md px-4 py-2",
  },
  {
    name: "Radix UI",
    role: "comportamento",
    stage: 3,
    description: "Base acessível para componentes interativos como Dialog, Select e Dropdown.",
    example: "Dialog, Select, Popover",
  },
  {
    name: "Lucide React",
    role: "ícones",
    stage: 4,
    description: "Fornece ícones leves e consistentes para usar nos componentes.",
    example: "<Copy />",
  },
  {
    name: "CVA",
    role: "variantes",
    stage: 5,
    description: "Organiza variações de estilo, como default, outline e destructive.",
    example: 'variant="outline"',
  },
  {
    name: "CLI do shadcn",
    role: "instalação",
    stage: 6,
    description: "Adiciona os componentes como arquivos dentro do projeto.",
    example: "npx shadcn@latest add button",
  },
];

const techRows = [techStack.slice(0, 3), techStack.slice(3, 6)];

const mainComponents = ["Button", "Input", "Card", "Dialog", "Table", "Select", "Dropdown", "Tabs", "Form", "Toast / Sonner"];


const repeatedInterfaceBlocks = [
  "Button",
  "Input",
  "Card",
  "Modal",
  "Table",
  "Menu",
  "Form",
];

const manualComponentSteps = [
  "criar arquivo",
  "montar componente",
  "definir props",
  "aplicar Tailwind",
  "exportar",
  "repetir em outra tela",
];

const noPatternProblems = [
  "código duplicado",
  "visual inconsistente",
  "manutenção difícil",
  "comportamento diferente",
];

const shadcnBenefits = [
  "base pronta",
  "código no projeto",
  "customização livre",
  "padrão visual",
];

const stackCompositionSteps = [
  "React monta o componente.",
  "Lucide entra com os ícones da interface.",
  "Radix cuida do comportamento e da acessibilidade.",
  "Tailwind + CVA organizam o visual e as variantes.",
  "A CLI copia o componente para dentro do projeto.",
];

const stackCompositionSnippet = `// Exemplo de uso no React
<Button variant="destructive" className="gap-2">
  <Copy className="size-4" />
  Copiar
</Button>

// O visual vem das variantes
// A estrutura continua sendo React
// O código fica em components/ui/button.jsx`;


const promptText =
  "Crie uma tela de dashboard em React usando Shadcn/UI com Card, Button, Table e Dialog. Use Tailwind CSS e organize uma tabela de usuários.";

const loginSnippet = `import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Entrar no sistema</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input placeholder="E-mail" />
          <Input placeholder="Senha" type="password" />
          <Button className="w-full">Entrar</Button>
        </CardContent>
      </Card>
    </main>
  );
}`;

function CodeBlock({ className, code, copyText = code }) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(copyText);
      toast.success("Código copiado");
    } catch {
      toast.error("Não consegui copiar o código");
    }
  }

  return (
    <div className={cn("relative overflow-hidden rounded-[24px] border border-white/10 bg-[#09120f] shadow-inner", className)}>
      <div className="absolute left-4 top-4 flex gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
      </div>
      <Button className="absolute right-4 top-3 h-9 rounded-full px-3" size="sm" variant="ghost" onClick={handleCopy}>
        <Copy className="size-4" />
        Copiar
      </Button>
      <pre className="overflow-x-auto p-6 pt-14 text-sm leading-7 text-emerald-50">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function SlideShell({ slide, children }) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <Badge>{slide.category}</Badge>
        <Badge variant="muted">{slide.speaker}</Badge>
        <Badge variant="outline">{slide.duration}</Badge>
      </div>
      {children}
    </div>
  );
}

export function SlideRenderer({ case3VisibleCards = 0, case5VisibleStages = 0, slide }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginMessage, setLoginMessage] = useState("Demo funcional com o fluxo representado em React.");
  const [variant, setVariant] = useState("default");

  function runLoginDemo() {
    if (!loginEmail) {
      setLoginMessage("Digite um e-mail para testar a interação.");
      toast.error("Campo obrigatório: e-mail");
      return;
    }

    setLoginMessage(`Login demo enviado para ${loginEmail}`);
    toast.success("Login demo executado");
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(promptText);
      toast.success("Prompt copiado");
    } catch {
      toast.error("Não consegui copiar o prompt");
    }
  }

  switch (slide.id) {
    case 1:
      return (
        <SlideShell slide={slide}>
          <Card className="overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(170,255,47,0.22),_transparent_28%),linear-gradient(135deg,#052824_0%,#0a3b35_45%,#082925_100%)] text-white">
            <CardContent className="grid min-h-[70vh] place-items-center px-10 py-16">
              <div className="flex max-w-4xl flex-col items-center gap-6 text-center">
                <div className="presentation-mark" />
                <Badge className="bg-white/10 text-white">Shadcn/UI</Badge>
                <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
                  Componentes de UI modernos para projetos React
                </h1>
                <p className="max-w-3xl text-lg text-white/78 md:text-2xl">
                  Entender o que é, por que usar, como funciona na prática e como a IA pode ajudar a construir telas melhores.
                </p>
                <div className="grid gap-3 rounded-[28px] border border-white/10 bg-white/8 px-6 py-5 text-left backdrop-blur">
                  <span>Hoje vamos sair do conceito para a prática.</span>
                  <span>Cada slide agora é uma página React usando componentes no estilo Shadcn.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </SlideShell>
      );
    case 2:
      return (
        <SlideShell slide={slide}>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <Card>
              <CardHeader>
                <CardTitle className="text-4xl tracking-[-0.05em] md:text-5xl">O que é Shadcn/UI?</CardTitle>
                <CardDescription className="text-base md:text-lg">
                  Uma coleção de componentes para React muito usada com Next.js, Vite e Tailwind CSS.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 text-base leading-7 text-[var(--muted)] md:text-lg">
                <p>O ponto mais importante é que ele não funciona como uma biblioteca tradicional escondida no projeto.</p>
                <p>Quando você adiciona um componente, o código entra na base da aplicação e passa a ser responsabilidade da equipe.</p>
                <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface-2)] p-5 text-foreground">
                  <strong>Ideia-chave:</strong> o componente vira código do próprio projeto, o que dá mais controle para alterar visual, estrutura e comportamento.
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-6">
              <CodeBlock code={`npx shadcn@latest add button\n\ncomponents/ui/button.tsx`} />
              <Card className="bg-[#0d1110] text-emerald-50">
                <CardContent className="flex flex-wrap gap-3 p-6">
                  {["React", "Next.js", "Vite", "Tailwind CSS"].map((item) => (
                    <Badge className="bg-white/8 text-white" key={item}>
                      {item}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </SlideShell>
      );
      case 3:
  return (
    <SlideShell slide={slide}>
      <Card>
        <CardHeader className="max-w-5xl pb-4">
          <CardTitle className="text-3xl tracking-[-0.05em] md:text-4xl">
            Problema das interfaces repetitivas
          </CardTitle>

          <CardDescription className="text-sm md:text-base">
            Todo sistema repete os mesmos blocos de interface. O problema começa quando
            cada tela recria esses blocos sem uma base comum.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {repeatedInterfaceBlocks.map((item) => (
              <Badge key={item} variant="muted">
                {item}
              </Badge>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.9fr_1fr_1fr]">
            <FlipCard
              back={
                <Card className="h-full overflow-hidden bg-[var(--surface-2)] text-foreground shadow-none">
                  <CardHeader className="p-5 pb-2">
                    <CardTitle className="text-lg">Fluxo comum</CardTitle>
                    <CardDescription className="text-xs leading-5">
                      O trabalho repetitivo antes de criar a regra real da tela.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-1.5 px-5 pb-4 text-[15px] leading-4">
                    {manualComponentSteps.map((step, index) => (
                      <div
                        className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5"
                        key={step}
                      >
                        <span className="grid size-4 shrink-0 place-items-center rounded-full bg-emerald-400 text-[10px] font-semibold text-emerald-950">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              }
              className="h-[330px]"
              flipped={case3VisibleCards >= 1}
              front={
                <Card className="grid h-full place-items-center overflow-hidden bg-[var(--surface-2)] p-5 text-center text-foreground shadow-none">
                  <CardTitle className="text-2xl tracking-[-0.04em] md:text-3xl">
                    Fluxo comum
                  </CardTitle>
                </Card>
              }
            />

            <FlipCard
              back={
                <Card className="h-full overflow-hidden bg-rose-300/92 text-rose-950 shadow-none">
                  <CardHeader className="p-5 pb-2">
                    <CardTitle className="text-lg">Sem padronização</CardTitle>
                    <CardDescription className="text-xs leading-5 text-rose-950/80">
                      Cada componente nasce de um jeito.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-2 px-5 pb-5 text-xs leading-5">
                    <div className="rounded-xl bg-rose-950/10 px-3 py-2 font-mono text-xs">
                      Button ≠ Button ≠ Button
                    </div>

                    <div className="grid gap-2">
                      {noPatternProblems.map((problem) => (
                        <div className="rounded-xl bg-rose-950/10 px-3 py-2" key={problem}>
                          {problem}
                        </div>
                      ))}
                    </div>

                    <p className="pt-1">
                      A interface funciona, mas fica mais difícil evoluir sem quebrar padrão.
                    </p>
                  </CardContent>
                </Card>
              }
              className="h-[330px]"
              flipped={case3VisibleCards >= 2}
              front={
                <Card className="grid h-full place-items-center overflow-hidden bg-rose-300/92 p-5 text-center text-rose-950 shadow-none">
                  <CardTitle className="text-2xl tracking-[-0.04em] md:text-3xl">
                    Sem padronização
                  </CardTitle>
                </Card>
              }
            />

            <FlipCard
              back={
                <Card className="h-full overflow-hidden bg-emerald-400/90 text-emerald-950 shadow-none">
                  <CardHeader className="p-5 pb-2">
                    <CardTitle className="text-lg">Com shadcn/ui</CardTitle>
                    <CardDescription className="text-xs leading-5 text-emerald-950/80">
                      Você parte de uma base pronta e editável.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-2 px-5 pb-5 text-xs leading-5">
                    <div className="rounded-xl bg-emerald-950/10 px-3 py-2 font-mono text-xs">
                      npx shadcn@latest add button
                    </div>

                    <div className="grid gap-2">
                      {shadcnBenefits.map((benefit) => (
                        <div className="rounded-xl bg-emerald-950/10 px-3 py-2" key={benefit}>
                          {benefit}
                        </div>
                      ))}
                    </div>

                    <p className="pt-1 font-semibold">
                      Menos repetição. Mais padrão. Mais controle.
                    </p>
                  </CardContent>
                </Card>
              }
              className="h-[330px]"
              flipped={case3VisibleCards >= 3}
              front={
                <Card className="grid h-full place-items-center overflow-hidden bg-emerald-400/90 p-5 text-center text-emerald-950 shadow-none">
                  <CardTitle className="text-2xl tracking-[-0.04em] md:text-3xl">
                    Com shadcn
                  </CardTitle>
                </Card>
              }
            />
          </div>

          <div className="rounded-[22px] border border-[var(--border)] bg-[var(--surface-2)] p-4 text-sm leading-6 text-[var(--muted)]">
            <strong className="text-foreground">Ideia central:</strong>{" "}
            o shadcn/ui não resolve a regra de negócio. Ele reduz o trabalho repetitivo
            da interface, entregando uma base visual pronta para o desenvolvedor adaptar.
          </div>
        </CardContent>
      </Card>
    </SlideShell>
  );
  
      case 4:
      return (
        <SlideShell slide={slide}>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Card>
              <CardHeader>
                <CardTitle className="text-4xl tracking-[-0.05em] md:text-5xl">Como ele funciona</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {[
                  "Inicializa o projeto com a CLI.",
                  "Adiciona componentes individualmente.",
                  "Recebe os arquivos em components/ui.",
                  "Customiza e mantém esses componentes no projeto.",
                ].map((step, index) => (
                  <div className="flex items-start gap-4 rounded-[22px] border border-[var(--border)] bg-[var(--surface-2)] p-5" key={step}>
                    <div className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-400 font-semibold text-emerald-950">
                      {index + 1}
                    </div>
                    <p className="text-base leading-7 text-[var(--muted)] md:text-lg">{step}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <CodeBlock
              code={`$ npx shadcn@latest init\n$ npx shadcn@latest add button\n$ npx shadcn@latest add card\n$ npx shadcn@latest add input\n\ncomponents/ui/\n  button.tsx\n  card.tsx\n  input.tsx`}
            />
          </div>
        </SlideShell>
      );
      case 5:
  return (
    <SlideShell slide={slide}>
      <Card>
        <CardHeader className="max-w-5xl pb-4">
          <CardTitle className="text-3xl tracking-[-0.05em] md:text-4xl">
            Tecnologias usadas
          </CardTitle>

          <CardDescription className="text-sm md:text-base">
            O shadcn/ui combina várias ferramentas. Cada uma resolve uma parte da interface:
            estrutura, estilo, acessibilidade, variantes e instalação.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {techRows.map((row, rowIndex) => (
              <div className="grid gap-4 lg:grid-cols-3" key={rowIndex}>
                {row.map((tech) => (
                  <FlipCard
                    back={
                      <Card className="h-full overflow-hidden bg-[var(--surface-2)] shadow-none">
                        <CardHeader className="p-5 pb-3">
                          <div className="flex items-center justify-between gap-3">
                            <CardTitle className="text-xl">{tech.name}</CardTitle>
                            <Badge variant="muted">{tech.role}</Badge>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-3 px-5 pb-5">
                          <p className="text-sm leading-6 text-[var(--muted)]">
                            {tech.description}
                          </p>

                          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 font-mono text-xs text-[var(--muted)]">
                            {tech.example}
                          </div>
                        </CardContent>
                      </Card>
                    }
                    className="h-[250px]"
                    flipped={case5VisibleStages >= tech.stage}
                    front={
                      <Card className="grid h-full place-items-center bg-[var(--surface-2)] p-5 text-center shadow-none">
                        <div className="space-y-3">
                          <Badge variant="outline">{tech.role}</Badge>
                          <CardTitle className="text-2xl tracking-[-0.04em]">{tech.name}</CardTitle>
                        </div>
                      </Card>
                    }
                    key={tech.name}
                  />
                ))}
              </div>
            ))}

            <div className="grid gap-4 lg:grid-cols-2">
              <FlipCard
                back={
                  <Card className="h-full overflow-hidden bg-[var(--surface-2)] shadow-none">
                    <CardHeader className="p-5 pb-3">
                      <CardTitle className="text-xl">Como as peças se encaixam</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 px-5 pb-5 text-sm leading-6 text-[var(--muted)]">
                      {stackCompositionSteps.map((step) => (
                        <div className="rounded-xl bg-[var(--surface)] px-4 py-3" key={step}>
                          {step}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                }
                className="h-[320px]"
                flipped={case5VisibleStages >= 7}
                front={
                  <Card className="grid h-full place-items-center bg-[var(--surface-2)] p-5 text-center shadow-none">
                    <div className="space-y-3">
                      <Badge variant="outline">Fluxo</Badge>
                      <CardTitle className="text-2xl tracking-[-0.04em]">
                        Como as peças se encaixam
                      </CardTitle>
                    </div>
                  </Card>
                }
              />

              <FlipCard
                back={<CodeBlock className="h-full" code={stackCompositionSnippet} />}
                className="h-[320px]"
                flipped={case5VisibleStages >= 7}
                front={
                  <Card className="grid h-full place-items-center border-white/10 bg-[#09120f] p-5 text-center text-emerald-50 shadow-none">
                    <div className="space-y-3">
                      <Badge className="border-white/10 bg-white/8 text-white">Código</Badge>
                      <CardTitle className="text-2xl tracking-[-0.04em] text-emerald-50">
                        Exemplo em código
                      </CardTitle>
                    </div>
                  </Card>
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </SlideShell>
  );
    case 6:
      return (
        <SlideShell slide={slide}>
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl tracking-[-0.05em] md:text-5xl">Comparação com Bootstrap e Material UI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="overflow-hidden rounded-[24px] border border-[var(--border)]">
                <div className="grid grid-cols-3 bg-[#072823] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/76">
                  <span>Ferramenta</span>
                  <span>Como funciona</span>
                  <span>Controle</span>
                </div>
                {[
                  ["Bootstrap", "Usa classes prontas", "Médio"],
                  ["Material UI", "Usa componentes de um pacote", "Médio"],
                  ["Shadcn/UI", "Copia o código para o projeto", "Alto"],
                ].map(([name, model, control]) => (
                  <div
                    className={`grid grid-cols-3 px-6 py-5 text-base ${name === "Shadcn/UI" ? "bg-emerald-400/90 font-semibold text-emerald-950" : "bg-[var(--surface)] text-[var(--muted)]"}`}
                    key={name}
                  >
                    <span className={name === "Shadcn/UI" ? "text-emerald-950" : "text-foreground"}>{name}</span>
                    <span>{model}</span>
                    <span>{control}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface-2)] p-5 text-base leading-7 text-[var(--muted)] md:text-lg">
                No Bootstrap e no Material UI, o projeto consome uma biblioteca. No Shadcn, o projeto recebe o código do componente e pode alterar diretamente.
              </div>
            </CardContent>
          </Card>
        </SlideShell>
      );
    case 7:
      return (
        <SlideShell slide={slide}>
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl tracking-[-0.05em] md:text-5xl">Componentes principais</CardTitle>
              <CardDescription className="text-base md:text-lg">
                Eles cobrem boa parte das telas comuns de sistemas web, como login, dashboard, cadastro, listagem e formulário.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {mainComponents.map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                <Card className="bg-[var(--surface-2)] shadow-none">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <LayoutDashboard className="size-5" />
                      Demo de UI
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-[var(--muted)]">
                    <p>Esses componentes aparecem em praticamente qualquer sistema: da tela de login ao painel administrativo.</p>
                    <Button onClick={() => toast.success("Toast exibido com sucesso")}>Mostrar toast</Button>
                  </CardContent>
                </Card>
                <Card className="bg-[var(--surface-2)] shadow-none">
                  <CardHeader>
                    <CardTitle className="text-2xl">Vantagem prática</CardTitle>
                  </CardHeader>
                  <CardContent className="text-[var(--muted)]">
                    Você começa com uma base visual e funcional já organizada, em vez de repetir o mesmo trabalho em cada tela.
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </SlideShell>
      );
    case 8:
      return (
        <SlideShell slide={slide}>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-4xl tracking-[-0.05em] md:text-5xl">Instalação e estrutura</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    code={`npx shadcn@latest init\nnpx shadcn@latest add button\nnpx shadcn@latest add card\nnpx shadcn@latest add input\nnpx shadcn@latest add dialog`}
                  />
                </CardContent>
              </Card>
              <Card className="bg-[var(--surface-2)] shadow-none">
                <CardContent className="grid gap-3 p-6 text-sm leading-7 text-[var(--muted)] md:text-base">
                  <p><strong>components/ui</strong>: componentes do Shadcn</p>
                  <p><strong>lib/utils.ts</strong>: função auxiliar para classes CSS</p>
                  <p><strong>components.json</strong>: configuração do Shadcn</p>
                  <p><strong>CSS global</strong>: tema e variáveis</p>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-[#09120f] text-emerald-50">
              <CardHeader>
                <CardTitle className="text-3xl">Estrutura comum</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm leading-8 text-emerald-50 md:text-base">
                  <code>{`src/\n  components/\n    ui/\n      button.tsx\n      card.tsx\n      input.tsx\n      dialog.tsx\n  lib/\n    utils.ts\ncomponents.json`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </SlideShell>
      );
    case 9:
      return (
        <SlideShell slide={slide}>
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <Card className="bg-[var(--surface)]">
              <CardHeader>
                <CardTitle className="text-4xl tracking-[-0.05em] md:text-5xl">Exemplo prático</CardTitle>
                <CardDescription className="text-base md:text-lg">
                  Mesmo usando componentes prontos, continua sendo React normal. O desenvolvedor ainda controla a tela.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Card className="mx-auto max-w-md bg-[var(--surface-2)] shadow-none">
                  <CardHeader>
                    <CardTitle>Entrar no sistema</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <label className="grid gap-2 text-sm font-medium">
                      E-mail
                      <input
                        className="h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-emerald-400/70"
                        onChange={(event) => setLoginEmail(event.target.value)}
                        placeholder="lucas@email.com"
                        value={loginEmail}
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-medium">
                      Senha
                      <input
                        className="h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-emerald-400/70"
                        placeholder="••••••••"
                        type="password"
                      />
                    </label>
                    <Button className="w-full" onClick={runLoginDemo}>
                      Entrar
                    </Button>
                    <p className="text-sm text-[var(--muted)]">{loginMessage}</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
            <CodeBlock code={loginSnippet} />
          </div>
        </SlideShell>
      );
    case 10:
      return (
        <SlideShell slide={slide}>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Card>
              <CardHeader>
                <CardTitle className="text-4xl tracking-[-0.05em] md:text-5xl">Customização</CardTitle>
                <CardDescription className="text-base md:text-lg">
                  O diferencial real é alterar o componente na origem, sem ficar brigando com CSS de uma biblioteca externa.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => setVariant("default")}>Default</Button>
                  <Button onClick={() => setVariant("outline")} variant="outline">
                    Outline
                  </Button>
                  <Button onClick={() => setVariant("destructive")} variant="destructive">
                    Destructive
                  </Button>
                  <Button onClick={() => setVariant("secondary")} variant="secondary">
                    Secondary
                  </Button>
                </div>
                <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface-2)] p-5 text-base leading-7 text-[var(--muted)]">
                  O botão selecionado representa a variante atual do componente: <strong className="text-foreground">{variant}</strong>
                </div>
                <div className="grid gap-2 text-[var(--muted)]">
                  <p>Você pode mudar cor, tamanho, borda, variantes, classes Tailwind e comportamento visual.</p>
                  <p>Se o botão padrão do sistema mudar, basta ajustar <code>components/ui/button.tsx</code>.</p>
                </div>
              </CardContent>
            </Card>
            <CodeBlock
              code={`<Button variant="outline">\n  Cancelar\n</Button>\n\n<Button variant="destructive">\n  Excluir\n</Button>\n\nconst buttonVariants = cva(\n  "inline-flex items-center rounded-md",\n  {\n    variants: {\n      variant: {\n        default: "bg-primary text-white",\n        destructive: "bg-red-500 text-white",\n        outline: "border bg-transparent"\n      }\n    }\n  }\n)`}
            />
          </div>
        </SlideShell>
      );
    case 11:
      return (
        <SlideShell slide={slide}>
          <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
            <Card>
              <CardHeader>
                <CardTitle className="text-4xl tracking-[-0.05em] md:text-5xl">Uso da IA com Shadcn</CardTitle>
                <CardDescription className="text-base md:text-lg">
                  O Shadcn combina bem com IA porque os componentes seguem um padrão claro e ficam dentro do projeto.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <Textarea readOnly value={promptText} />
                <div className="flex flex-wrap gap-3">
                  <Button onClick={copyPrompt}>
                    <Copy className="size-4" />
                    Copiar prompt
                  </Button>
                  <Button variant="secondary">
                    <Sparkles className="size-4" />
                    Ideia: gerar dashboard
                  </Button>
                </div>
                <div className="grid gap-2 text-[var(--muted)]">
                  <p>A IA pode ajudar a gerar telas rapidamente, montar protótipos, sugerir layouts e organizar componentes.</p>
                  <p>Ela acelera, mas não substitui revisão técnica.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[var(--surface-2)] shadow-none">
              <CardHeader>
                <CardTitle className="text-3xl">Checklist de revisão</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {[
                  ["imports corretos", true],
                  ["componente existe no projeto", true],
                  ["excesso de código", false],
                  ["responsividade", false],
                  ["acessibilidade", false],
                  ["padrão visual da aplicação", false],
                ].map(([label, checked]) => (
                  <label className="flex items-center gap-3 rounded-2xl bg-[var(--surface)] px-4 py-3" key={label}>
                    <Checkbox checked={checked} disabled />
                    <span>{label}</span>
                  </label>
                ))}
                <Separator className="my-2" />
                <div className="rounded-[20px] border border-amber-300/30 bg-amber-200/60 p-4 text-amber-950">
                  <strong>Frase forte:</strong> IA acelera. O desenvolvedor valida.
                </div>
                <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-4 text-[var(--muted)]">
                  Sem revisão, a IA só entrega um Frankenstein bonito em Tailwind.
                </div>
              </CardContent>
            </Card>
          </div>
        </SlideShell>
      );
    case 12:
      return (
        <SlideShell slide={slide}>
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl tracking-[-0.05em] md:text-5xl">Vantagens e limitações</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5 md:grid-cols-2">
              <Card className="bg-emerald-400/90 text-emerald-950 shadow-none">
                <CardHeader>
                  <CardTitle>Vantagens</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 text-base md:text-lg">
                  {["rápido", "moderno", "bonito", "customizável", "acessível", "bom para design system", "funciona bem com IA"].map((item) => (
                    <div className="flex items-center gap-3" key={item}>
                      <Check className="size-5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="bg-rose-300/92 text-rose-950 shadow-none">
                <CardHeader>
                  <CardTitle>Limitações</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 text-base md:text-lg">
                  {[
                    "exige React",
                    "exige Tailwind",
                    "manutenção fica com a equipe",
                    "pode virar bagunça sem padrão",
                    "não é ideal para quem só quer copiar sem entender",
                  ].map((item) => (
                    <div className="flex items-center gap-3" key={item}>
                      <ChevronRight className="size-5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </SlideShell>
      );
    case 13:
      return (
        <SlideShell slide={slide}>
          <Card className="overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(242,239,120,0.18),_transparent_32%),linear-gradient(135deg,#052824_0%,#0a3b35_45%,#082925_100%)] text-white">
            <CardContent className="grid min-h-[70vh] place-items-center px-10 py-16">
              <div className="flex max-w-4xl flex-col items-center gap-6 text-center">
                <div className="presentation-mark" />
                <h2 className="text-5xl font-semibold tracking-[-0.06em] md:text-7xl">Conclusão</h2>
                <p className="max-w-3xl text-lg text-white/78 md:text-2xl">
                  Shadcn/UI é uma forma moderna de construir interfaces em React com componentes prontos, mas sem prender o projeto em uma biblioteca fechada.
                </p>
                <div className="max-w-3xl rounded-[28px] border border-white/10 bg-emerald-400 px-8 py-6 text-xl font-semibold text-emerald-950 md:text-3xl">
                  Ele não substitui conhecimento de frontend. Ele acelera quem já sabe o que está fazendo.
                </div>
              </div>
            </CardContent>
          </Card>
        </SlideShell>
      );
    default:
      return null;
  }
}
