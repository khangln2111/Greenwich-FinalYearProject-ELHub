import { Badge, Box, Card, Container, Image, Stack, Text, Title, Tooltip } from "@mantine/core";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetCategories } from "../../../../features/category/category.hooks";
import CenterLoader from "../../../../components/CenterLoader/CenterLoader";
import { Link } from "react-router";
import HomePageSectionWrapper from "./HomePageSectionWrapper";

const Categories = () => {
  const { data, isPending, error } = useGetCategories();

  if (isPending) return <CenterLoader />;

  if (error) {
    return (
      <Container className="mb-[128px]" size="lg">
        <Title order={1} ta="start" c="red">
          Error Loading Categories
        </Title>
        <Text c="dimmed" mt="md">
          {error.message || "An error occurred while fetching categories."}
        </Text>
      </Container>
    );
  }
  return (
    <HomePageSectionWrapper>
      <Title order={1} ta="start">
        Categories
      </Title>
      <Text c="dimmed" mt="md">
        Several popular categories of courses are available on the platform. You can choose from a
        variety of categories to learn from.
      </Text>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        className="size-full p-sm"
      >
        {data.items.map((category) => (
          <SwiperSlide
            key={category.id}
            className="transition-transform duration-300 cursor-pointer hover:scale-105"
          >
            <Card
              shadow="md"
              radius="md"
              withBorder
              className="h-full overflow-hidden border border-gray-2 dark:border-dark-5"
              component={Link}
              to={`/courses?categoryId=${category.id}`}
            >
              <Card.Section className="relative aspect-video">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </Card.Section>
              <Stack mb="xs" justify="space-between" align="center" h="100%">
                <Box className="content-[''] block bg-primary-filled w-[45px] h-[2px] my-sm"></Box>
                <Tooltip label={category.name}>
                  <Text
                    ta="center"
                    fw="500"
                    className="text-[24px] font-black line-clamp-1"
                    style={{ textWrap: "wrap" }}
                    variant="gradient"
                    gradient={{ from: "indigo", to: "cyan", deg: 90 }}
                  >
                    {category.name}
                  </Text>
                </Tooltip>
                <Badge color="teal" variant="light">
                  {category.courseCount} Courses
                </Badge>
              </Stack>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </HomePageSectionWrapper>
  );
};

export default Categories;
