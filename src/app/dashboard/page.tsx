import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back,{" "}
            {user.firstName || user.emailAddresses[0]?.emailAddress}!
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-2">Profile</h2>
            <p className="text-sm text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-2">Settings</h2>
            <p className="text-sm text-muted-foreground">
              Configure your application settings
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-2">Activity</h2>
            <p className="text-sm text-muted-foreground">
              View your recent activity and history
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
