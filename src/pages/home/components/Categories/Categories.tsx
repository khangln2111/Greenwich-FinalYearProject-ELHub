import {
  Badge,
  Box,
  Card,
  Container,
  Image,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { Swiper, SwiperSlide } from "swiper/react";
import image from "../../../../assets/homePageImages/CategoryImage.webp";

// Sample data for categories (you can replace this with actual data from your API)
const categories = [
  {
    id: 1,
    name: "Web Development",
    image: image, // Replace with actual image URL
    courseCount: 50,
  },
  {
    id: 2,
    name: "Data Science",
    image: image, // Replace with actual image URL
    courseCount: 30,
  },
  {
    id: 3,
    name: "Mobile Development fdffffffffffffffffsssssssssssssss",
    image: image, // Replace with actual image URL
    courseCount: 40,
  },
  {
    id: 4,
    name: "Design",
    image: image, // Replace with actual image URL
    courseCount: 40,
  },
  {
    id: 5,
    name: "Design",
    image: image, // Replace with actual image URL
    courseCount: 40,
  },
  {
    id: 6,
    name: "Design",
    image: image, // Replace with actual image URL
    courseCount: 40,
  },
  {
    id: 7,
    name: "Design",
    image: image, // Replace with actual image URL
    courseCount: 40,
  },
  // Add more categories as needed
];

const Categories = () => {
  return (
    <Container className="mb-[128px]">
      <Title order={1} ta="start">
        Categories
      </Title>
      <Text c="dimmed" mt="md">
        Several popular categories of courses are available on the platform. You can
        choose from a variety of categories to learn from.
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
        {categories.map((category) => (
          <SwiperSlide
            key={category.id}
            className="transition-transform duration-300 cursor-pointer hover:scale-105"
          >
            <Card
              shadow="md"
              radius="md"
              withBorder
              className="h-full overflow-hidden border border-gray-2 dark:border-dark-5"
            >
              <Card.Section>
                <Image src={category.image} height={160} alt={category.name} />
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
    </Container>
  );
};

export default Categories;
