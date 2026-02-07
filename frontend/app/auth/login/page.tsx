"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/lib/auth";
import { useTasks } from "@/src/lib/tasks";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const {
    tasks,
    isLoading,
    error,
    fetchTasks,
    createTask,
    toggleTaskComplete,
    deleteTask,
  } = useTasks();

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    fetchTasks();
  }, [isAuthenticated, fetchTasks, router]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    setIsCreating(true);
    await createTask({
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim() || undefined,
      is_completed: false,
    });
    setNewTaskTitle("");
    setNewTaskDescription("");
    setIsCreating(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-gray-50">
        Redirecting to login...
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-100 to-violet-100 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Welcome Header */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">
            Your Workspace
          </h1>
          <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Welcome back, {user?.email}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Total Tasks" 
            value={tasks.length} 
            icon={
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            }
            gradient="from-violet-500 to-purple-600"
          />
          <StatCard
            title="Completed"
            value={tasks.filter((t) => t.is_completed).length}
            icon={
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            }
            gradient="from-emerald-500 to-green-600"
          />
          <StatCard
            title="In Progress"
            value={tasks.filter((t) => !t.is_completed).length}
            icon={
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            }
            gradient="from-fuchsia-500 to-pink-600"
          />
        </div>

        {/* Create Task Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Task</h2>
          </div>
          
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <label htmlFor="taskTitle" className="block text-sm font-semibold text-gray-700 mb-2">
                Task Title
              </label>
              <input
                id="taskTitle"
                type="text"
                placeholder="What needs to be done?"
                className="w-full border-2 border-gray-200 bg-white rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                disabled={isCreating}
              />
            </div>
            <div>
              <label htmlFor="taskDescription" className="block text-sm font-semibold text-gray-700 mb-2">
                Description (optional)
              </label>
              <textarea
                id="taskDescription"
                placeholder="Add more details..."
                rows={3}
                className="w-full border-2 border-gray-200 bg-white rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all resize-none"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                disabled={isCreating}
              />
            </div>
            <button
              type="submit"
              disabled={isCreating}
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 rounded-xl font-semibold text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/40 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isCreating ? "Creating..." : "Add Task"}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl text-red-700 p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Tasks List */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-600 to-pink-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Your Tasks</h2>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
              <p className="text-gray-600 mt-4">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-gray-500 text-lg font-medium">No tasks yet</p>
              <p className="text-gray-400 text-sm mt-1">Create your first task to get started!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="group flex justify-between items-start border-2 border-gray-200 rounded-xl p-5 hover:border-violet-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex gap-4 flex-1">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={task.is_completed}
                        onChange={() =>
                          toggleTaskComplete(task.id, !task.is_completed)
                        }
                        className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-violet-600 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 cursor-pointer transition-all"
                      />
                    </label>
                    <div className="flex-1">
                      <p
                        className={`font-semibold text-lg ${
                          task.is_completed
                            ? "line-through text-gray-400"
                            : "text-gray-900"
                        }`}
                      >
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {task.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {new Date(task.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="ml-4 text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                    title="Delete task"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

/* Stat Card Component */
function StatCard({
  title,
  value,
  icon,
  gradient,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
            {title}
          </p>
          <p className="text-4xl font-extrabold text-gray-900">{value}</p>
        </div>
        <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg`}>
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {icon}
          </svg>
        </div>
      </div>
    </div>
  );
}