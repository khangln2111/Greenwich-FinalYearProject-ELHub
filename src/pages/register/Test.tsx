import { Box } from "@mantine/core";

const test = () => (
  <Box
    p={{ base: "20", "2xl": "50" }}
    className="xs:flex bgi-auth-dark hidden-from-2xl visible-from-2xl z-app text-base"
  >
    test
  </Box>
);
export default test;
