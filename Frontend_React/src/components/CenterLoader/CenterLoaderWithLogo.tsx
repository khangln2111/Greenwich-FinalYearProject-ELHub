import { Center, Loader, Stack } from "@mantine/core";
import BrandLogo from "../BrandLogo/BrandLogo";

const CenterLoaderWithLogo = () => {
  return (
    <Center h="100dvh">
      <Stack align="center" justify="center">
        <BrandLogo iconSize={50} textSize={35} className="gap-4" />
        <Loader size="lg" />
      </Stack>
    </Center>
  );
};
export default CenterLoaderWithLogo;
