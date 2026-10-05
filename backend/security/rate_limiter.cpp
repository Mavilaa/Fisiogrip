// security/rate_limiter.cpp
// Inicialização do map estático do RateLimiter

#include "rate_limiter.h"

std::unordered_map<
    std::string,
    std::pair<std::chrono::steady_clock::time_point, int>
> RateLimiter::table_;
