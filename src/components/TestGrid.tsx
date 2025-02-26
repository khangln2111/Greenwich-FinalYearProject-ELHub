import { Box, Flex } from "@mantine/core";

const TestGrid = () => {
  return (
    <Flex h="100vh">
      <Box flex="0 0 220px" bg="lightgreen" p={16}>
        Cột cố định (220px)
      </Box>
      <Box flex="1" bg="lightblue" p={16}>
        Cột linh hoạt (1fr)
      </Box>
    </Flex>
  );
};
export default TestGrid;
