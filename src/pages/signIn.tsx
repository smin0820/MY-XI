import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignInWithOAuth } from "@/hooks/mutations/auth/useSignInWithOAuth";
import { useSignInWithPassword } from "@/hooks/mutations/auth/useSignInWithPassword";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } =
    useSignInWithPassword({
      onError: (error) => {
        const message = generateErrorMessage(error);

        toast.error(message, {
          position: "top-center",
        });
        setPassword("");
      },
    });
  const { mutate: signInWithOAuth, isPending: isSignInWithOAuthPending } =
    useSignInWithOAuth({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });
      },
    });

  const handleSignInWithPasswordClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({ email, password });
  };

  const handleSignInWithOAuthClick = () => {
    signInWithOAuth("kakao");
  };

  const isPending = isSignInWithPasswordPending || isSignInWithOAuthPending;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-slate-100 p-2">
              <img src={logo} alt="MY XI 로고" className="h-12 sm:h-14" />
            </div>
            <div className="text-left">
              <h1 className="text-brand text-2xl font-bold tracking-wide sm:text-3xl">
                MY XI
              </h1>
              <p className="text-muted-foreground text-sm">
                내가 뽑은 베스트 11
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="text-[14px] text-[rgba(51,65,85,1)]"
              >
                이메일
              </Label>
              <Input
                disabled={isPending}
                className="py-5"
                type="email"
                placeholder="이메일 주소를 입력해 주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="password"
                className="text-[14px] text-[rgba(51,65,85,1)]"
              >
                비밀번호
              </Label>
              <Input
                disabled={isPending}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-5"
                type="password"
                placeholder="비밀번호를 입력해 주세요"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                disabled={isPending}
                onClick={handleSignInWithPasswordClick}
                className="cursor-pointer rounded-full py-5"
              >
                로그인
              </Button>
              <Button
                disabled={isPending}
                onClick={handleSignInWithOAuthClick}
                className="cursor-pointer rounded-full bg-[#F7E600] py-5 text-black hover:bg-[#F7E600]/80"
              >
                카카오로 시작하기
              </Button>
            </div>

            <div className="flex flex-col gap-2 text-center">
              <Link
                className="text-muted-foreground hover:underline"
                to={"/signup"}
              >
                계정이 없으신가요? 회원가입
              </Link>
              <Link
                className="text-muted-foreground hover:underline"
                to={"/ForgetPassword"}
              >
                비밀번호를 잊으셨나요?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
