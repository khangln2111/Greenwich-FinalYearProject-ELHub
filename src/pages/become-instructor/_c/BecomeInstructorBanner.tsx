import { Anchor, Breadcrumbs, Container, Title } from "@mantine/core";
import { Link } from "react-router-dom";

const breadcrumbItems = [
  { title: "Home", href: "/" },
  { title: "Become an Instructor", href: "/become-instructor" },
].map((item, index) => (
  <Anchor to={item.href} key={index} c="dimmed" size="sm" component={Link}>
    {item.title}
  </Anchor>
));

const BecomeInstructorBanner = () => {
  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-[#eef1fd] dark:from-gray-900 dark:to-gray-800 py-20 mb-8">
      <Container size="lg" className="text-center">
        <Title className="text-5xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white">
          Become an Instructor
        </Title>
        <div className="flex justify-center">
          <Breadcrumbs separator="›" className="text-sm text-gray-500 dark:text-gray-400">
            {breadcrumbItems}
          </Breadcrumbs>
        </div>
      </Container>
    </div>
  );
};

export default BecomeInstructorBanner;
