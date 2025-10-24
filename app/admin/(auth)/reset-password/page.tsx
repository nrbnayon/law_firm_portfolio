// app\admin\(auth)\reset-password\page.tsx
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
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

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

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Password reset for:", email);
      console.log("OTP:", data.otp);
      console.log("New password:", data.password);

      if (typeof window !== "undefined") {
        sessionStorage.removeItem("resetEmail");
      }

      router.push("/admin/signin");
    } catch (error) {
      console.error("Error:: ", error);
      setError("root", {
        message: "Failed to reset password. Please try again.",
      });
    } finally {
      setIsLoading(false);
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
                <Label
                  htmlFor="otp"
                  className="text-sm font-medium text-foreground"
                >
                  Verification Code
                </Label>
                <Controller
                  control={control}
                  name="otp"
                  defaultValue=""
                  render={({ field }) => (
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
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
                    {...register("password")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
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
                    {...register("confirmPassword")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
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

              {errors.root && (
                <p className="text-sm text-destructive text-center">
                  {errors.root.message}
                </p>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-primary-gold hover:bg-primary-gold/90 text-primary-foreground font-medium"
                disabled={isLoading}
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
