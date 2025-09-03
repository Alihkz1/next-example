import Shapes from "@/components/shapes/shapes";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <main className="grid md:grid-cols-2 min-h-screen">
      <Shapes />
      <div className="w-50 h-full p-4 rounded-lg bg-white shadow-md flex justify-center items-center">
        <LoginForm />
      </div>
      <Shapes className="hidden md:block bg-background md:w-1/2" /> 
    </main>
  );
}
