#include "device_controller.h"
#include "../repository/base_repository.h"

void DeviceController::listar(int id_usuario, httplib::Response& res) {
    json params = { {"id_usuario", id_usuario} };
    json result = BaseRepository::callModel("dispositivo", "read", params);
    res.set_content(result.dump(), "application/json");
}

void DeviceController::conectar(const json& body, httplib::Response& res) {
    int id = body.value("id", 0);
    // Marca dispositivo como ativo (trigger desativa os outros do mesmo usuário)
    json params = { {"id", id}, {"can_active", 1}, {"is_active", 1} };
    json result = BaseRepository::callModel("dispositivo", "update", params);
    res.set_content(result.dump(), "application/json");
}
