cmake_minimum_required(VERSION 3.16)
project(fisiogrip_backend CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# -----------------------------------------------
# Dependências (ajuste os paths conforme seu sistema)
# -----------------------------------------------
# mysql-connector-c++: sudo apt install libmysqlcppconn-dev
# nlohmann/json:       sudo apt install nlohmann-json3-dev
# cpp-httplib:         coloque httplib.h na pasta backend/
# jwt-cpp:             coloque jwt-cpp/include na pasta backend/
# -----------------------------------------------

find_package(PkgConfig REQUIRED)

include_directories(
    ${CMAKE_SOURCE_DIR}
    ${CMAKE_SOURCE_DIR}/app/controllers
    ${CMAKE_SOURCE_DIR}/app/models
    ${CMAKE_SOURCE_DIR}/app/patterns
    ${CMAKE_SOURCE_DIR}/app/repository
    ${CMAKE_SOURCE_DIR}/app/services
    ${CMAKE_SOURCE_DIR}/routes
    ${CMAKE_SOURCE_DIR}/security
    ${CMAKE_SOURCE_DIR}/jwt-cpp/include
    /usr/include/cppconn
)

set(SOURCES
    main.cpp

    # Routes
    routes/router.cpp
    routes/auth_routes.cpp
    routes/session_routes.cpp
    routes/device_routes.cpp
    routes/ranking_routes.cpp
    routes/admin_routes.cpp

    # Security
    security/jwt_manager.cpp
    security/rate_limiter.cpp

    # Repository
    app/repository/db_connection.cpp

    # Controllers
    app/controllers/auth_controller.cpp
    app/controllers/session_controller.cpp
    app/controllers/device_controller.cpp
    app/controllers/ranking_controller.cpp
    app/controllers/admin_controller.cpp

    # Patterns
    app/patterns/observer.cpp
)

add_executable(fisiogrip_server ${SOURCES})

target_link_libraries(fisiogrip_server
    mysqlcppconn   # mysql-connector-c++
    pthread        # threads para httplib
    ssl crypto     # OpenSSL, requerido pelo jwt-cpp (assinatura HS256)
)

# Mensagem de build
message(STATUS "FisioGrasp backend — C++17")
message(STATUS "Execute: cmake -B build && cmake --build build")
message(STATUS "Binário: ./build/fisiogrip_server")
