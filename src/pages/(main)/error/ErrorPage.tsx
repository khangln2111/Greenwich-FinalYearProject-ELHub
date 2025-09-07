import { Button, Container, Image, SimpleGrid, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import image from "../../../assets/NotFoundImage.svg";

export default function ErrorPage() {
  return (
    <Container className="py-[80px] lg:py-[140px]">
      <SimpleGrid spacing={{ base: 40, md: 80 }} cols={{ base: 1, md: 2 }}>
        <Image src={image} className="block md:hidden" />
        <div>
          <Title
            className="font-black text-[32px] mb-md md:text-[34px] font-[GreyCliff_CF,var(--mantine-font-family)]
              tracking-tight"
          >
            Something is not right...
          </Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className="w-full md:w-auto"
            component={Link}
            to="/"
          >
            Get back to home page
          </Button>
        </div>
        <Image src={image} className="hidden md:block" />
      </SimpleGrid>
    </Container>
  );
}
