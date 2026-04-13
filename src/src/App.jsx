import { useState, useEffect } from "react";

const quiz = {
  intro: {
    title: "Raio-X do seu JurÃ­dico",
    subtitle: "DiagnÃ³stico rÃ¡pido de maturidade jurÃ­dica empresarial",
    body: "No mundo ideal, toda empresa nasceria com um jurÃ­dico estruturado. Mas quem empreende sabe que a realidade Ã© outra.\n\nPensamos nisso e criamos esse Raio-X: um diagnÃ³stico rÃ¡pido para vocÃª entender o que o seu negÃ³cio realmente precisa hoje â€” antes que isso vire um problema lÃ¡ na frente.\n\nEm menos de 2 minutos, vocÃª identifica os principais riscos da sua operaÃ§Ã£o e descobre o nÃ­vel de maturidade jurÃ­dica da sua empresa.",
    cta: "Quero fazer o diagnÃ³stico",
  },
  questions: [
    {
      id: 1,
      theme: "Estrutura SocietÃ¡ria",
      icon: "âš–ï¸",
      text: "VocÃª e seus sÃ³cios tÃªm um contrato social atualizado e um acordo que define o que acontece se um deles quiser sair â€” ou pior, morrer?",
      options: [
        { label: "A", text: "Sim, tudo formalizado e revisado recentemente.", score: 3 },
        { label: "B", text: "Temos um contrato, mas nunca revisamos nem conversamos sobre esses cenÃ¡rios.", score: 2 },
        { label: "C", text: "NÃ£o temos isso ou nunca discutimos formalmente.", score: 1 },
      ],
    },
    {
      id: 2,
      theme: "Colaboradores",
      icon: "ðŸ‘¥",
      text: "As pessoas que trabalham com vocÃª tÃªm o vÃ­nculo correto â€” CLT ou PJ â€” com contrato que realmente protege sua empresa?",
      options: [
        { label: "A", text: "Sim, tudo formalizado e dentro da legislaÃ§Ã£o.", score: 3 },
        { label: "B", text: "Tem contrato, mas sei que alguns vÃ­nculos sÃ£o confusos ou arriscados.", score: 2 },
        { label: "C", text: "Tem gente trabalhando sem contrato ou num 'PJ' que parece mais CLT.", score: 1 },
      ],
    },
    {
      id: 3,
      theme: "Contratos com Clientes",
      icon: "ðŸ¤",
      text: "Quando vocÃª fecha negÃ³cio com um cliente, existe um contrato assinado que define prazo, valor, entrega e o que acontece se der errado?",
      options: [
        { label: "A", text: "Sempre. Nenhuma venda acontece sem contrato assinado.", score: 3 },
        { label: "B", text: "Ã€s vezes. Depende do cliente ou do tamanho do negÃ³cio.", score: 2 },
        { label: "C", text: "Geralmente sÃ³ e-mail, WhatsApp ou um aperto de mÃ£o.", score: 1 },
      ],
    },
    {
      id: 4,
      theme: "Fornecedores e Parceiros",
      icon: "ðŸ“¦",
      text: "Seus fornecedores e parceiros estratÃ©gicos tÃªm contratos que deixam claro o que cada um deve entregar â€” e o que acontece se alguÃ©m falhar?",
      options: [
        { label: "A", text: "Sim, toda parceria relevante Ã© formalizada.", score: 3 },
        { label: "B", text: "Alguns tÃªm, outros nÃ£o. Ã‰ bem informal ainda.", score: 2 },
        { label: "C", text: "NÃ£o costumamos formalizar nada com fornecedores.", score: 1 },
      ],
    },
    {
      id: 5,
      theme: "FormalizaÃ§Ã£o de Pagamentos",
      icon: "ðŸ’³",
      text: "Quando vocÃª recebe ou paga valores significativos, existe comprovaÃ§Ã£o formal â€” nota fiscal, recibo, termo â€” que seria aceita numa eventual disputa?",
      options: [
        { label: "A", text: "Sim, sempre emitimos documentaÃ§Ã£o adequada.", score: 3 },
        { label: "B", text: "Em parte. Tem coisa passando por fora ou sem registro formal.", score: 2 },
        { label: "C", text: "A maioria das transaÃ§Ãµes nÃ£o tem registro adequado.", score: 1 },
      ],
    },
    {
      id: 6,
      theme: "DocumentaÃ§Ã£o da Empresa",
      icon: "ðŸ—‚ï¸",
      text: "Se alguÃ©m te pedisse hoje os documentos da sua empresa â€” contrato social, alvarÃ¡s, certidÃµes, contratos vigentes â€”, vocÃª saberia onde estÃ£o e se estÃ£o em dia?",
      options: [
        { label: "A", text: "Sim, tenho tudo organizado e atualizado.", score: 3 },
        { label: "B", text: "Sei onde a maioria estÃ¡, mas tem coisa desatualizada ou perdida.", score: 2 },
        { label: "C", text: "Seria uma correria encontrar isso tudo agora.", score: 1 },
      ],
    },
    {
      id: 7,
      theme: "DecisÃµes JurÃ­dicas",
      icon: "ðŸ§­",
      text: "Quando vocÃª toma decisÃµes importantes na empresa â€” contratar, demitir, mudar modelo de negÃ³cio, abrir filial â€”, consulta um advogado antes de agir?",
      options: [
        { label: "A", text: "Sempre ou quase sempre. Tenho assessoria jurÃ­dica de confianÃ§a.", score: 3 },
        { label: "B", text: "Ã€s vezes, quando acho que pode ser arriscado.", score: 2 },
        { label: "C", text: "Geralmente sÃ³ vou buscar ajuda depois que o problema aparece.", score: 1 },
      ],
    },
  ],
  levels: [
    {
      min: 7,
      max: 11,
      color: "#E63946",
      bg: "#fff5f5",
      badge: "ðŸ”´",
      label: "Operando no Risco",
      tagline: "Sua empresa estÃ¡ exposta. Ã‰ hora de agir antes que isso custe caro.",
      diagnosis:
        "Sua empresa ainda opera de forma muito informal. DecisÃµes importantes sÃ£o tomadas sem respaldo jurÃ­dico, vÃ­nculos nÃ£o estÃ£o formalizados e a documentaÃ§Ã£o estÃ¡ em falta. Isso nÃ£o significa que vocÃª estÃ¡ fazendo algo errado â€” significa que vocÃª estÃ¡ correndo riscos que poderiam ser evitados.",
      consequences: [
        "Processos trabalhistas por vÃ­nculos nÃ£o formalizados",
        "Conflitos entre sÃ³cios sem saÃ­da regulamentada",
        "InadimplÃªncia de clientes sem contrato para cobrar",
        "Multas por documentaÃ§Ã£o fiscal desatualizada",
        "DecisÃµes que geram passivo sem nenhuma proteÃ§Ã£o",
      ],
      action:
        "O primeiro passo Ã© identificar quais riscos sÃ£o mais urgentes para o seu negÃ³cio hoje e agir sobre eles antes que se tornem problemas reais.",
      offer: {
        label: "Consultoria JurÃ­dica Pontual",
        description:
          "Uma sessÃ£o estratÃ©gica para mapear os riscos mais urgentes da sua empresa e criar um plano de aÃ§Ã£o claro â€” sem enrolaÃ§Ã£o.",
        cta: "Quero resolver isso agora",
      },
    },
    {
      min: 12,
      max: 17,
      color: "#F4A261",
      bg: "#fffaf3",
      badge: "ðŸŸ¡",
      label: "Em EstruturaÃ§Ã£o",
      tagline: "VocÃª jÃ¡ comeÃ§ou. Mas ainda existem brechas que merecem atenÃ§Ã£o.",
      diagnosis:
        "VocÃª jÃ¡ tem alguma organizaÃ§Ã£o jurÃ­dica â€” o que Ã© Ã³timo. Mas ainda existem Ã¡reas desprotegidas que podem criar problemas Ã  medida que sua empresa cresce. Ã‰ comum nessa fase confiar demais na informalidade ou deixar a formalizaÃ§Ã£o para depois. O problema Ã© que 'depois' costuma chegar como crise.",
      consequences: [
        "Contratos que nÃ£o cobrem todas as situaÃ§Ãµes de risco",
        "Acordos informais que nÃ£o tÃªm validade legal",
        "Crescimento sem estrutura para suportÃ¡-lo juridicamente",
        "DependÃªncia de pessoas sem proteÃ§Ã£o contratual adequada",
      ],
      action:
        "O momento certo de fortalecer a estrutura jurÃ­dica Ã© antes de crescer â€” nÃ£o depois que o problema aparece.",
      offer: {
        label: "OrganizaÃ§Ã£o Contratual e EstruturaÃ§Ã£o",
        description:
          "Revisamos e estruturamos os contratos essenciais da sua empresa â€” sÃ³cios, colaboradores, clientes e fornecedores â€” para fechar as brechas antes que elas virem problemas.",
        cta: "Quero estruturar minha empresa",
      },
    },
    {
      min: 18,
      max: 21,
      color: "#2A9D8F",
      bg: "#f0faf9",
      badge: "ðŸŸ¢",
      label: "Empresa Protegida",
      tagline: "VocÃª cuida do jurÃ­dico como parte do negÃ³cio. Isso faz toda a diferenÃ§a.",
      diagnosis:
        "Sua empresa tem uma base jurÃ­dica estruturada. Contratos formalizados, vÃ­nculos corretos, documentaÃ§Ã£o em dia e decisÃµes tomadas com respaldo. VocÃª jÃ¡ entende que o jurÃ­dico nÃ£o Ã© custo â€” Ã© proteÃ§Ã£o. Agora o desafio Ã© manter e evoluir essa estrutura conforme o negÃ³cio cresce.",
      consequences: [
        "Empresas bem estruturadas crescem com mais seguranÃ§a",
        "Investidores e parceiros exigem documentaÃ§Ã£o sÃ³lida",
        "A complexidade jurÃ­dica aumenta com o crescimento",
        "Monitoramento contÃ­nuo reduz surpresas e passivos ocultos",
      ],
      action:
        "Uma empresa protegida Ã© uma empresa que cresce com menos sobressaltos. Manter essa estrutura funcionando Ã© o que separa quem escala de quem trava.",
      offer: {
        label: "Assessoria JurÃ­dica ContÃ­nua",
        description:
          "Acompanhamento estratÃ©gico do jurÃ­dico da sua empresa â€” para que vocÃª tome decisÃµes com seguranÃ§a, sem precisar apagar incÃªndios.",
        cta: "Quero manter essa proteÃ§Ã£o",
      },
    },
  ],
};

function getLevel(score) {
  return quiz.levels.find((l) => score >= l.min && score <= l.max);
}

export default function App() {
  const [step, setStep] = useState("intro"); // intro | quiz | result
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [resultLevel, setResultLevel] = useState(null);

  const total = quiz.questions.length;
  const progress = Math.round((current / total) * 100);

  function startQuiz() {
    setStep("quiz");
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
  }

  function selectOption(score) {
    if (animating) return;
    setSelected(score);
  }

  function nextQuestion() {
    if (selected === null || animating) return;
    setAnimating(true);
    const newAnswers = [...answers, selected];
    setTimeout(() => {
      if (current + 1 < total) {
        setAnswers(newAnswers);
        setCurrent(current + 1);
        setSelected(null);
        setAnimating(false);
      } else {
        const total_score = newAnswers.reduce((a, b) => a + b, 0);
        setResultLevel(getLevel(total_score));
        setStep("result");
        setAnimating(false);
      }
    }, 350);
  }

  function restart() {
    setStep("intro");
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setResultLevel(null);
  }

  return (
    <div style={styles.root}>
      <style>{css}</style>
      {step === "intro" && <Intro onStart={startQuiz} />}
      {step === "quiz" && (
        <QuizStep
          question={quiz.questions[current]}
          current={current}
          total={total}
          progress={progress}
          selected={selected}
          onSelect={selectOption}
          onNext={nextQuestion}
          animating={animating}
        />
      )}
      {step === "result" && resultLevel && (
        <Result level={resultLevel} onRestart={restart} />
      )}
    </div>
  );
}

function Intro({ onStart }) {
  return (
    <div className="screen fade-in" style={styles.screen}>
      <div style={styles.introTop}>
        <div style={styles.badge}>DiagnÃ³stico Gratuito</div>
        <h1 style={styles.introTitle}>
          Raio-X do seu<br />
          <span style={styles.accent}>JurÃ­dico</span>
        </h1>
        <div style={styles.introMeta}>7 perguntas Â· ~2 minutos Â· Resultado imediato</div>
      </div>

      <div style={styles.introCard}>
        <p style={styles.introText}>
          No mundo ideal, toda empresa nasceria com um jurÃ­dico estruturado.
          Mas quem empreende sabe que a realidade Ã© outra.
        </p>
        <p style={styles.introText}>
          Criamos esse Raio-X para vocÃª entender o que seu negÃ³cio realmente
          precisa hoje â€” <strong>antes que isso vire um problema lÃ¡ na frente.</strong>
        </p>
        <p style={styles.introText}>
          Em menos de 2 minutos, vocÃª identifica os principais riscos da sua
          operaÃ§Ã£o e descobre o nÃ­vel de maturidade jurÃ­dica da sua empresa.
        </p>
      </div>

      <div style={styles.levelsRow}>
        {[
          { badge: "ðŸ”´", label: "Operando no Risco" },
          { badge: "ðŸŸ¡", label: "Em EstruturaÃ§Ã£o" },
          { badge: "ðŸŸ¢", label: "Empresa Protegida" },
        ].map((l) => (
          <div key={l.label} style={styles.levelChip}>
            <span>{l.badge}</span>
            <span style={styles.levelChipLabel}>{l.label}</span>
          </div>
        ))}
      </div>

      <button className="btn-primary pulse" onClick={onStart} style={styles.btnPrimary}>
        Quero fazer o diagnÃ³stico â†’
      </button>

      <p style={styles.disclaimer}>Sem cadastro. Sem julgamento. 100% gratuito.</p>
    </div>
  );
}

function QuizStep({ question, current, total, progress, selected, onSelect, onNext, animating }) {
  return (
    <div className="screen fade-in" style={styles.screen}>
      {/* Header */}
      <div style={styles.quizHeader}>
        <div style={styles.progressLabel}>
          <span style={styles.progressCurrent}>{current + 1}</span>
          <span style={styles.progressSep}> de </span>
          <span>{total}</span>
        </div>
        <div style={styles.themeTag}>{question.icon} {question.theme}</div>
      </div>

      {/* Progress bar */}
      <div style={styles.progressTrack}>
        <div
          className="progress-fill"
          style={{ ...styles.progressFill, width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div style={styles.questionCard}>
        <p style={styles.questionText}>{question.text}</p>
      </div>

      {/* Options */}
      <div style={styles.optionsWrap}>
        {question.options.map((opt) => (
          <button
            key={opt.label}
            className={`option-btn${selected === opt.score ? " selected" : ""}`}
            onClick={() => onSelect(opt.score)}
            style={styles.optionBtn}
          >
            <span style={styles.optionLabel}>{opt.label}</span>
            <span style={styles.optionText}>{opt.text}</span>
          </button>
        ))}
      </div>

      <button
        className="btn-primary"
        onClick={onNext}
        disabled={selected === null || animating}
        style={{
          ...styles.btnPrimary,
          opacity: selected === null ? 0.4 : 1,
          cursor: selected === null ? "not-allowed" : "pointer",
        }}
      >
        {current + 1 === total ? "Ver meu resultado â†’" : "PrÃ³xima â†’"}
      </button>
    </div>
  );
}

function Result({ level, onRestart }) {
  return (
    <div className="screen fade-in" style={styles.screen}>
      <div style={styles.resultHeader}>
        <div style={styles.resultBadgeWrap}>
          <span style={styles.resultEmoji}>{level.badge}</span>
        </div>
        <p style={styles.resultLevelTag} >Seu resultado</p>
        <h2 style={{ ...styles.resultTitle, color: level.color }}>{level.label}</h2>
        <p style={styles.resultTagline}>{level.tagline}</p>
      </div>

      <div style={{ ...styles.resultCard, borderColor: level.color + "40", background: level.bg }}>
        <h3 style={styles.sectionHead}>O que isso significa?</h3>
        <p style={styles.resultBody}>{level.diagnosis}</p>
      </div>

      <div style={styles.consequencesCard}>
        <h3 style={styles.sectionHead}>O que pode acontecer?</h3>
        <ul style={styles.consequencesList}>
          {level.consequences.map((c, i) => (
            <li key={i} style={styles.consequenceItem}>
              <span style={{ ...styles.bullet, color: level.color }}>â–¸</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ ...styles.offerCard, borderColor: level.color }}>
        <div style={{ ...styles.offerBadge, background: level.color }}>
          PrÃ³ximo passo recomendado
        </div>
        <h3 style={styles.offerTitle}>{level.offer.label}</h3>
        <p style={styles.offerDesc}>{level.offer.description}</p>
        <p style={styles.offerCta}>
          "Se isso fez sentido para vocÃª, talvez seja hora de organizar essa parte da sua empresa com mais seguranÃ§a."
        </p>
        <button className="btn-primary" style={{ ...styles.btnPrimary, background: level.color, marginTop: 16 }}>
          {level.offer.cta}
        </button>
      </div>

      <button onClick={onRestart} style={styles.btnRestart}>
        â†© Refazer o diagnÃ³stico
      </button>
    </div>
  );
}

// â”€â”€â”€ Styles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const GOLD = "#7D1F2E";
const DARK = "#F4F4F4";
const CARD = "#FFFFFF";
const CARD2 = "#EFEFEF";
const TEXT = "#1A1A1A";
const MUTED = "#7A7A7A";

const styles = {
  root: {
    minHeight: "100vh",
    background: DARK,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "24px 16px 48px",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    color: TEXT,
  },
  screen: {
    width: "100%",
    maxWidth: 520,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  // INTRO
  introTop: {
    textAlign: "center",
    paddingTop: 8,
  },
  badge: {
    display: "inline-block",
    background: "#7D1F2E22",
    color: "#7D1F2E",
    border: `1px solid #7D1F2E55`,
    borderRadius: 24,
    padding: "4px 14px",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 38,
    fontWeight: 800,
    lineHeight: 1.1,
    margin: "0 0 10px",
    letterSpacing: "-0.02em",
  },
  accent: {
    color: "#7D1F2E",
  },
  introMeta: {
    color: MUTED,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.04em",
  },
  introCard: {
    background: CARD,
    borderRadius: 16,
    padding: "24px 24px",
    border: `1px solid #00000010`,
  },
  introText: {
    margin: "0 0 14px",
    lineHeight: 1.65,
    fontSize: 15,
    color: "#444444",
  },
  levelsRow: {
    display: "flex",
    gap: 8,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  levelChip: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: CARD,
    border: "1px solid #00000012",
    borderRadius: 24,
    padding: "6px 14px",
    fontSize: 12,
    fontWeight: 500,
    color: TEXT,
  },
  levelChipLabel: { color: MUTED },
  disclaimer: {
    textAlign: "center",
    color: MUTED,
    fontSize: 12,
    margin: 0,
  },
  // QUIZ
  quizHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 13,
    color: MUTED,
    fontWeight: 500,
  },
  progressCurrent: {
    color: GOLD,
    fontWeight: 700,
    fontSize: 15,
  },
  progressSep: {
    color: MUTED,
  },
  themeTag: {
    background: CARD,
    border: "1px solid #00000012",
    borderRadius: 20,
    padding: "4px 12px",
    fontSize: 12,
    color: MUTED,
    fontWeight: 500,
  },
  progressTrack: {
    height: 4,
    background: "#00000010",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: -8,
  },
  progressFill: {
    height: "100%",
    background: `linear-gradient(90deg, #7D1F2E, #A83248)`,
    borderRadius: 4,
    transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
  },
  questionCard: {
    background: CARD,
    borderRadius: 16,
    padding: "28px 24px",
    border: "1px solid #0000000e",
  },
  questionText: {
    fontSize: 18,
    lineHeight: 1.55,
    fontWeight: 600,
    margin: 0,
    color: TEXT,
  },
  optionsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  optionBtn: {
    display: "flex",
    alignItems: "flex-start",
    gap: 14,
    background: CARD2,
    border: "1.5px solid #00000012",
    borderRadius: 14,
    padding: "14px 18px",
    color: TEXT,
    textAlign: "left",
    cursor: "pointer",
    transition: "all 0.18s ease",
    fontSize: 14,
    lineHeight: 1.5,
    fontFamily: "inherit",
  },
  optionLabel: {
    minWidth: 26,
    height: 26,
    background: "#00000010",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 12,
    color: MUTED,
    flexShrink: 0,
    marginTop: 1,
  },
  optionText: {
    flex: 1,
  },
  // RESULT
  resultHeader: {
    textAlign: "center",
    paddingTop: 8,
  },
  resultBadgeWrap: {
    fontSize: 52,
    lineHeight: 1,
    marginBottom: 12,
  },
  resultEmoji: {},
  resultLevelTag: {
    color: MUTED,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontWeight: 600,
    margin: "0 0 6px",
  },
  resultTitle: {
    fontSize: 30,
    fontWeight: 800,
    margin: "0 0 10px",
    letterSpacing: "-0.01em",
  },
  resultTagline: {
    fontSize: 15,
    color: "#444444",
    lineHeight: 1.6,
    margin: 0,
    maxWidth: 380,
    marginInline: "auto",
  },
  resultCard: {
    borderRadius: 16,
    padding: "22px 22px",
    border: "1.5px solid",
  },
  sectionHead: {
    fontSize: 13,
    fontWeight: 700,
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    margin: "0 0 10px",
  },
  resultBody: {
    fontSize: 14,
    lineHeight: 1.65,
    color: "#444444",
    margin: 0,
  },
  consequencesCard: {
    background: CARD,
    border: "1px solid #0000000e",
    borderRadius: 16,
    padding: "22px 22px",
  },
  consequencesList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  consequenceItem: {
    display: "flex",
    gap: 10,
    fontSize: 14,
    lineHeight: 1.5,
    color: "#444444",
    alignItems: "flex-start",
  },
  bullet: {
    fontSize: 12,
    marginTop: 2,
    flexShrink: 0,
    fontWeight: 700,
  },
  offerCard: {
    background: CARD,
    borderRadius: 16,
    padding: "28px 24px",
    border: "1.5px solid",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  offerBadge: {
    display: "inline-block",
    color: "#fff",
    borderRadius: 20,
    padding: "4px 12px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    alignSelf: "flex-start",
  },
  offerTitle: {
    fontSize: 20,
    fontWeight: 800,
    margin: 0,
    color: TEXT,
  },
  offerDesc: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "#444444",
    margin: 0,
  },
  offerCta: {
    fontSize: 14,
    lineHeight: 1.6,
    color: MUTED,
    fontStyle: "italic",
    margin: 0,
    borderLeft: `3px solid #7D1F2E`,
    paddingLeft: 14,
  },
  btnPrimary: {
    background: GOLD,
    color: "#0F1117",
    border: "none",
    borderRadius: 14,
    padding: "16px 28px",
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
    width: "100%",
    letterSpacing: "0.01em",
    transition: "opacity 0.2s, transform 0.15s",
    fontFamily: "inherit",
  },
  btnRestart: {
    background: "transparent",
    border: "1.5px solid #00000015",
    borderRadius: 14,
    padding: "12px 20px",
    fontSize: 13,
    color: MUTED,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "border-color 0.2s, color 0.2s",
  },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

* { box-sizing: border-box; }

.fade-in {
  animation: fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

.pulse {
  animation: pulse 2.2s ease-in-out infinite;
}
@keyframes pulse {
  0%,100% { box-shadow: 0 0 0 0 #7D1F2E44; }
  50%      { box-shadow: 0 0 0 12px #7D1F2E00; }
}

.btn-primary:hover:not(:disabled) {
  opacity: 0.88;
  transform: scale(1.015);
}
.btn-primary:active:not(:disabled) {
  transform: scale(0.98);
}

.option-btn:hover {
  border-color: #7D1F2E66 !important;
  background: #F0E8EA !important;
}
.option-btn.selected {
  border-color: #7D1F2E !important;
  background: #7D1F2E14 !important;
}
.option-btn.selected span:first-child {
  background: #7D1F2E !important;
  color: #fff !important;
}
`;

