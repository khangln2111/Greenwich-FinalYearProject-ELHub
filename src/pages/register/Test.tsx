import { Box } from "@mantine/core";

const test = () => {
  return (
    <Box p={{ base: "20", "2xl": "50" }} className="xs:flex">
      test
    </Box>
  );
};
export default test;
