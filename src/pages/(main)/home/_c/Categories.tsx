import { Badge, Container, Skeleton, Text, Title, Tooltip } from "@mantine/core";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Link } from "react-router";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetCategories } from "../../../../features/category/category.hooks";
import HomePageSectionWrapper from "./HomePageSectionWrapper";

const Categories = () => {
  const { data, isPending, error } = useGetCategories();

  if (error) {
    return (
      <Container className="my-16 px-4 md:px-8 lg:px-16" size="lg">
        <Title order={2} ta="center" c="red">
          Error Loading Categories
        </Title>
        <Text c="dimmed" mt="md" ta="center">
          {error.message || "An error occurred while fetching categories."}
        </Text>
      </Container>
    );
  }

  return (
    <HomePageSectionWrapper size="2xl">
      <div className="mb-8 text-center">
        <Badge size="lg" variant="light" color="violet" className="mb-3">
          Trending Categories
        </Badge>
        <Title order={2} className="text-4xl font-extrabold dark:text-white">
          Top Categories We Offer
        </Title>
        <Text c="dimmed" mt="md" className="max-w-2xl mx-auto">
          Pick a category and start learning today. Find what sparks your interest.
        </Text>
      </div>

      <div className="flex items-center gap-3">
        {/* prev */}
        <div
          className="swiper-button-next-custom flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full
            border dark:border-dark-5 bg-body text-primary hover:bg-primary hover:text-white shadow-lg
            transition cursor-pointer dark:bg-dark-4"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </div>

        {isPending ? (
          // skeleton state
          <div className="py-4 flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-lg">
                <Skeleton height={180} radius="lg" className="mb-3" />
                <Skeleton height={20} width="80%" radius="sm" className="mx-auto mb-2" />
                <Skeleton height={16} width="50%" radius="sm" className="mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          // normal state
          <Swiper
            modules={[Autoplay, Navigation]}
            slidesPerView={1}
            centeredSlides={false}
            speed={800}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
              1440: { slidesPerView: 5, spaceBetween: 24 },
            }}
            className="py-4 flex-1"
          >
            {data.items.map((category) => (
              <SwiperSlide key={category.id}>
                <Link
                  to={`/courses?categoryId=${category.id}`}
                  className="block overflow-hidden rounded-lg group"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-50">
                    <img
                      src={category.imageUrl ?? ""}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <div className="mt-4 px-2 text-center">
                    <Tooltip label={category.name}>
                      <h3 className="text-xl font-semibold text-primary-6 line-clamp-1 dark:text-primary-4">
                        {category.name}
                      </h3>
                    </Tooltip>
                    <Badge className="mt-2 text-sm px-3 py-1 bg-blue-100 text-primary-8 dark:bg-blue-900 dark:text-blue-300">
                      {category.courseCount} Courses
                    </Badge>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* next */}
        <div
          className="swiper-button-next-custom flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full
            border dark:border-dark-5 bg-body text-primary hover:bg-primary hover:text-white shadow-lg
            transition cursor-pointer dark:bg-dark-4"
        >
          <ArrowRightIcon className="w-6 h-6" />
        </div>
      </div>
    </HomePageSectionWrapper>
  );
};

export default Categories;
