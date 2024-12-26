import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

export class RateLimiterMiddleware {
  public OTPVerifyLimit: RateLimitRequestHandler;
  constructor() {
    this.OTPVerifyLimit = rateLimit({
      windowMs: 5 * 60 * 1000, // 5 minutes
      max: 5, // Limit each IP to 5 requests per windowMs
      message: {
        status: 429,
        error: "Too many requests. Please try again after 5 minutes.",
      },
    });
  }
}
