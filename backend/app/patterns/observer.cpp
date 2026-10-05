// app/patterns/observer.cpp
// Inicialização do vetor estático de handlers do SessionObserver

#include "observer.h"

std::vector<SessionObserver::Handler> SessionObserver::handlers_;
