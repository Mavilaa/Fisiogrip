// pages/RankingPage.jsx
import { useEffect, useState } from 'react';
import { rankingGeralApi } from '../api/rankingApi';
import RankingTable from '../components/RankingTable';

export default function RankingPage() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    rankingGeralApi()
      .then(({ data }) => setDados(data))
      .catch(() => setDados([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1 className="page-title">🏆 Ranking Geral</h1>
        <p className="page-subtitle">
          Classificação por estrelas acumuladas em todas as sessões.
        </p>
      </div>

      {loading ? (
        <div className="spinner-wrap">
          <div className="spinner" /> Carregando ranking...
        </div>
      ) : dados.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏆</div>
          <div className="empty-state-text">Ranking ainda vazio</div>
          <div className="empty-state-sub">Complete sessões para aparecer aqui!</div>
        </div>
      ) : (
        <div className="card">
          <RankingTable dados={dados} />
        </div>
      )}
    </div>
  );
}
