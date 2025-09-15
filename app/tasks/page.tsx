"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { supaBase } from "../sipabase-client";
import { Session } from "@supabase/supabase-js";

interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
  image: string;
}
export default function TaskManager() {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [taskImage, setTaskImage] = useState(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    fetchTasks();
    const { data: authListener } = supaBase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchTasks = async () => {
    const { error, data } = await supaBase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("fetch tasks error:  ", error);
      return;
    }
    setTasks(data);
  };

  const deleteTask = async (id: number) => {
    const { error } = await supaBase.from("tasks").delete().eq("id", id);
    if (error) {
      console.error("delete task error:  ", error);
      return;
    }
    fetchTasks();
  };

  const addTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTask.description || !newTask.title) return;
    setLoading(true);

    const imageUrl = await uploadImage(taskImage);

    const { error } = await supaBase
      .from("tasks")
      .insert({ ...newTask, image: imageUrl, email: session?.user.email })
      .single();
    if (error) {
      console.error("create task error:  ", error);
      setLoading(false);
      return;
    }
    fetchTasks();
    setNewTask({ title: "", description: "" });
    setTaskImage(null);
    setLoading(false);
  };

  const updateTask = async (id: number) => {
    const { error } = await supaBase
      .from("tasks")
      .update({ description: updatedDescription })
      .eq("id", id);
    if (error) {
      console.error("update task error:  ", error);
      return;
    }
    fetchTasks();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setTaskImage(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const filePath = `${Date.now()}-${file.name}`;
    const { error } = await supaBase.storage
      .from("tasks-images")
      .upload(filePath, file);

    if (error) {
      console.log("error in upload image: ", error);
      return null;
    }

    const { data } = await supaBase.storage
      .from("tasks-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center py-8">
      <div className="flex flex-col w-[800px] items-center gap-4">
        <h2 className="font-semibold">Task Manager CRUD</h2>
        <p className="text-red-200">crud policy - realtime - task by id</p>
        {/* Form to add a new task */}
        <form className="mb-2 grid grid-cols-2 gap-2 w-full" onSubmit={addTask}>
          <input
            type="text"
            className="border rounded-md p-2"
            placeholder="Task Title"
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <textarea
            className="border rounded-md p-2"
            placeholder="Task Description"
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, description: e.target.value }))
            }
          />

          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button
            className="border rounded-md p-2 col-span-2 bg-blue-100"
            type="submit"
          >
            {loading ? "saving..." : "Add Task"}
          </button>
        </form>

        {/* List of Tasks */}
        <ul className="grid grid-cols-3 gap-2 w-full">
          {tasks.map((task, key) => (
            <li
              key={key}
              className="border p-2 rounded-md grid grid-cols-2 gap-2 my-1"
            >
              <h3 className="col-span-2">
                <b>Title:</b> {task.title}
              </h3>
              <p className="col-span-2">
                <b>description:</b> {task.description}
              </p>
              {/* <Image
                className="col-span-2"
                src={task.image}
                height={70}
                width={70}
                alt=""
              /> */}
              <textarea
                className="border col-span-2 p-2"
                placeholder="Updated description..."
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
              <div className="col-span-2 w-full grid grid-cols-2 gap-2">
                <button
                  className="border rounded-md bg-green-200"
                  onClick={() => updateTask(task.id)}
                >
                  Edit
                </button>
                <button
                  className="border rounded-md bg-pink-200"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
