import { Link, Outlet } from "react-router";
import logo from "@/assets/logo.png";
import defaultAvatar from "@/assets/default-avatar.png";

export default function GlobalLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="h-15 border-b">
        <div className="m-auto flex h-full w-full max-w-5/6 justify-between px-4">
          <Link to={"/"} className="flex items-center">
            <img
              className="h-10"
              src={logo}
              alt="축구 포메이션 메이커 서비스 로고"
            />
            <div className="font-bold">Formation-Lab</div>
          </Link>
          <div className="flex items-center">
            <img
              className="h-10"
              src={defaultAvatar}
              alt="기본 프로필 이미지"
            />
          </div>
        </div>
      </header>
      <main className="m-auto w-full max-w-5/6 flex-1 border-x px-4 py-6">
        <Outlet />
      </main>
      <footer className="text-muted-foreground border-t py-10 text-center">
        @formation-lab
      </footer>
    </div>
  );
}
