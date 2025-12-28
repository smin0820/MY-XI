import logo from "@/assets/logo-transparent.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUp } from "@/hooks/mutations/useSignUp";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signUp, isPending: isSignUpPending } = useSignUp({
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, {
        position: "top-center",
      });
    },
  });

  const handleSignUpClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signUp({ email, password });
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="bg-brand-green flex w-full items-center justify-center md:w-1/2">
        <div className="max-w-sm p-8 text-center text-white">
          <img
            src={logo}
            alt="Formation-Lab 로고"
            className="mx-auto h-32 brightness-0 invert filter"
          />
          <h1 className="mt-6 text-3xl font-bold tracking-wide">MY XI</h1>
          <p className="mt-2 text-sm opacity-90">
            직접 설계하는 나만의 베스트 11 전술 보드
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center p-8 md:w-1/2">
        <div className="w-full max-w-md">
          <h2 className="mb-6 text-center text-2xl font-bold">회원가입</h2>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="text-[14px] text-[rgba(51,65,85,1)]"
              >
                이메일
              </Label>
              <Input
                disabled={isSignUpPending}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-6"
                type="email"
                placeholder="이메일 주소를 입력해 주세요"
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
                disabled={isSignUpPending}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-6"
                type="password"
                placeholder="비밀번호를 입력해 주세요"
              />
              <p className="text-muted-foreground text-sm">6자리 이상</p>
            </div>

            <Button
              disabled={isSignUpPending}
              onClick={handleSignUpClick}
              className="cursor-pointer rounded-full py-6"
            >
              가입하기
            </Button>

            <div>
              <Link
                className="text-muted-foreground hover:underline"
                to={"/signin"}
              >
                이미 계정이 있으신가요? 로그인하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
