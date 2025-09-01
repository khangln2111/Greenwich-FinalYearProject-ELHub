import UpdateWorkProfileForm from "./UpdateWorkProfileForm";
import CenterLoader from "../../../components/CenterLoader/CenterLoader";
import { useGetWorkProfileSelf } from "../../../features/auth/identityHooks";

export default function InstructorProfilePage() {
  const { data, isLoading, isError } = useGetWorkProfileSelf();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <CenterLoader />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center text-red-600 mt-12">
        Failed to load work profile. Please try again later.
      </div>
    );
  }
  return (
    <div className="px-4 py-8 flex-1">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-center">Instructor Profile</h1>
        <UpdateWorkProfileForm profile={data} />
      </div>
    </div>
  );
}
