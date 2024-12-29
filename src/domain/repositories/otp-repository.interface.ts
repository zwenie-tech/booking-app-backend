export interface OTPRepository {
  generateOTP(email: string): number;
  verifyOTP(otp: number, email: string): boolean;
}
