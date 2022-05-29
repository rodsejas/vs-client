import React from "react";
// import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL, BASE_API } from "../Constants";
import { Link } from "react-router-dom";
// import {
//   Box,
//   Button,
//   Container,
//   Divider,
//   Stack,
//   Text,
//   useColorModeValue,
// } from "@chakra-ui/react";

export default function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [inspections, setInspections] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  const _handleDelete = async (e) => {
    e.preventDefault();

    const url = `${BASE_URL}${BASE_API}/equipment/${params.id}`;
    try {
      await axios.delete(url, equipment);
      navigate(`/equipments`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchEquipment = async () => {
      const { data } = await axios.get(
        `${BASE_URL}${BASE_API}/equipment/${params.id}`
      );
      setEquipment(data);
    };

    const fetchInspections = async () => {
      const { data } = await axios.get(
        `${BASE_URL}${BASE_API}/equipment/${params.id}/inspections`
      );
      setInspections(data);
    };

    fetchEquipment();
    fetchInspections();
  }, [params.id]);

  return (
    <div>
      {equipment.map((e) => {
        return (
          <div key={e.id}>
            <p>Serial num: {e.serial_num}</p>
            <p>Manufacture date: {e.manufacture_date}</p>
            <p>End of Life: {e.end_of_life}</p>
            <p>Next Inspection Due : {e.next_inspection_due}</p>
            <p>Specification: {e.specification}</p>
            <p>Status {e.status}</p>
            {e.workers !== null ? (
              <p>
                {e.workers.first_name} {e.workers.last_name}
              </p>
            ) : (
              <p>No worker assigned</p>
            )}
            <Link to={`/equipment/${e.id}/edit`}>
              <button>Edit Equipment</button>
            </Link>
            <button onClick={_handleDelete}>Delete Equipment</button>
            <Link to={`/equipment/${e.id}/inspection/create`}>
              <button> New Inspection</button>
            </Link>
            {inspections.map((i) => {
              return (
                <Link key={i.id} to={`/inspection/${i.id}`}>
                  <p>Inspection Date: {i.inspection_date}</p>
                  <p>
                    Technician: {i.workers.first_name} {i.workers.last_name}
                  </p>
                  <p>Notes: {i.notes}</p>
                  <p>Result: {i.has_passed ? "Suitable" : "Not Suitable"}</p>
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
    // <>
    //   <Box
    //     as="section"
    //     pt={{ base: "4", md: "8" }}
    //     pb={{ base: "12", md: "24" }}
    //   >
    //     <Container>
    //       <Box
    //         bg="bg-surface"
    //         px={{ base: "4", md: "6" }}
    //         py="5"
    //         boxShadow={useColorModeValue("sm", "sm-dark")}
    //         borderRadius="lg"
    //       >
    //         <Stack
    //           spacing="4"
    //           direction={{ base: "column", sm: "row" }}
    //           justify="space-between"
    //         >
    //           <Stack spacing="1">
    //             <Text fontSize="lg" fontWeight="medium">
    //               Equipment Overview
    //             </Text>
    //             <Text color="muted" fontSize="sm">
    //               All details in the overview
    //             </Text>
    //           </Stack>
    //           <Button variant="primary" alignSelf="start">
    //             Invite
    //           </Button>
    //         </Stack>
    //         <Divider />
    //       </Box>
    //     </Container>
    //   </Box>
    // </>
  );
}
