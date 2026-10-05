// components/RankingTable.jsx
import StarRating from './StarRating';

const MEDALS = ['🥇', '🥈', '🥉'];
const PERFIL_BADGE = { motor: 'badge-primary', tdah: 'badge-warning', autismo: 'badge-success', outro: 'badge-muted' };
const PERFIL_LABEL = { motor: 'Motor', tdah: 'TDAH', autismo: 'Autismo', outro: 'Outro' };

export default function RankingTable({ dados }) {
  if (!dados || dados.length === 0) return null;

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Usuário</th>
            <th>Perfil</th>
            <th>Estrelas</th>
            <th>Sessões</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((row) => {
            const medal = MEDALS[row.posicao - 1] || row.posicao;
            const rankClass = row.posicao <= 3 ? `rank-${row.posicao}` : '';
            return (
              <tr key={row.posicao}>
                <td>
                  <span style={{ fontSize: row.posicao <= 3 ? 20 : 14, fontWeight: 700 }} className={rankClass}>
                    {medal}
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>{row.nome}</td>
                <td>
                  <span className={`badge ${PERFIL_BADGE[row.perfil?.toLowerCase()] || 'badge-muted'}`}>
                    {PERFIL_LABEL[row.perfil?.toLowerCase()] || row.perfil}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <StarRating estrelas={Math.min(Math.round(row.total_estrelas / Math.max(row.total_sessoes, 1)), 3)} />
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>{row.total_estrelas} total</span>
                  </div>
                </td>
                <td style={{ color: 'var(--text-2)', fontWeight: 600 }}>{row.total_sessoes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
