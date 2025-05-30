import { Loader } from "@mantine/core";
import { useCurrentUser } from "../../react-query/auth/identityHooks";
import UpdateUserProfileForm from "./_c/UpdateUserProfileForm";

export default function MyAccountPage() {
  const { data: user, isPending, isError } = useCurrentUser();

  if (isPending) return <Loader />;

  if (isError || !user) return <div>Error loading user data</div>;

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 flex-1">
        {" "}
        Personal Information
      </h1>
      <div className="w-full px-4 bg-body rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="rounded-xl max-w-(--container-md) mx-auto px-2 py-4 md:py-10">
          <UpdateUserProfileForm user={user} />
        </div>
      </div>
    </div>
  );
}
