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
import moment from "moment";
import { Link } from "react-router-dom";

const EquipmentsTable = (props) => {
  const { equipments } = props;
  return (
    <Table {...props}>
      <Thead>
        <Tr>
          <Th>
            <HStack spacing="3">
              <HStack spacing="1">
                <Text>Equipment</Text>
              </HStack>
            </HStack>
          </Th>
          <Th>Serial Number</Th>
          <Th>Assigned Worker</Th>
          <Th>Lifespan To</Th>
          <Th>Inspection Due</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {equipments.map((equipment) => (
          <Tr key={equipment.id}>
            <Td>
              <HStack spacing="3">
                <Box>
                  <Link key={equipment.id} to={`/equipment/${equipment.id}`}>
                    <Text fontWeight="medium">
                      {equipment.models.model_name}
                    </Text>
                    <Text color="muted">{equipment.specification}</Text>
                  </Link>
                </Box>
              </HStack>
            </Td>
            <Td>
              <Text color="muted">{equipment.serial_num}</Text>
            </Td>
            <Td>
              <Text color="muted">{equipment.workers.first_name}</Text>
            </Td>
            <Td>
              <Text color="muted">
                {moment(equipment.end_of_life).format("MMM Do YYYY")}
              </Text>
            </Td>
            <Td>
              <Text color="muted">
                <Text color="muted">
                  {moment(equipment.next_inspection_due).format("MMM Do YYYY")}
                </Text>
              </Text>
            </Td>
            <Td>
              <Badge
                colorScheme={equipment.status === "Suitable" ? "green" : "red"}
              >
                {equipment.status}
              </Badge>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default EquipmentsTable;
