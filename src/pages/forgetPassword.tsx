import logo from "@/assets/logo-transparent.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRequestPasswordResetEmail } from "@/hooks/mutations/useRequestPasswordResetEmail";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const {
    mutate: requestPasswordResetEmail,
    isPending: isRequestingPasswordResetEmailPending,
  } = useRequestPasswordResetEmail({
    onSuccess: () => {
      toast.info("인증 메일이 잘 발송되었습니다.", {
        position: "top-center",
      });
      setEmail("");
    },
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, {
        position: "top-center",
      });
      setEmail("");
    },
  });

  const handleSendEmailClick = () => {
    if (email.trim() === "") return;
    requestPasswordResetEmail(email);
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
          <h2 className="mb-6 text-center text-2xl font-bold">
            비밀번호 재설정
          </h2>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="text-[14px] text-[rgba(51,65,85,1)]"
              >
                이메일
              </Label>
              <Input
                disabled={isRequestingPasswordResetEmailPending}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-6"
                type="email"
                placeholder="이메일 주소를 입력해 주세요"
              />
              <p className="text-muted-foreground text-sm">
                이메일로 비밀번호를 재설정 할 수 있는 인증 링크를 보내드립니다.
              </p>
            </div>

            <Button
              disabled={isRequestingPasswordResetEmailPending}
              onClick={handleSendEmailClick}
              className="cursor-pointer rounded-full py-6"
            >
              인증 메일 요청하기
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
