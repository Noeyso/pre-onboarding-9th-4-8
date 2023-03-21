import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Icon,
  Box,
  Spacer,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';
import {
  IOrderData,
  IOrderItem,
  SortOrderType,
  SortType,
} from '@/interface/main';
import useSetParams from '@/lib/hooks/useSetParams';
import { formatPageInfo } from '@/lib/utils/formattingHelper';
import {
  generateDefaultValueOfSort,
  generateSortParams,
} from '@/lib/utils/generator';
import TablePagination from './TablePagination';
import TableController from './TableController';
import SortButton from './SortButton';

type Props = {
  data: IOrderData;
};

const OrderTableArea = ({ data }: Props) => {
  const { currentPage, currentSort, onSetParams } = useSetParams();

  const { defaultIdSort, defaultTimeSort } =
    generateDefaultValueOfSort(currentSort);

  const onClickSortButton = (sortBy: SortType, orderBy?: SortOrderType) => {
    onSetParams({
      sortValue: generateSortParams(
        currentSort,
        sortBy,
        orderBy ? `${sortBy}${orderBy}` : undefined,
      ),
    });
  };

  return (
    <Box bg="white" w="100%" borderRadius="2xl" p="1em 2em">
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading size="md">주문 테이블</Heading>
        </Box>
        <Spacer />
        <TableController />
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>
            {formatPageInfo(
              currentPage,
              data.order.length,
              data.orderInfo.totalCount,
            )}
          </TableCaption>
          <Thead>
            <Tr>
              <Th>
                Order ID{' '}
                <SortButton
                  defaultValue={defaultIdSort}
                  onClick={(orderBy?: SortOrderType) =>
                    onClickSortButton('id', orderBy)
                  }
                />
              </Th>
              <Th>Status </Th>
              <Th>Customer Name / ID </Th>
              <Th>
                Time{' '}
                <SortButton
                  defaultValue={defaultTimeSort}
                  onClick={(orderBy?: SortOrderType) =>
                    onClickSortButton('transactionTime', orderBy)
                  }
                />
              </Th>
              <Th>Currency</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.order.map((orderItem: IOrderItem) => {
              return (
                <Tr key={orderItem.id}>
                  <Td>{orderItem.id}</Td>
                  <Td>
                    {orderItem.status ? (
                      <Flex gap={1}>
                        <Icon as={CheckIcon} w={5} h={5} color="green.500" />
                        Complete
                      </Flex>
                    ) : (
                      <Flex gap={1}>
                        <Icon as={WarningIcon} w={5} h={5} color="orange.500" />
                        Incomplete
                      </Flex>
                    )}
                  </Td>
                  <Td>
                    {orderItem.customer_name} / {orderItem.customer_id}
                  </Td>
                  <Td>{orderItem.transaction_time}</Td>
                  <Td>{orderItem.currency}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <TablePagination data={data} />
    </Box>
  );
};

export default OrderTableArea;
