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
  Avatar,
  Link,
} from "@chakra-ui/react";
import * as React from "react";
import moment from "moment";
// import { Link } from "react-router-dom";

const InspectionsTable = (props) => {
  const { inspections } = props;
  return (
    <Table {...props}>
      <Thead>
        <Tr>
          <Th>
            <HStack spacing="3">
              <HStack spacing="1">
                <Text>Model</Text>
              </HStack>
            </HStack>
          </Th>
          <Th>Date of Inspection</Th>
          <Th>Serial Number</Th>
          <Th>Technician</Th>
          <Th>Notes</Th>
          <Th>Result</Th>
          <Th>Images</Th>
        </Tr>
      </Thead>
      <Tbody>
        {inspections.map((i) => (
          <Tr key={i.id}>
            <Td>
              <HStack spacing="3">
                <Box>
                  <Text fontWeight="medium">
                    {i.equipments.models.model_name}
                  </Text>
                  <Text color="muted">
                    {moment(i.inspection_date).format("MMM Do YYYY")}
                  </Text>
                </Box>
              </HStack>
            </Td>
            <Td>
              <Text color="muted">
                {moment(i.inspection_date).format("MMM Do YYYY")}
              </Text>
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
                <Text color="muted">{i.notes}</Text>
              </Text>
            </Td>
            <Td>
              <Badge colorScheme={i.has_passed ? "green" : "red"}>
                {i.has_passed ? "Passed" : "Failed"}
              </Badge>
            </Td>
            <Td>
              {i.image ? (
                <Link
                  href={`https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/${i.image}`}
                  isExternal
                >
                  <Avatar
                    src={`https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/${i.image}`}
                  />
                </Link>
              ) : (
                "No image"
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default InspectionsTable;
