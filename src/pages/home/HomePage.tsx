import { Button, CheckIcon } from "@mantine/core";
import Categories from "./_c/Categories";
import Features from "./_c/Features";
import Hero from "./_c/Hero";
import PopularCourses from "./_c/PopularCourses/PopularCourses";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { showSuccessToast } from "../../react-query/toastHelper";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <Categories />
      <PopularCourses />
    </>
  );
};
export default HomePage;
