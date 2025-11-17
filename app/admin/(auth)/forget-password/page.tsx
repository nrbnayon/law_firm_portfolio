// app/admin/(auth)/forget-password/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { forgotPassword, clearError } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const result = await dispatch(forgotPassword(data.email));

    if (forgotPassword.fulfilled.match(result)) {
      toast.success("Verification code sent to your email!");

      // Store email in sessionStorage for the next step
      if (typeof window !== "undefined") {
        sessionStorage.setItem("resetEmail", data.email);
      }

      router.push("/admin/reset-password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary text-lg">
      <div className="w-full max-w-md bg-card rounded-2xl p-4 md:p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-primary-gold/10 flex items-center justify-center">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center space-y-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Forget Password?
            </h1>
            <p className="text-base text-muted-foreground">
              To reset password, Enter your email and we'll send you a
              verification code
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-base font-medium text-foreground"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              className="h-12 bg-card border-input focus:border-primary-gold"
              {...register("email")}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-primary-gold hover:bg-primary-gold/90 text-primary-foreground text-base font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Sending...
              </>
            ) : (
              "Send Verification Code"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/admin/signin"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
