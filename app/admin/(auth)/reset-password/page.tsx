// app/admin/(auth)/reset-password/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  verifyOTP,
  resetPassword,
  clearError,
} from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

const resetPasswordSchema = z
  .object({
    otp: z
      .string()
      .length(6, "OTP must be 6 digits")
      .regex(/^\d+$/, "OTP must contain only numbers"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [resetToken, setResetToken] = useState("");

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, accessToken } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("resetEmail");
      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        router.push("/admin/forget-password");
      }
    }
  }, [router]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Update reset token when OTP is verified
  useEffect(() => {
    if (accessToken && otpVerified) {
      setResetToken(accessToken);
    }
  }, [accessToken, otpVerified]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const otpValue = watch("otp");

  // Auto-verify OTP when 6 digits are entered
  useEffect(() => {
    if (otpValue && otpValue.length === 6 && !otpVerified) {
      handleVerifyOTP(otpValue);
    }
  }, [otpValue]);

  const handleVerifyOTP = async (otp: string) => {
    const result = await dispatch(
      verifyOTP({
        email,
        oneTimeCode: otp,
      })
    );

    if (verifyOTP.fulfilled.match(result)) {
      setOtpVerified(true);
      toast.success("OTP verified successfully!");
    }
  };

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!otpVerified) {
      toast.error("Please verify OTP first");
      return;
    }

    if (!resetToken) {
      toast.error("Invalid reset token. Please try again.");
      return;
    }

    const result = await dispatch(
      resetPassword({
        email,
        newPassword: data.password,
        confirmPassword: data.confirmPassword,
        token: resetToken,
      })
    );

    if (resetPassword.fulfilled.match(result)) {
      toast.success("Password reset successfully!");

      // Clear sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("resetEmail");
      }

      router.push("/admin/signin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary text-lg">
      <div className="w-full max-w-xl">
        <div className="w-full bg-card rounded-2xl p-5 md:p-10 shadow-lg">
          <div className="space-y-8">
            <Link
              href="/admin/forget-password"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Reset Password
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter the verification code and create a new password
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="h-12 bg-muted border-input text-muted-foreground cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="otp"
                    className="text-sm font-medium text-foreground"
                  >
                    Verification Code
                  </Label>
                  {otpVerified && (
                    <span className="text-xs text-green-600 font-medium">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <Controller
                  control={control}
                  name="otp"
                  defaultValue=""
                  render={({ field }) => (
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isLoading || otpVerified}
                    >
                      <InputOTPGroup className="w-full justify-center gap-2">
                        <InputOTPSlot index={0} className="h-12 w-12" />
                        <InputOTPSlot index={1} className="h-12 w-12" />
                        <InputOTPSlot index={2} className="h-12 w-12" />
                        <InputOTPSlot index={3} className="h-12 w-12" />
                        <InputOTPSlot index={4} className="h-12 w-12" />
                        <InputOTPSlot index={5} className="h-12 w-12" />
                      </InputOTPGroup>
                    </InputOTP>
                  )}
                />
                {errors.otp && (
                  <p className="text-sm text-destructive">
                    {errors.otp.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Create new password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="h-12 pr-10 bg-card border-input"
                    disabled={!otpVerified || isLoading}
                    {...register("password")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    disabled={!otpVerified}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-foreground"
                >
                  Confirm new password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className="h-12 pr-10 bg-card border-input"
                    disabled={!otpVerified || isLoading}
                    {...register("confirmPassword")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                    disabled={!otpVerified}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary-gold hover:bg-primary-gold/90 text-primary-foreground font-medium"
                disabled={isLoading || !otpVerified}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Resetting password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
