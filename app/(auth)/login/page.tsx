import Shapes from "@/components/shapes/shapes";
import LoginForm from "./login-form";
import Card from "@/components/card";

export default function LoginPage() {
  return (
    <main className="grid md:grid-cols-2 min-h-screen">
      <Shapes />
      <Card>
        <LoginForm />
      </Card>
      <Shapes className="hidden md:block bg-background md:w-1/2" />
    </main>
  );
}
