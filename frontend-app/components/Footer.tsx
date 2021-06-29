import {Box, Flex, Heading, SimpleGrid} from "@chakra-ui/react";


export const Footer = () => (


    <SimpleGrid columns={[1, 2]} height={"100%"}  >
        <Flex direction={"column"} justify={"center"}  fontSize="sm" alignItems={"center"}>
            <Heading size={"md"}>Nejc Ravnik</Heading>
            <Box fontSize="sm" pl={[0, 14]}>
                &copy; nr4599@student.uni-lj.si
            </Box>
        </Flex>


        <Flex direction={"column"} justify={"center"}  fontSize="sm" alignItems={"center"}>Fakulteta za
            računalništvo
            in informatiko, Ljubljana 2021
        </Flex>
    </SimpleGrid>

)
