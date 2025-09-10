import { Title } from "@mantine/core";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import { useGetCurrentUser } from "../../../features/auth/identity.hooks";
import UpdateUserProfileForm from "./_c/UpdateUserProfileForm";
import { usePageSEO } from "../../../hooks/usePageSEO";

export default function MyProfilePage() {
  usePageSEO({ title: "My Profile" });

  const { data: user, isPending, isError } = useGetCurrentUser();

  if (isPending) return <CenterLoader />;

  if (isError || !user) return <div>Error loading user data</div>;

  return (
    <div>
      <Title
        order={1}
        className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 flex-1"
      >
        Personal Information
      </Title>
      <div className="w-full px-4 bg-body rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="rounded-xl max-w-md mx-auto px-2 py-4 md:py-10">
          <UpdateUserProfileForm user={user} />
        </div>
      </div>
    </div>
  );
}
