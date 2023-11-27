import { Box, Button, ButtonGroup } from '@chakra-ui/react';

const Pagination = ({
  currentPage,
  productsPerPage,
  totalProducts,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleClick = (page) => {
    onPageChange(page)
  }

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handleClick(i)}
          colorScheme={currentPage === i ? 'cyan' : 'gray'}
        >
          {i}
        </Button>,
      );
    }
    return buttons
  };

  return (
    <Box>
      <ButtonGroup spacing={2}>{renderPaginationButtons()}</ButtonGroup>
    </Box>
  );
};

export default Pagination;