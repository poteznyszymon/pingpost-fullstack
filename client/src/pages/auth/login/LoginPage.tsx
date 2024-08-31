import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <main className="relative flex h-screen items-center justify-center">
      <div className="bg-card border border-input flex w-full max-w-[26rem] justify-center rounded-md py-5 shadow-xl">
        <div className="flex h-full w-full flex-col justify-center space-y-10 overflow-y-auto p-5">
          <h2 className="text-3xl font-semibold tracking-tighter">
            Login to pingpost
          </h2>
          <LoginForm />
          <Link
            to="/register"
            className="text-muted-foreground block text-center text-sm hover:underline"
          >
            Don&apos;t have an account?{" "}
            <span className="text-primary font-bold">Register</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
