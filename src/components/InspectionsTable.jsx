import {
  Badge,
  Box,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import * as React from "react";
import { Link } from "react-router-dom";

const InspectionsTable = (props) => {
  const { inspections } = props;
  return (
    <Table {...props}>
      <Thead>
        <Tr>
          <Th>
            <HStack spacing="3">
              <HStack spacing="1">
                <Text>Inspection Record</Text>
              </HStack>
            </HStack>
          </Th>
          <Th>Date</Th>
          <Th>Serial Number</Th>
          <Th>Model</Th>
          <Th>Technician</Th>
          <Th>Result</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {inspections.map((i) => (
          <Tr key={i.id}>
            <Td>
              <HStack spacing="3">
                <Box>
                  <Link key={i.id} to={`/inspection/${i.id}`}>
                    <Text fontWeight="medium">
                      {i.equipments.models.model_name}
                    </Text>
                    <Text color="muted">{i.inspection_date}</Text>
                  </Link>
                </Box>
              </HStack>
            </Td>
            <Td>
              <Text color="muted">{i.inspection_date}</Text>
            </Td>
            <Td>
              <Text color="muted">{i.equipments.serial_num}</Text>
            </Td>
            <Td>
              <Text color="muted">
                {i.workers.first_name} {i.workers.last_name}
              </Text>
            </Td>
            <Td>
              <Text color="muted">
                <Text color="muted">{i.equipments.models.model_name}</Text>
              </Text>
            </Td>
            <Td>
              <Badge colorScheme={i.has_passed ? "green" : "red"}>
                {i.has_passed ? "Passed" : "Failed"}
              </Badge>
            </Td>
            <Td>Test</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default InspectionsTable;
