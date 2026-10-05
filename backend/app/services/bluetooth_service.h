#pragma once
#include <string>
#include <sstream>

// Estrutura de um pacote recebido do Arduino via Bluetooth
struct BluetoothPacket {
    std::string modo;
    double      forca_media    = 0;
    double      ritmo_score    = 0;
    double      variacao_ritmo = 0;
    int         tempo_total_ms = 0;
    std::string encerrado_em;  // timestamp ISO
};

// Parseia string do Arduino:
// Formato: "SESSAO|modo:luva|forca_media:420|ritmo_score:87|variacao:5|tempo:30000"
class BluetoothService {
public:
    static BluetoothPacket parse(const std::string& raw) {
        BluetoothPacket pkt;
        std::stringstream ss(raw);
        std::string token;

        while (std::getline(ss, token, '|')) {
            auto sep = token.find(':');
            if (sep == std::string::npos) continue;
            std::string key = token.substr(0, sep);
            std::string val = token.substr(sep + 1);

            if (key == "modo")         pkt.modo           = val;
            else if (key == "forca_media")  pkt.forca_media    = std::stod(val);
            else if (key == "ritmo_score")  pkt.ritmo_score    = std::stod(val);
            else if (key == "variacao")     pkt.variacao_ritmo = std::stod(val);
            else if (key == "tempo")        pkt.tempo_total_ms = std::stoi(val);
        }

        // Timestamp de encerramento (agora)
        std::time_t now = std::time(nullptr);
        char buf[20];
        std::strftime(buf, sizeof(buf), "%Y-%m-%d %H:%M:%S", std::localtime(&now));
        pkt.encerrado_em = std::string(buf);

        return pkt;
    }
};
