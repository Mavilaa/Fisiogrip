// services/sessionService.js
// Formata o pacote bruto do Arduino e monta payload para o back-end

import { parseBluetoothPacket } from '../utils/parseBluetoothPacket';
import { calcStars }            from '../utils/calcStars';

export const sessionService = {

  // Monta o body para POST /sessao/encerrar
  buildEncerrarPayload(id_sessao, rawBT) {
    const pkt      = parseBluetoothPacket(rawBT);
    const estrelas = calcStars(pkt.forca_media, pkt.ritmo_score);
    return {
      id_sessao,
      pacote_bt:  rawBT,
      estrelas,   // preview local (back-end recalcula e é o valor oficial)
      ...pkt,
    };
  },
};
