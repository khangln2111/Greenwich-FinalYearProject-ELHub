import { Loader, Title } from "@mantine/core";
import { useGetCurrentUserInfo } from "../../../features/auth/identity.hooks";
import UpdateUserProfileForm from "./_c/UpdateUserProfileForm";
import { PageSEO } from "../../../components/PageSEO/PageSEO";

export default function MyProfilePage() {
  const { data: user, isPending, isError } = useGetCurrentUserInfo();

  if (isPending) return <Loader />;

  if (isError || !user) return <div>Error loading user data</div>;

  return (
    <div>
      <PageSEO
        title="My Profile"
        description="Update your personal information and profile settings on ELHub"
      />
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
