import {Box, Flex, Heading, HStack, Progress, SimpleGrid, Text, VStack} from '@chakra-ui/react'
import * as React from 'react'
import FileUpload from "./FileUpload";

export const IntroSection = () => <HStack justify={"center"} mx={"auto"} as="section" bg="blue.800" color="white"
                                          h={"100%"}>
    <SimpleGrid columns={[1, 2]}>
        <Box pl={'10vw'} ml={[0, 0, "5vw"]}>
            <VStack>
                <Heading as="h3" size={"2xl"} mt="7" lineHeight="shorter">
                    Upload content for your NFT
                </Heading>
                <Heading color={"twitter.300"} as="h4" size="md" mt="2">
                    Powered by Cardano and Arweave
                </Heading>
                <Text mt="4">
                    File limit size:&nbsp; <b>2MB</b>
                </Text>
            </VStack>


        </Box>
        <Flex justify={"center"} pt={3}>
            <FileUpload/>
        </Flex>
    </SimpleGrid>


</HStack>
