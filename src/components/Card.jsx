import { Box, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

export const Card = (props) => (
  <Box
    minH="3xs"
    bg="bg-surface"
    boxShadow={useColorModeValue('sm', 'sm-dark')}
    borderRadius="lg"
    {...props}
  />
)
