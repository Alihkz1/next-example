import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full md:w-[600px] h-[250px] p-4 bg-gray-50 rounded-xl">
        <LoginForm/>
      </div>
    </main>
  );
}
