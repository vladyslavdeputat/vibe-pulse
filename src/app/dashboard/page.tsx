import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";

const DashboardPage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  // Extract only plain data that can be serialized
  const userData = {
    id: user.id,
    firstName: user.firstName,
    emailAddress: user.emailAddresses[0]?.emailAddress || null,
  };

  return <DashboardWrapper user={userData} />;
};

export default DashboardPage;
