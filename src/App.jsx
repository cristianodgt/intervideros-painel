import { useState, useEffect, useRef } from "react";

const LOGO_SRC = "data:image/png;base64,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";

// ─── DESIGN TOKENS (cores da logo InterVideros) ───────────────────────────
// Azul escuro navy: #0b2240
// Azul primário:    #1e5fa8
// Azul médio:       #2d7dd2
// Azul claro:       #4ab3e8
// Faixa/accent:     #3a9fd6
// Cinza aço:        #6b8aa8
// Background:       #06101e → #0a1628

const C = {
  bg:       "#07111f",
  bgCard:   "rgba(11,26,48,0.75)",
  bgHover:  "rgba(30,95,168,0.1)",
  border:   "rgba(74,179,232,0.12)",
  borderMd: "rgba(74,179,232,0.22)",
  navy:     "#0b2240",
  blue:     "#1e5fa8",
  blueMid:  "#2d7dd2",
  blueLight:"#4ab3e8",
  accent:   "#3a9fd6",
  steel:    "#6b8aa8",
  alert:    "#f59e0b",
  danger:   "#ef4444",
  success:  "#22d3a0",
  text:     "#e8f0f8",
  textMid:  "#8aaac8",
  textDim:  "#3d5a75",
};

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const TEAM = [
  { id:1, name:"Carlos Menezes",  role:"Medidor",    avatar:"CM", status:"campo",      location:"Av. Paulista, 1200",     job:"Medição — Orç. #847",  since:"09:30", phone:"11 99102-3344", next:"13:00" },
  { id:2, name:"Ana Ferreira",    role:"Instaladora", avatar:"AF", status:"campo",      location:"R. Oscar Freire, 450",   job:"Instalação — OS #831",  since:"08:00", phone:"11 98765-4321", next:"15:30" },
  { id:3, name:"Ricardo Lima",    role:"Instalador",  avatar:"RL", status:"disponivel", location:"Base",                   job:null, since:null, phone:"11 91234-5678", next:"14:00" },
  { id:4, name:"Fernanda Souza",  role:"Medidora",    avatar:"FS", status:"disponivel", location:"Base",                   job:null, since:null, phone:"11 97654-3210", next:"10:30" },
  { id:5, name:"Marcos Oliveira", role:"Instalador",  avatar:"MO", status:"folga",      location:"—",                      job:null, since:null, phone:"11 96543-2109", next:null   },
];

const VISITS = [
  { id:"AG-001", client:"Gustavo Henrique", phone:"11 98801-2233", address:"Rua das Flores, 321 – Moema",            type:"Medição",    status:"confirmado", date:"2025-07-10", time:"09:00", assignedTo:4, notes:"3 janelas sala + 2 quartos",       priority:"alta"   },
  { id:"AG-002", client:"Patricia Mendes",  phone:"11 91122-3344", address:"Av. Brig. Faria Lima, 2000",             type:"Instalação", status:"agendado",   date:"2025-07-10", time:"11:00", assignedTo:3, notes:"Box banheiro + espelho",            priority:"normal" },
  { id:"AG-003", client:"Roberto Campos",   phone:"11 99988-7766", address:"R. Haddock Lobo, 1120 – Cerq. César",   type:"Medição",    status:"agendado",   date:"2025-07-10", time:"14:00", assignedTo:null, notes:"Projeto sacada completa",       priority:"alta"   },
  { id:"AG-004", client:"Luciana Barros",   phone:"11 94455-6677", address:"Alameda Santos, 700 – Jardins",          type:"Retorno",    status:"pendente",   date:"2025-07-11", time:"10:00", assignedTo:1, notes:"Revisão instalação anterior",       priority:"normal" },
  { id:"AG-005", client:"Diego Martins",    phone:"11 93366-5544", address:"R. Augusta, 2000 – Consolação",          type:"Medição",    status:"agendado",   date:"2025-07-11", time:"15:00", assignedTo:null, notes:"Escritório — 6 painéis vidro",  priority:"alta"   },
  { id:"AG-006", client:"Camila Torres",    phone:"11 92255-4433", address:"Av. Rebouças, 3700 – Pinheiros",         type:"Instalação", status:"confirmado", date:"2025-07-12", time:"08:30", assignedTo:2, notes:"Porta de correr vidro temperado",   priority:"normal" },
];

const CHATS = [
  { id:1, name:"Gustavo Henrique", phone:"11 98801-2233", lastMsg:"Boa tarde! Gostaria de confirmar a visita de amanhã às 9h",          time:"14:32", unread:2, status:"aguardando", label:"agendamento", avatar:"GH", aiActive:true  },
  { id:2, name:"Patricia Mendes",  phone:"11 91122-3344", lastMsg:"Perfeito, então ficamos assim. Muito obrigada!",                       time:"13:15", unread:0, status:"resolvido",  label:"instalação",  avatar:"PM", aiActive:false },
  { id:3, name:"Roberto Campos",   phone:"11 99988-7766", lastMsg:"Preciso de um orçamento urgente para sacada completa em vidro",        time:"12:44", unread:4, status:"humano",     label:"orçamento",   avatar:"RC", aiActive:false },
  { id:4, name:"Juliana Farias",   phone:"11 97788-9900", lastMsg:"Olá, vi o anúncio e quero saber sobre preços de box",                 time:"11:20", unread:1, status:"bot",        label:"novo",        avatar:"JF", aiActive:true  },
  { id:5, name:"Marcos Vinicius",  phone:"11 95544-7788", lastMsg:"Quando vocês podem vir fazer a medição?",                             time:"10:55", unread:0, status:"aguardando", label:"medição",     avatar:"MV", aiActive:true  },
  { id:6, name:"Silvana Ramos",    phone:"11 93322-1100", lastMsg:"A instalação ficou excelente! Recomendo para todos!",                  time:"09:30", unread:0, status:"resolvido",  label:"feedback",    avatar:"SR", aiActive:false },
];

const CONV_MSGS = [
  { id:1, from:"client", text:"Boa tarde! Gostaria de confirmar a visita de amanhã às 9h", time:"14:28" },
  { id:2, from:"bot",    text:"Olá, Gustavo! 😊 Claro, sua visita está confirmada para amanhã, 10/07, às 09:00h.\n\nNosso técnico estará na Rua das Flores, 321 – Moema.\n\nPrecisa de mais alguma coisa?", time:"14:28" },
  { id:3, from:"client", text:"Perfeito! Só uma dúvida, vão medir tudo ou preciso ter as medidas prontas?", time:"14:30" },
  { id:4, from:"bot",    text:"Pode deixar! Nossa equipe traz todos os equipamentos de medição. Você só precisa estar no local e nos mostrar onde quer instalar 😉", time:"14:30" },
  { id:5, from:"client", text:"Ótimo, muito obrigado! Até amanhã então 👍", time:"14:32" },
];

const STATS = [
  { label:"Chats Ativos",   value:"18", sub:"+3 hoje",        icon:"💬", color: C.blueLight },
  { label:"Visitas Hoje",   value:"6",  sub:"2 confirmadas",  icon:"📍", color: C.accent    },
  { label:"Sem Técnico",    value:"3",  sub:"Precisam atenção",icon:"⚠️",color: C.alert     },
  { label:"Em Campo",       value:"2",  sub:"Carlos · Ana",    icon:"🔧", color: C.success   },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────
const statusColor = s => ({ campo:"#22d3a0", disponivel:C.blueMid, folga:C.textDim }[s]||C.textDim);
const statusLabel = s => ({ campo:"Em Campo", disponivel:"Disponível", folga:"Folga" }[s]||s);
const visitColor  = s => ({ confirmado:"#22d3a0", agendado:C.blueMid, pendente:C.alert, cancelado:C.danger }[s]||C.steel);
const chatColor   = s => ({ aguardando:C.alert, resolvido:"#22d3a0", humano:C.danger, bot:C.blueLight }[s]||C.steel);
const prioColor   = p => ({ alta:C.danger, normal:C.blueMid }[p]||C.steel);

// ─── useIsMobile hook ──────────────────────────────────────────────────────
function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return mobile;
}

// ─── UI PRIMITIVES ────────────────────────────────────────────────────────
function Av({ initials, size=36, color=C.blueLight }) {
  return (
    <div style={{
      width:size, height:size, borderRadius:"50%", flexShrink:0,
      background:`linear-gradient(135deg,${color}20,${color}40)`,
      border:`1.5px solid ${color}50`,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:size*0.34, fontWeight:700, color, fontFamily:"'DM Mono',monospace",
    }}>{initials}</div>
  );
}

function Pill({ label, color }) {
  return (
    <span style={{
      background:`${color}18`, color, border:`1px solid ${color}35`,
      borderRadius:20, padding:"2px 9px", fontSize:10, fontWeight:700,
      textTransform:"uppercase", letterSpacing:"0.05em", whiteSpace:"nowrap",
    }}>{label}</span>
  );
}

function Card({ children, style={}, accent }) {
  return (
    <div style={{
      background: C.bgCard,
      border:`1px solid ${accent ? accent+"30" : C.border}`,
      borderTop: accent ? `2px solid ${accent}` : undefined,
      borderRadius:14,
      backdropFilter:"blur(24px)",
      boxShadow:`0 4px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(74,179,232,0.06)`,
      ...style,
    }}>{children}</div>
  );
}

function Divider({ my=14 }) {
  return <div style={{ height:1, background:C.border, margin:`${my}px 0` }} />;
}

// ─── NAV CONFIG ───────────────────────────────────────────────────────────
const NAV = [
  { id:"dashboard", icon:"⬡", label:"Painel"     },
  { id:"chats",     icon:"◎", label:"Chats"      },
  { id:"agenda",    icon:"◈", label:"Agenda"     },
  { id:"equipe",    icon:"◉", label:"Equipe"     },
  { id:"campo",     icon:"◐", label:"Campo"      },
];

// ─── SIDEBAR (desktop) ────────────────────────────────────────────────────
function Sidebar({ active, onNav }) {
  return (
    <div style={{
      width:76, background:"rgba(5,12,26,0.97)",
      borderRight:`1px solid ${C.border}`,
      display:"flex", flexDirection:"column", alignItems:"center",
      padding:"18px 0 20px", gap:2, flexShrink:0,
    }}>
      {/* Logo */}
      <div style={{ width:52, height:52, marginBottom:22, borderRadius:12, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", background:C.navy, border:`1px solid ${C.borderMd}` }}>
        <img src={LOGO_SRC} alt="InterVideros" style={{ width:46, height:46, objectFit:"contain" }} />
      </div>

      {NAV.map(n => (
        <button key={n.id} onClick={() => onNav(n.id)} title={n.label} style={{
          width:52, height:52, borderRadius:12, border:"none",
          background: active===n.id ? `${C.blue}30` : "transparent",
          color: active===n.id ? C.blueLight : C.textDim,
          fontSize:20, cursor:"pointer",
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2,
          transition:"all 0.18s",
          boxShadow: active===n.id ? `inset 0 0 0 1px ${C.blue}60` : "none",
        }}>
          <span>{n.icon}</span>
          <span style={{ fontSize:8, fontFamily:"'DM Mono',monospace", letterSpacing:"0.06em", opacity:0.8 }}>
            {n.label.toUpperCase().slice(0,5)}
          </span>
        </button>
      ))}

      <div style={{ flex:1 }} />
      <div style={{ width:36, height:36, borderRadius:"50%", background:`${C.blue}30`, border:`1.5px solid ${C.blue}60`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:C.blueLight, fontFamily:"'DM Mono',monospace" }}>IV</div>
    </div>
  );
}

// ─── BOTTOM NAV (mobile) ──────────────────────────────────────────────────
function BottomNav({ active, onNav }) {
  return (
    <div style={{
      position:"fixed", bottom:0, left:0, right:0, zIndex:100,
      background:"rgba(5,12,26,0.97)", borderTop:`1px solid ${C.border}`,
      display:"flex", backdropFilter:"blur(24px)",
      paddingBottom:"env(safe-area-inset-bottom,0px)",
    }}>
      {NAV.map(n => (
        <button key={n.id} onClick={() => onNav(n.id)} style={{
          flex:1, padding:"10px 0 8px", border:"none",
          background: active===n.id ? `${C.blue}20` : "transparent",
          color: active===n.id ? C.blueLight : C.textDim,
          fontSize:19, cursor:"pointer",
          display:"flex", flexDirection:"column", alignItems:"center", gap:1,
          borderTop: active===n.id ? `2px solid ${C.blueLight}` : "2px solid transparent",
          transition:"all 0.15s",
        }}>
          <span>{n.icon}</span>
          <span style={{ fontSize:9, fontFamily:"'DM Mono',monospace", letterSpacing:"0.05em" }}>
            {n.label.toUpperCase().slice(0,5)}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── TOPBAR ──────────────────────────────────────────────────────────────
function TopBar({ mobile, page }) {
  const label = NAV.find(n => n.id===page)?.label || "";
  const [time, setTime] = useState(new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}));
  useEffect(() => { const t = setInterval(() => setTime(new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})),30000); return ()=>clearInterval(t); },[]);

  return (
    <div style={{
      height:54, padding:"0 20px", display:"flex", alignItems:"center", justifyContent:"space-between",
      borderBottom:`1px solid ${C.border}`, background:"rgba(5,12,26,0.80)",
      backdropFilter:"blur(24px)", flexShrink:0,
    }}>
      {mobile ? (
        <img src={LOGO_SRC} alt="InterVideros" style={{ height:32, objectFit:"contain" }} />
      ) : (
        <div style={{ fontSize:11, color:C.textDim, fontFamily:"'DM Mono',monospace" }}>
          INTERVIDEROS <span style={{ color:C.border }}>·</span> <span style={{ color:C.blueLight }}>{label.toUpperCase()}</span>
        </div>
      )}

      {mobile && (
        <div style={{ fontSize:13, fontWeight:700, color:C.text, fontFamily:"'DM Mono',monospace" }}>{label}</div>
      )}

      <div style={{ display:"flex", alignItems:"center", gap:mobile?10:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:C.success, boxShadow:`0 0 6px ${C.success}` }} />
          {!mobile && <span style={{ fontSize:11, color:C.textMid }}>IA Camila · Ativa</span>}
        </div>
        {!mobile && (
          <div style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:C.blueLight }} />
            <span style={{ fontSize:11, color:C.textMid }}>Chatwoot · Online</span>
          </div>
        )}
        <span style={{ fontSize:11, color:C.textDim, fontFamily:"'DM Mono',monospace" }}>{time}</span>
      </div>
    </div>
  );
}

// ─── DASHBOARD PAGE ───────────────────────────────────────────────────────
function Dashboard({ mobile }) {
  return (
    <div style={{ padding: mobile?"14px":"28px", overflow:"auto", height:"100%" }}>
      {/* Greeting */}
      <div style={{ marginBottom:22 }}>
        <div style={{ fontSize:11, color:C.textDim, fontFamily:"'DM Mono',monospace", letterSpacing:"0.1em", marginBottom:4 }}>
          QUINTA-FEIRA, 10 JULHO 2025
        </div>
        <h1 style={{ fontSize: mobile?20:26, fontWeight:800, color:C.text, margin:0 }}>
          Bom dia, <span style={{ color:C.blueLight }}>InterVideros</span> ✦
        </h1>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns: mobile?"repeat(2,1fr)":"repeat(4,1fr)", gap:12, marginBottom:20 }}>
        {STATS.map((s,i) => (
          <Card key={i} accent={s.color} style={{ padding:"16px 18px" }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontSize:10, color:C.textDim, fontFamily:"'DM Mono',monospace", letterSpacing:"0.06em", marginBottom:6 }}>{s.label.toUpperCase()}</div>
                <div style={{ fontSize:mobile?28:34, fontWeight:800, color:s.color, lineHeight:1 }}>{s.value}</div>
                <div style={{ fontSize:11, color:C.textDim, marginTop:4 }}>{s.sub}</div>
              </div>
              <div style={{ fontSize:22, opacity:0.55 }}>{s.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns: mobile?"1fr":"1fr 1fr", gap:16, marginBottom:16 }}>
        {/* Agenda Hoje */}
        <Card style={{ padding:18 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
            <span style={{ fontSize:13, fontWeight:700, color:C.text }}>Agenda do Dia</span>
            <Pill label="6 visitas" color={C.accent} />
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {VISITS.filter(v=>v.date==="2025-07-10").map(v => {
              const tech = TEAM.find(t=>t.id===v.assignedTo);
              return (
                <div key={v.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:9, background:"rgba(74,179,232,0.04)", border:`1px solid ${C.border}` }}>
                  <div style={{ textAlign:"center", minWidth:38 }}>
                    <div style={{ fontSize:13, fontWeight:800, color:C.blueLight, fontFamily:"'DM Mono',monospace" }}>{v.time}</div>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12, fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{v.client}</div>
                    <div style={{ fontSize:11, color:C.textDim }}>{v.type} · {v.address.split(",")[0]}</div>
                  </div>
                  {tech ? <Av initials={tech.avatar} size={26} color={statusColor(tech.status)} /> : <Pill label="Sem técnico" color={C.alert} />}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Equipe */}
        <Card style={{ padding:18 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
            <span style={{ fontSize:13, fontWeight:700, color:C.text }}>Status da Equipe</span>
            <Pill label="5 pessoas" color={C.blueLight} />
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {TEAM.map(t => (
              <div key={t.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:9, background:"rgba(74,179,232,0.04)", border:`1px solid ${C.border}` }}>
                <div style={{ position:"relative" }}>
                  <Av initials={t.avatar} size={32} color={statusColor(t.status)} />
                  <div style={{ position:"absolute", bottom:0, right:0, width:9, height:9, borderRadius:"50%", background:statusColor(t.status), border:"2px solid #07111f" }} />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{t.name}</div>
                  <div style={{ fontSize:11, color:C.textDim }}>{t.role}</div>
                </div>
                <Pill label={statusLabel(t.status)} color={statusColor(t.status)} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Chats recentes */}
      <Card style={{ padding:18 }}>
        <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:14 }}>Conversas Recentes</div>
        <div style={{ display:"grid", gridTemplateColumns: mobile?"1fr":"repeat(3,1fr)", gap:10 }}>
          {CHATS.slice(0,mobile?3:6).map(c => (
            <div key={c.id} style={{ padding:"11px 13px", borderRadius:9, background:"rgba(74,179,232,0.04)", border:`1px solid ${C.border}`, cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <Av initials={c.avatar} size={28} color={chatColor(c.status)} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:C.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.name}</div>
                  <div style={{ fontSize:10, color:C.textDim }}>{c.time}</div>
                </div>
                {c.unread>0 && <div style={{ minWidth:18, height:18, borderRadius:9, background:C.blueLight, color:C.bg, fontSize:10, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center" }}>{c.unread}</div>}
              </div>
              <div style={{ fontSize:11, color:C.textDim, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.lastMsg}</div>
              <div style={{ display:"flex", gap:5, marginTop:7, flexWrap:"wrap" }}>
                <Pill label={c.status} color={chatColor(c.status)} />
                {c.aiActive && <Pill label="IA" color="#818cf8" />}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {mobile && <div style={{ height:80 }} />}
    </div>
  );
}

// ─── CHATS PAGE ────────────────────────────────────────────────────────────
function Chats({ mobile }) {
  const [sel, setSel] = useState(CHATS[0]);
  const [view, setView] = useState("list"); // "list" | "chat" on mobile
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState(CONV_MSGS);
  const [aiPaused, setAiPaused] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({behavior:"smooth"}); }, [msgs]);

  const openChat = (c) => { setSel(c); if(mobile) setView("chat"); };
  const send = () => {
    if (!input.trim()) return;
    setMsgs(m => [...m, { id:Date.now(), from:"agent", text:input, time: new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}) }]);
    setInput("");
  };

  const ChatList = () => (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>
      <div style={{ padding:"16px 16px 10px", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:10 }}>Conversas</div>
        <div style={{ position:"relative" }}>
          <input style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 12px 8px 30px", color:C.text, fontSize:12, outline:"none", boxSizing:"border-box" }} placeholder="Buscar..." />
          <span style={{ position:"absolute", left:9, top:9, fontSize:13, opacity:0.35 }}>⌕</span>
        </div>
      </div>
      <div style={{ overflow:"auto", flex:1 }}>
        {CHATS.map(c => (
          <div key={c.id} onClick={() => openChat(c)} style={{
            padding:"13px 15px", cursor:"pointer",
            background: sel.id===c.id && !mobile ? `${C.blue}18` : "transparent",
            borderLeft:`3px solid ${sel.id===c.id && !mobile ? C.blueLight : "transparent"}`,
            borderBottom:`1px solid ${C.border}33`, transition:"all 0.15s",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ position:"relative" }}>
                <Av initials={c.avatar} size={36} color={chatColor(c.status)} />
                <div style={{ position:"absolute", bottom:0, right:0, width:9, height:9, borderRadius:"50%", background:chatColor(c.status), border:"2px solid #07111f" }} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:13, fontWeight:600, color:C.text }}>{c.name}</span>
                  <span style={{ fontSize:10, color:C.textDim }}>{c.time}</span>
                </div>
                <div style={{ fontSize:11, color:C.textDim, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", marginTop:2 }}>{c.lastMsg}</div>
              </div>
              {c.unread>0 && <div style={{ minWidth:18, height:18, borderRadius:9, background:C.blueLight, color:C.bg, fontSize:10, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center" }}>{c.unread}</div>}
            </div>
          </div>
        ))}
        {mobile && <div style={{ height:80 }} />}
      </div>
    </div>
  );

  const ChatWindow = () => (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      {/* Header */}
      <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
        {mobile && (
          <button onClick={() => setView("list")} style={{ background:"none", border:"none", color:C.blueLight, fontSize:20, cursor:"pointer", padding:"0 4px" }}>‹</button>
        )}
        <Av initials={sel.avatar} size={36} color={chatColor(sel.status)} />
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{sel.name}</div>
          <div style={{ fontSize:11, color:C.textDim }}>{sel.phone}</div>
        </div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          <button onClick={() => setAiPaused(p=>!p)} style={{ padding:"5px 11px", borderRadius:7, fontSize:10, fontWeight:700, border:`1px solid ${aiPaused?C.danger+"50":C.success+"50"}`, background: aiPaused?`${C.danger}14`:`${C.success}14`, color: aiPaused?C.danger:C.success, cursor:"pointer" }}>
            {aiPaused ? "▷ IA" : "⏸ IA"}
          </button>
          {!mobile && <button style={{ padding:"5px 11px", borderRadius:7, fontSize:10, fontWeight:700, border:`1px solid ${C.border}`, background:`${C.blue}14`, color:C.blueLight, cursor:"pointer" }}>⇝ Transf.</button>}
          <button style={{ padding:"5px 11px", borderRadius:7, fontSize:10, fontWeight:700, border:`1px solid ${C.success}50`, background:`${C.success}14`, color:C.success, cursor:"pointer" }}>✓ Resolver</button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflow:"auto", padding:"16px", display:"flex", flexDirection:"column", gap:10 }}>
        {msgs.map(m => (
          <div key={m.id} style={{ display:"flex", justifyContent: m.from==="client"?"flex-start":"flex-end" }}>
            <div style={{
              maxWidth: mobile?"88%":"72%", padding:"9px 13px",
              borderRadius: m.from==="client"?"4px 12px 12px 12px":"12px 4px 12px 12px",
              background: m.from==="client"?`rgba(255,255,255,0.05)`: m.from==="bot"?`${C.blue}25`:`${C.accent}20`,
              border:`1px solid ${ m.from==="client"?C.border: m.from==="bot"?`${C.blue}45`:`${C.accent}40` }`,
            }}>
              {m.from!=="client" && (
                <div style={{ fontSize:9, fontWeight:800, color: m.from==="bot"?C.blueLight:C.accent, marginBottom:3, letterSpacing:"0.06em" }}>
                  {m.from==="bot"?"✦ CAMILA (IA)":"◉ AGENTE"}
                </div>
              )}
              <div style={{ fontSize:12, color:C.text, whiteSpace:"pre-wrap", lineHeight:1.55 }}>{m.text}</div>
              <div style={{ fontSize:9, color:C.textDim, marginTop:3, textAlign:"right" }}>{m.time}</div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
        {mobile && <div style={{ height:80 }} />}
      </div>

      {/* Input */}
      <div style={{ padding:"10px 14px", borderTop:`1px solid ${C.border}`, display:"flex", gap:8, background:C.bg, flexShrink:0, paddingBottom: mobile?"max(10px, env(safe-area-inset-bottom))":"10px" }}>
        <input style={{ flex:1, background:"rgba(255,255,255,0.05)", border:`1px solid ${C.border}`, borderRadius:10, padding:"10px 13px", color:C.text, fontSize:13, outline:"none" }}
          placeholder="Mensagem como agente..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} />
        <button onClick={send} style={{ width:42, height:42, borderRadius:10, border:"none", background:`linear-gradient(135deg,${C.blue},${C.blueLight})`, color:"#fff", fontSize:16, cursor:"pointer", flexShrink:0 }}>➤</button>
      </div>
    </div>
  );

  if (mobile) {
    return view==="list" ? <ChatList /> : <ChatWindow />;
  }

  return (
    <div style={{ display:"flex", height:"100%", overflow:"hidden" }}>
      <div style={{ width:290, borderRight:`1px solid ${C.border}`, flexShrink:0 }}>
        <ChatList />
      </div>
      <ChatWindow />
      {/* Info Side */}
      <div style={{ width:240, borderLeft:`1px solid ${C.border}`, padding:16, overflow:"auto", flexShrink:0 }}>
        <div style={{ fontSize:10, fontWeight:700, color:C.textDim, letterSpacing:"0.08em", marginBottom:12 }}>CLIENTE</div>
        {[["Nome",sel.name],["Telefone",sel.phone],["Canal","WhatsApp"],["Status",sel.status],["IA Camila",sel.aiActive?"Ativa":"Pausada"]].map(([l,v]) => (
          <div key={l} style={{ marginBottom:10 }}>
            <div style={{ fontSize:9, color:C.textDim, marginBottom:2 }}>{l}</div>
            <div style={{ fontSize:12, color:C.text }}>{v}</div>
          </div>
        ))}
        <Divider />
        <div style={{ fontSize:10, fontWeight:700, color:C.textDim, letterSpacing:"0.08em", marginBottom:10 }}>VISITA</div>
        {(() => { const v = VISITS.find(v=>v.phone===sel.phone); return v ? (
          <div style={{ padding:11, borderRadius:9, background:`${C.blue}14`, border:`1px solid ${C.blue}35` }}>
            <div style={{ fontSize:12, fontWeight:600, color:C.blueLight, marginBottom:3 }}>{v.type}</div>
            <div style={{ fontSize:11, color:C.textMid }}>{v.date} · {v.time}</div>
            <div style={{ fontSize:11, color:C.textDim, marginTop:2 }}>{v.address}</div>
          </div>
        ) : <div style={{ fontSize:11, color:C.textDim }}>Sem visita</div>; })()}
        <Divider />
        <div style={{ fontSize:10, fontWeight:700, color:C.textDim, letterSpacing:"0.08em", marginBottom:10 }}>AÇÕES</div>
        {["＋ Agendar Visita","✎ Editar Contato","⊞ Transferir","✗ Fechar"].map(a => (
          <button key={a} style={{ display:"block", width:"100%", padding:"8px 11px", borderRadius:7, fontSize:11, textAlign:"left", background:"rgba(255,255,255,0.03)", border:`1px solid ${C.border}`, color:C.textMid, cursor:"pointer", marginBottom:6 }}>{a}</button>
        ))}
      </div>
    </div>
  );
}

// ─── AGENDA PAGE ──────────────────────────────────────────────────────────
function Agenda({ mobile }) {
  const dates = ["2025-07-10","2025-07-11","2025-07-12","2025-07-13","2025-07-14"];
  const labels = { "2025-07-10":"Qui 10","2025-07-11":"Sex 11","2025-07-12":"Sáb 12","2025-07-13":"Dom 13","2025-07-14":"Seg 14" };
  const [selDate, setSelDate] = useState("2025-07-10");
  const [assigning, setAssigning] = useState(null);
  const [visits, setVisits] = useState(VISITS);
  const filtered = visits.filter(v=>v.date===selDate);

  const assign = (vid, tid) => { setVisits(vs=>vs.map(v=>v.id===vid?{...v,assignedTo:tid}:v)); setAssigning(null); };

  return (
    <div style={{ padding:mobile?"14px":"28px", overflow:"auto", height:"100%" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={{ fontSize:11, color:C.textDim, fontFamily:"'DM Mono',monospace", letterSpacing:"0.1em" }}>JULHO 2025</div>
          <h2 style={{ fontSize: mobile?18:22, fontWeight:800, color:C.text, margin:0 }}>Agenda de Visitas</h2>
        </div>
        <button style={{ padding:"9px 18px", borderRadius:9, border:"none", background:`linear-gradient(135deg,${C.blue},${C.blueLight})`, color:"#fff", fontWeight:700, fontSize:12, cursor:"pointer" }}>+ Nova Visita</button>
      </div>

      {/* Date Tabs */}
      <div style={{ display:"flex", gap:6, marginBottom:20, overflowX:"auto", paddingBottom:4 }}>
        {dates.map(d => {
          const cnt = visits.filter(v=>v.date===d).length;
          return (
            <button key={d} onClick={()=>setSelDate(d)} style={{
              padding:"8px 16px", borderRadius:9, border:`1px solid ${d===selDate?C.blue+"80":C.border}`,
              background: d===selDate?`${C.blue}25`:"rgba(255,255,255,0.03)",
              color: d===selDate?C.blueLight:C.textDim, fontSize:12, fontWeight:600, cursor:"pointer",
              display:"flex", gap:5, alignItems:"center", flexShrink:0,
            }}>
              {labels[d]}
              {cnt>0 && <span style={{ fontSize:9, background: d===selDate?C.blueLight:C.textDim, color: d===selDate?C.bg:C.text, borderRadius:7, padding:"1px 5px" }}>{cnt}</span>}
            </button>
          );
        })}
      </div>

      {/* Visit Cards */}
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {filtered.length===0 && <div style={{ textAlign:"center", padding:"36px 0", color:C.textDim }}>Nenhuma visita neste dia</div>}
        {filtered.map(v => {
          const tech = TEAM.find(t=>t.id===v.assignedTo);
          const avail = TEAM.filter(t=>t.status!=="folga");
          return (
            <Card key={v.id} accent={prioColor(v.priority)} style={{ padding: mobile?"14px":"18px" }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap: mobile?10:16, flexWrap: mobile?"wrap":"nowrap" }}>
                {/* Time */}
                <div style={{ textAlign:"center", minWidth:44 }}>
                  <div style={{ fontSize:18, fontWeight:800, color:C.blueLight, fontFamily:"'DM Mono',monospace", lineHeight:1 }}>{v.time}</div>
                  <div style={{ fontSize:9, color:C.textDim, marginTop:1 }}>horário</div>
                </div>
                <div style={{ width:1, background:C.border, alignSelf:"stretch", flexShrink:0 }} />

                {/* Info */}
                <div style={{ flex:1, minWidth: mobile?"100%":"0" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:5 }}>
                    <span style={{ fontSize:14, fontWeight:700, color:C.text }}>{v.client}</span>
                    <Pill label={v.type} color={C.accent} />
                    <Pill label={v.status} color={visitColor(v.status)} />
                    {v.priority==="alta" && <Pill label="Alta Prioridade" color={C.danger} />}
                    <span style={{ fontSize:10, color:C.textDim, fontFamily:"'DM Mono',monospace" }}>{v.id}</span>
                  </div>
                  <div style={{ fontSize:12, color:C.textMid, marginBottom:3 }}>📍 {v.address}</div>
                  <div style={{ fontSize:11, color:C.textDim }}>📋 {v.notes}</div>
                </div>

                {/* Assign */}
                <div style={{ minWidth: mobile?"100%":160 }}>
                  <div style={{ fontSize:9, color:C.textDim, marginBottom:6, letterSpacing:"0.05em" }}>TÉCNICO</div>
                  {tech ? (
                    <div style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 9px", borderRadius:7, background:"rgba(74,179,232,0.05)", border:`1px solid ${C.border}` }}>
                      <div style={{ position:"relative" }}>
                        <Av initials={tech.avatar} size={26} color={statusColor(tech.status)} />
                        <div style={{ position:"absolute", bottom:0, right:0, width:7, height:7, borderRadius:"50%", background:statusColor(tech.status), border:"2px solid #07111f" }} />
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:11, fontWeight:600, color:C.text }}>{tech.name}</div>
                        <div style={{ fontSize:9, color:C.textDim }}>{statusLabel(tech.status)}</div>
                      </div>
                      <button onClick={()=>setAssigning(assigning===v.id?null:v.id)} style={{ fontSize:11, background:"none", border:"none", color:C.textDim, cursor:"pointer" }}>✎</button>
                    </div>
                  ) : (
                    <button onClick={()=>setAssigning(assigning===v.id?null:v.id)} style={{ width:"100%", padding:"7px 10px", borderRadius:7, border:`1px dashed ${C.alert}60`, background:`${C.alert}08`, color:C.alert, fontSize:11, cursor:"pointer", fontWeight:700 }}>
                      ⚠ Atribuir Técnico
                    </button>
                  )}
                  {assigning===v.id && (
                    <div style={{ marginTop:6, borderRadius:8, background:"#07111f", border:`1px solid ${C.borderMd}`, overflow:"hidden" }}>
                      {avail.map(t => (
                        <div key={t.id} onClick={()=>assign(v.id,t.id)} style={{ padding:"8px 10px", cursor:"pointer", display:"flex", alignItems:"center", gap:7, borderBottom:`1px solid ${C.border}22` }}>
                          <div style={{ width:7, height:7, borderRadius:"50%", background:statusColor(t.status) }} />
                          <span style={{ fontSize:12, color:C.text, flex:1 }}>{t.name}</span>
                          <span style={{ fontSize:9, color:C.textDim }}>{statusLabel(t.status)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      {mobile && <div style={{ height:80 }} />}
    </div>
  );
}

// ─── EQUIPE PAGE ──────────────────────────────────────────────────────────
function Equipe({ mobile }) {
  return (
    <div style={{ padding:mobile?"14px":"28px", overflow:"auto", height:"100%" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:10 }}>
        <div>
          <div style={{ fontSize:11, color:C.textDim, fontFamily:"'DM Mono',monospace", letterSpacing:"0.1em" }}>GESTÃO</div>
          <h2 style={{ fontSize: mobile?18:22, fontWeight:800, color:C.text, margin:0 }}>Equipe Técnica</h2>
        </div>
        <button style={{ padding:"9px 18px", borderRadius:9, border:"none", background:`linear-gradient(135deg,${C.blue},${C.blueLight})`, color:"#fff", fontWeight:700, fontSize:12, cursor:"pointer" }}>+ Novo Membro</button>
      </div>

      {/* Summary */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:20 }}>
        {[
          { label:"Em Campo",    count:TEAM.filter(t=>t.status==="campo").length,      color:C.success   },
          { label:"Disponíveis", count:TEAM.filter(t=>t.status==="disponivel").length, color:C.blueMid   },
          { label:"De Folga",    count:TEAM.filter(t=>t.status==="folga").length,      color:C.textDim   },
        ].map(s => (
          <Card key={s.label} style={{ padding:"14px 16px", display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ fontSize: mobile?26:30, fontWeight:800, color:s.color }}>{s.count}</div>
            <div style={{ fontSize:12, color:C.textMid }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Team Cards */}
      <div style={{ display:"grid", gridTemplateColumns: mobile?"1fr":"repeat(auto-fill,minmax(320px,1fr))", gap:14 }}>
        {TEAM.map(t => {
          const assigned = VISITS.filter(v=>v.assignedTo===t.id);
          return (
            <Card key={t.id} accent={statusColor(t.status)} style={{ padding:18 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                <div style={{ position:"relative" }}>
                  <Av initials={t.avatar} size={44} color={statusColor(t.status)} />
                  <div style={{ position:"absolute", bottom:1, right:1, width:11, height:11, borderRadius:"50%", background:statusColor(t.status), border:"2px solid #07111f" }} />
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:C.text }}>{t.name}</div>
                  <div style={{ fontSize:11, color:C.textDim }}>{t.role}</div>
                  <div style={{ fontSize:10, color:C.textDim }}>{t.phone}</div>
                </div>
                <Pill label={statusLabel(t.status)} color={statusColor(t.status)} />
              </div>

              {t.status==="campo" && (
                <div style={{ padding:"9px 11px", borderRadius:8, background:`${C.success}08`, border:`1px solid ${C.success}25`, marginBottom:12 }}>
                  <div style={{ fontSize:9, fontWeight:700, color:C.success, letterSpacing:"0.08em" }}>● EM SERVIÇO</div>
                  <div style={{ fontSize:11, color:C.textMid, marginTop:3 }}>{t.job}</div>
                  <div style={{ fontSize:10, color:C.textDim, marginTop:2 }}>📍 {t.location} · desde {t.since}</div>
                </div>
              )}

              <div style={{ fontSize:9, color:C.textDim, letterSpacing:"0.06em", marginBottom:7 }}>VISITAS ATRIBUÍDAS ({assigned.length})</div>
              {assigned.length===0
                ? <div style={{ fontSize:11, color:C.textDim }}>Nenhuma visita</div>
                : <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                    {assigned.slice(0,3).map(v => (
                      <div key={v.id} style={{ display:"flex", gap:8, alignItems:"center", padding:"5px 8px", borderRadius:6, background:"rgba(74,179,232,0.04)" }}>
                        <span style={{ fontSize:10, color:C.blueLight, fontFamily:"'DM Mono',monospace", minWidth:36 }}>{v.time}</span>
                        <span style={{ fontSize:11, color:C.textMid, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{v.client}</span>
                        <Pill label={v.type} color={C.accent} />
                      </div>
                    ))}
                  </div>
              }

              <div style={{ display:"flex", gap:7, marginTop:12 }}>
                <button style={{ flex:1, padding:"7px 0", borderRadius:7, border:`1px solid ${C.border}`, background:"rgba(255,255,255,0.02)", color:C.textMid, fontSize:11, cursor:"pointer" }}>☎ Ligar</button>
                <button style={{ flex:1, padding:"7px 0", borderRadius:7, border:`1px solid ${C.blue}50`, background:`${C.blue}14`, color:C.blueLight, fontSize:11, cursor:"pointer" }}>+ Atribuir</button>
              </div>
            </Card>
          );
        })}
      </div>
      {mobile && <div style={{ height:80 }} />}
    </div>
  );
}

// ─── CAMPO PAGE ────────────────────────────────────────────────────────────
function Campo({ mobile }) {
  const inField   = TEAM.filter(t=>t.status==="campo");
  const avail     = TEAM.filter(t=>t.status==="disponivel");
  const unassigned = VISITS.filter(v=>!v.assignedTo);

  return (
    <div style={{ padding:mobile?"14px":"28px", overflow:"auto", height:"100%" }}>
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:11, color:C.textDim, fontFamily:"'DM Mono',monospace", letterSpacing:"0.1em" }}>MONITORAMENTO</div>
        <h2 style={{ fontSize: mobile?18:22, fontWeight:800, color:C.text, margin:0 }}>Visão de Campo</h2>
      </div>

      <div style={{ display:"grid", gridTemplateColumns: mobile?"1fr":"1fr 1fr", gap:16, marginBottom:16 }}>
        {/* Em Campo */}
        <Card style={{ padding:18 }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.success, marginBottom:14, display:"flex", alignItems:"center", gap:7 }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:C.success, display:"inline-block", boxShadow:`0 0 8px ${C.success}` }} />
            EM CAMPO AGORA
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {inField.map(t => (
              <div key={t.id} style={{ padding:14, borderRadius:10, background:`${C.success}08`, border:`1px solid ${C.success}25` }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                  <Av initials={t.avatar} size={36} color={C.success} />
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{t.name}</div>
                    <div style={{ fontSize:11, color:C.textDim }}>{t.role}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:9, color:C.textDim }}>desde</div>
                    <div style={{ fontSize:14, fontWeight:800, color:C.success, fontFamily:"'DM Mono',monospace" }}>{t.since}</div>
                  </div>
                </div>
                <div style={{ padding:"8px 10px", borderRadius:7, background:"rgba(0,0,0,0.25)" }}>
                  <div style={{ fontSize:10, fontWeight:600, color:C.textMid, marginBottom:3 }}>SERVIÇO ATUAL</div>
                  <div style={{ fontSize:12, color:C.text }}>{t.job}</div>
                  <div style={{ fontSize:10, color:C.textDim, marginTop:2 }}>📍 {t.location}</div>
                </div>
                <div style={{ display:"flex", gap:7, marginTop:9 }}>
                  <div style={{ flex:1, padding:"6px 9px", borderRadius:6, background:"rgba(255,255,255,0.03)", border:`1px solid ${C.border}` }}>
                    <div style={{ fontSize:8, color:C.textDim }}>PRÓXIMO LIVRE</div>
                    <div style={{ fontSize:13, fontWeight:800, color:C.alert, fontFamily:"'DM Mono',monospace" }}>{t.next}</div>
                  </div>
                  <button style={{ padding:"6px 13px", borderRadius:6, border:`1px solid ${C.success}40`, background:`${C.success}10`, color:C.success, fontSize:11, cursor:"pointer" }}>☎</button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Disponíveis + Sem técnico */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Card style={{ padding:18 }}>
            <div style={{ fontSize:12, fontWeight:700, color:C.blueLight, marginBottom:12, display:"flex", alignItems:"center", gap:7 }}>
              <span style={{ width:8, height:8, borderRadius:"50%", background:C.blueMid, display:"inline-block" }} />
              DISPONÍVEIS
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
              {avail.map(t => {
                const nxt = VISITS.find(v=>v.assignedTo===t.id);
                return (
                  <div key={t.id} style={{ padding:"11px 12px", borderRadius:9, background:`${C.blue}10`, border:`1px solid ${C.blue}35` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                      <Av initials={t.avatar} size={32} color={C.blueLight} />
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:12, fontWeight:600, color:C.text }}>{t.name}</div>
                        <div style={{ fontSize:10, color:C.textDim }}>{t.role} · {t.phone}</div>
                      </div>
                      <button style={{ padding:"4px 12px", borderRadius:6, border:"none", background:`linear-gradient(135deg,${C.blue},${C.blueLight})`, color:"#fff", fontSize:10, fontWeight:700, cursor:"pointer" }}>Atribuir</button>
                    </div>
                    {nxt && <div style={{ marginTop:7, padding:"5px 8px", borderRadius:6, background:"rgba(0,0,0,0.2)", fontSize:10, color:C.textDim }}>Próx: {nxt.time} — {nxt.client} ({nxt.type})</div>}
                  </div>
                );
              })}
            </div>
          </Card>

          <Card style={{ padding:18 }}>
            <div style={{ fontSize:12, fontWeight:700, color:C.alert, marginBottom:12 }}>⚠ SEM TÉCNICO ({unassigned.length})</div>
            <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
              {unassigned.map(v => (
                <div key={v.id} style={{ padding:"9px 11px", borderRadius:8, background:`${C.alert}08`, border:`1px solid ${C.alert}30` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:12, fontWeight:600, color:C.text }}>{v.client}</div>
                      <div style={{ fontSize:10, color:C.textDim }}>{v.date} · {v.time} · {v.type}</div>
                    </div>
                    {v.priority==="alta" && <Pill label="Alta" color={C.danger} />}
                    <button style={{ padding:"4px 10px", borderRadius:6, border:`1px solid ${C.alert}50`, background:`${C.alert}14`, color:C.alert, fontSize:10, cursor:"pointer" }}>+ Atribuir</button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Timeline */}
      <Card style={{ padding:18 }}>
        <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:14 }}>Timeline — Hoje</div>
        <div style={{ overflowX:"auto" }}>
          <div style={{ minWidth:660, position:"relative", height:72 }}>
            {[8,9,10,11,12,13,14,15,16,17,18].map(h => (
              <div key={h} style={{ position:"absolute", left:`${(h-8)*9.09}%`, top:0, height:"100%", borderLeft:`1px solid ${C.border}` }}>
                <span style={{ fontSize:9, color:C.textDim, fontFamily:"'DM Mono',monospace", paddingLeft:3 }}>{h}h</span>
              </div>
            ))}
            {VISITS.filter(v=>v.date==="2025-07-10").map(v => {
              const [h,m] = v.time.split(":").map(Number);
              const left = ((h-8)+m/60)*9.09;
              const tech = TEAM.find(t=>t.id===v.assignedTo);
              return (
                <div key={v.id} style={{ position:"absolute", top:20, left:`${left}%`, width:"7.5%", padding:"4px 6px", borderRadius:6, background: tech?`${C.blue}35`:`${C.alert}25`, border:`1px solid ${tech?C.blue+"60":C.alert+"50"}`, fontSize:9, color: tech?C.blueLight:C.alert }}>
                  <div style={{ fontWeight:700, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{v.client.split(" ")[0]}</div>
                  <div style={{ opacity:0.7 }}>{v.time}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {mobile && <div style={{ height:80 }} />}
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");
  const mobile = useIsMobile();

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const PAGES = { dashboard:Dashboard, chats:Chats, agenda:Agenda, equipe:Equipe, campo:Campo };
  const Page = PAGES[page] || Dashboard;

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden", background:C.bg, fontFamily:"'Space Grotesk',sans-serif", position:"relative" }}>
      {/* BG gradient */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0,
        background:`radial-gradient(ellipse 80% 50% at 15% 0%, ${C.blue}10 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 85% 100%, ${C.blueLight}08 0%, transparent 60%)` }} />

      <div style={{ position:"relative", zIndex:1, display:"flex", width:"100%", height:"100%" }}>
        {!mobile && <Sidebar active={page} onNav={setPage} />}

        <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
          <TopBar mobile={mobile} page={page} />
          <div style={{ flex:1, overflow:"hidden" }}>
            <Page mobile={mobile} />
          </div>
        </div>
      </div>

      {mobile && <BottomNav active={page} onNav={setPage} />}
    </div>
  );
}
