"use client";
import { redirect } from "next/navigation";
import { supaBase } from "./sipabase-client";
import { useEffect } from "react";

export default function HomePage() {
  const handleIsLogin = async () => {
    const { data } = await supaBase.auth.getSession();
    redirect(data.session ? "/tasks" : "/login");
  };

  useEffect(() => {
    handleIsLogin();
  }, []);
}
