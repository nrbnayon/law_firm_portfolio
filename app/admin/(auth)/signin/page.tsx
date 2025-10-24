// app\admin\(auth)\signin\page.tsx
"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  rememberMe: z.boolean().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    const loadingToast = toast.loading("Signing in...");
    console.log(data);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Signed in successfully!", { id: loadingToast });
      router.push("/admin/dashboard/practice-areas");
    } catch (error) {
      toast.error("Failed to sign in. Please try again.", { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-primary">
      <div className="w-full max-w-xl">
        <div className="w-full bg-card rounded-2xl p-5 md:p-10 shadow-lg">
          <div className="flex items-center justify-center">
            <img
              src="/dark-logo.png"
              alt="Logo"
              className="w-32 h-16 object-contain"
            />
          </div>

          <div className="space-y-1 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Welcome Back
            </h1>
            <p className="text-base text-gray-600">
              Enter your email and password to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-12 bg-card border-input"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-12 pr-12 bg-card border-input"
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
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-2">
                <Controller
                  name="rememberMe"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Checkbox
                      id="rememberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-sm font-normal cursor-pointer text-muted-foreground"
                >
                  Remember me
                </Label>
              </div>
              <Link
                href="/admin/forget-password"
                className="text-sm font-medium text-green-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {errors.root && (
              <p className="text-sm text-destructive text-center pt-2">
                {errors.root.message}
              </p>
            )}

            <Button
              size="lg"
              type="submit"
              className="w-full h-12 bg-primary-gold hover:bg-primary-gold/90 text-lg text-primary-foreground font-semibold rounded-xs mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
