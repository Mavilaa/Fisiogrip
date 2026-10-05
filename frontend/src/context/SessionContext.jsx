// context/SessionContext.jsx
import { createContext, useContext, useState } from 'react';

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [sessaoAtiva, setSessaoAtiva] = useState(null);
  const [forcaAtual,  setForcaAtual]  = useState(0);
  const [ritmoAtual,  setRitmoAtual]  = useState(0);
  const [scoreParc,   setScoreParcial] = useState(0);

  function iniciarSessao(dados) { setSessaoAtiva(dados); }
  function atualizarLeitura(forca, ritmo) {
    setForcaAtual(forca);
    setRitmoAtual(ritmo);
    setScoreParcial((forca * 0.4) + (ritmo * 0.6));
  }
  function encerrarSessao() {
    setSessaoAtiva(null);
    setForcaAtual(0);
    setRitmoAtual(0);
    setScoreParcial(0);
  }

  return (
    <SessionContext.Provider value={{
      sessaoAtiva, forcaAtual, ritmoAtual, scoreParc,
      iniciarSessao, atualizarLeitura, encerrarSessao
    }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
