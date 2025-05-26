import { Loader } from "@mantine/core";
import { useCurrentUser } from "../../react-query/auth/identityHooks";
import UpdateUserProfileForm from "./_c/UpdateUserProfileForm";

export default function MyAccountPage() {
  const { data: user, isPending, isError } = useCurrentUser();

  if (isPending) return <Loader />;

  if (isError || !user) return <div>Error loading user data</div>;

  return (
    <div>
      <h2 className="mb-3">Personal Information</h2>
      <div className="w-full px-4 bg-body rounded-md border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="rounded-xl max-w-(--container-md) mx-auto px-2 py-4 md:py-10">
          <UpdateUserProfileForm user={user} />
        </div>
      </div>
    </div>
  );
}
