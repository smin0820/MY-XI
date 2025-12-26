import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdatePassword } from "@/hooks/mutations/useUpdatePassword";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate: updatePassword, isPending: isUpdatePasswordPending } =
    useUpdatePassword({
      onSuccess: () => {
        toast.info("비밀번호가 성공적으로 변경되었습니다.", {
          position: "top-center",
        });
        navigate("/");
      },
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });
        setPassword("");
      },
    });

  const handleUpdatePasswordClick = () => {
    if (password.trim() === "") return;
    updatePassword(password);
  };
  return (
    <div className="flex min-h-screen justify-center">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold">비밀번호 재설정</h1>
        <div className="text-muted-foreground">
          새로운 비밀번호를 입력하세요.
        </div>

        <div className="mt-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="password"
                className="text-[14px] text-[rgba(51,65,85,1)]"
              >
                비밀번호
              </Label>
              <Input
                disabled={isUpdatePasswordPending}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-5"
                type="password"
                placeholder="비밀번호를 입력해 주세요"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button
                disabled={isUpdatePasswordPending}
                onClick={handleUpdatePasswordClick}
                className="cursor-pointer rounded-full py-5"
              >
                비밀번호 변경하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
