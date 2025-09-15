"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import Card from "@/components/card";
import { supaBase } from "../sipabase-client";

export default function DashboardPage() {
  const router = useRouter();
  
  async function logout_onClick() {
    await supaBase.auth.signOut();
    router.push("/login");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <Card>
        <div className="flex flex-col items-center gap-4 w-full px-4">
          <h1 className="text-xl font-semibold">به داشبورد خوش آمدید</h1>
          <Button type="submit" onClick={logout_onClick} aria="logout">
            خروج از حساب کاربری
          </Button>
        </div>
      </Card>
    </main>
  );
}
