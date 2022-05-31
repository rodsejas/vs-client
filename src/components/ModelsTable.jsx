import {
  Box,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  IconButton,
  Tr,
  Avatar,
  Link,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link as LinkRoutes, useNavigate } from "react-router-dom";
import * as React from "react";
import { BASE_URL, BASE_API } from "../Constants";
import axios from "axios";

const ModelsTable = (props) => {
  const { models } = props;
  const navigate = useNavigate();

  const _handleDelete = async (e, id, m) => {
    e.preventDefault();
    const url = `${BASE_URL}${BASE_API}/model/${id}/`;
    try {
      await axios.delete(url, m);
      navigate(`/models`);
    } catch (error) {
      console.log(error);
    }
  };

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
          <Th>Model Number</Th>
          {/* <Th>Manufacturer</Th> */}
          <Th>Standards</Th>
          <Th>Lifespan</Th>
          <Th>Inspection Frequency</Th>
          <Th>Manual</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {models.map((m) => (
          <Tr key={m.id}>
            <Td>
              <HStack spacing="3">
                <Avatar
                  src={`https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/${m.image}`}
                  bg="red.500"
                  // icon={<AiOutlineUser fontSize="1.5rem" />}
                />
                <Box>
                  <Text fontWeight="medium">{m.model_name}</Text>
                  <Text color="muted">{m.manufacturer}</Text>
                </Box>
              </HStack>
            </Td>
            <Td>
              <Text color="muted">{m.model_num}</Text>
            </Td>
            {/* <Td>
              <Text color="muted">{m.manufacturer}</Text>
            </Td> */}
            <Td>
              <Text color="muted">{m.standards}</Text>
            </Td>
            <Td>
              <Text color="muted">
                <Text color="muted">{m.lifespan_from_manufacture} months</Text>
              </Text>
            </Td>
            <Td>{m.inspection_frequency} monthly</Td>
            <Td>
              {m.manual ? (
                <Link
                  href={`https://icxujcstmvzimkufacay.supabase.co/storage/v1/object/public/${m.manual}`}
                  isExternal
                >
                  <IconButton icon={<DownloadIcon />} />
                </Link>
              ) : (
                <Text color="muted">N/A</Text>
              )}
            </Td>
            <Td>
              <HStack spacing="1">
                <LinkRoutes to={`/model/${m.id}/edit`}>
                  <IconButton
                    icon={<FiEdit2 fontSize="1.25rem" />}
                    variant="ghost"
                    aria-label="Edit member"
                  />
                </LinkRoutes>

                <IconButton
                  icon={<FiTrash2 fontSize="1.25rem" />}
                  variant="ghost"
                  aria-label="Delete member"
                  onClick={(e) => _handleDelete(e, m.id, m)}
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ModelsTable;
