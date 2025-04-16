import { Anchor, Container } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

const items = [
  { title: "Home", href: "/" },
  { title: "Courses", href: "/courses" },
  { title: "use-id", href: "/courses/id" },
].map((item, index) => (
  <Anchor to={item.href} key={index} component={Link}>
    {item.title}
  </Anchor>
));

function CourseStat({
  icon: Icon,
  label,
  value,
  iconClassName = "text-primary",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  iconClassName?: string;
}) {
  return (
    <li className="flex justify-between items-center py-5 text-md">
      <span className="flex items-center gap-2">
        <Icon className={`size-6 ${iconClassName}`} />
        {label}
      </span>
      <span className="font-medium text-gray-900 dark:text-white">{value}</span>
    </li>
  );
}

const CartPage = () => {
  return (
    <Container
      className="flex-1"
      px={{ base: "15px", md: "20px", lg: "30px", xl: "0px" }}
      py="5xl"
      size="xl"
    ></Container>
  );
};
export default CartPage;
