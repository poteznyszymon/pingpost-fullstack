import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const page = () => {
  return (
    <main className="relative flex h-screen items-center justify-center">
      <div className="bg-card border-input flex w-full max-w-[26rem] justify-center rounded-md border py-5 shadow-2xl">
        <div className="flex h-full w-full flex-col justify-center space-y-10 overflow-y-auto p-5">
          <h2 className="text-3xl font-semibold tracking-tighter">
            Create pingpong account
          </h2>
          <RegisterForm />
          <Link
            to="/login"
            className="text-muted-foreground block text-center text-sm hover:underline"
          >
            Already have an account?{" "}
            <span className="text-primary font-bold">Login</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default page;
