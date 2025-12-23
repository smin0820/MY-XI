import logo from "@/assets/logo-transparent.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";

export default function SignUp() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="bg-brand-green flex w-full items-center justify-center md:w-1/2">
        <div className="max-w-sm p-8 text-center text-white">
          <img
            src={logo}
            alt="Formation-Lab 로고"
            className="mx-auto h-32 brightness-0 invert filter"
          />
          <h1 className="mt-6 text-3xl font-bold tracking-wide">
            Formation-Lab
          </h1>
          <p className="mt-2 text-sm opacity-90">
            간편한 축구 포메이션 생성 및 공유
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
                className="py-6"
                type="email"
                placeholder="이메일 주소를 입력해 주세요"
                id="email"
                name="email"
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
                className="py-6"
                type="password"
                placeholder="비밀번호를 입력해 주세요"
                id="password"
                name="password"
              />
              <p className="text-muted-foreground text-sm">6자리 이상</p>
            </div>

            <Button type="submit" className="cursor-pointer rounded-full py-6">
              가입하기
            </Button>

            <div>
              <Link
                className="text-muted-foreground hover:underline"
                to={"/signIn"}
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
