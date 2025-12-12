import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow">
          <p className="mb-2">Welcome, {session.user.name}!</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            Email: {session.user.email}
          </p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
