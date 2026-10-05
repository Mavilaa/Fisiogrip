# Makefile — FisioGrasp Backend
# Alternativa ao CMake: basta rodar `make` na pasta backend/
#
# Pré-requisitos:
#   sudo apt install libmysqlcppconn-dev nlohmann-json3-dev

CXX      = g++
CXXFLAGS = -std=c++17 -Wall -O2 \
           -I. -Iroutes -Isecurity \
           -Iapp/controllers -Iapp/models \
           -Iapp/patterns -Iapp/repository -Iapp/services \
           -Ijwt-cpp/include \
           -I/usr/include/cppconn

LDFLAGS  = -lmysqlcppconn -lpthread -lssl -lcrypto

SRCS = main.cpp \
       routes/router.cpp \
       routes/auth_routes.cpp \
       routes/session_routes.cpp \
       routes/device_routes.cpp \
       routes/ranking_routes.cpp \
       routes/admin_routes.cpp \
       security/jwt_manager.cpp \
       security/rate_limiter.cpp \
       app/repository/db_connection.cpp \
       app/controllers/auth_controller.cpp \
       app/controllers/session_controller.cpp \
       app/controllers/device_controller.cpp \
       app/controllers/ranking_controller.cpp \
       app/controllers/admin_controller.cpp \
       app/patterns/observer.cpp

TARGET = fisiogrip_server

all: $(TARGET)

$(TARGET): $(SRCS)
	$(CXX) $(CXXFLAGS) $(SRCS) -o $(TARGET) $(LDFLAGS)
	@echo "✅ Build OK — execute: ./$(TARGET)"

clean:
	rm -f $(TARGET)

.PHONY: all clean
