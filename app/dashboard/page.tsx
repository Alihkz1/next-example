"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser, clearUser } from "@/lib/storage";
import Image from "next/image";
import Button from "@/components/button";
import Card from "@/components/card";

export default function DashboardPage() {
  const router = useRouter();
  const user = getUser();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null;

  function logout_onClick() {
    clearUser();
    router.push("/login");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <Card>
        <div className="flex flex-col items-center gap-4 w-full px-4">
          <h1 className="text-xl font-semibold">
            Welcome {user.name.first} {user.name.last}!
          </h1>
          <p className="text-gray-600">{user.email}</p>
          <Image
            src={user.picture.medium}
            className="w-24 h-24 rounded-full mx-auto my-4"
            alt="عکس پروفایل"
            height={24}
            width={24}
          />
          <Button type="submit" onClick={logout_onClick}>
            خروج از حساب کاربری
          </Button>
        </div>
      </Card>
    </main>
  );
}
