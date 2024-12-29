import { OTPRepository } from "../../../domain/repositories/otp-repository.interface";

type OtpEntry = {
  otp: number;
  expiry: number;
  verified: boolean;
};
type OtpMap = {
  [email: string]: OtpEntry;
};

const otpStore: OtpMap = {};

export class OTPService implements OTPRepository {
  generateOTP(email: string): number {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiry = Date.now() + 5 * 60 * 1000;
    otpStore[email] = { otp, expiry, verified: false };
    console.log(otpStore[email]);
    return otp;
  }
  verifyOTP(otp: number, email: string): boolean {
    const storedData = otpStore[email];
    if (storedData) {
      const { otp: storedOtp, expiry } = storedData;
      if (otp === storedOtp && Date.now() <= expiry) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
