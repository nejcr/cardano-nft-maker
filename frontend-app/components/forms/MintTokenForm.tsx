import {
    Avatar,
    Box, Button, ButtonGroup,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    StackDivider,
    Text,
    Textarea,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react'
import {Field, FieldArray, Form, Formik} from 'formik';
import * as React from 'react'
import {FieldGroup, MintTokenFormProps, validationSchema} from "./MintTokenFormTypes";
import InputControl from "./core/InputControl";


export const MintTokenForm = (props: MintTokenFormProps) => {
    const onSubmit = (values: any) => {
        console.log(values)
    };
    return <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">

        <Formik
            initialValues={{assetName: "", metadata: [{key: "x", value: "y"}]}}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >

            {({handleSubmit, values, errors}) => (
                <Form>
                    <Stack spacing="4" divider={<StackDivider/>}>
                        <Heading size="lg" as="h1" paddingBottom="4">
                            Create your NFT on Cardano
                        </Heading>

                        <VStack width="full" spacing="6">
                            <InputControl name={'assetName'} label="Asset Name"/>
                        </VStack>
                        <FieldGroup title="Metadata">
                            <VStack width="full" spacing="6" alignItems={"flex-end"}>
                                <FieldArray
                                    name="friends"
                                    render={arrayHelpers => (
                                        <Box mt={"-3px"}>
                                            {values.metadata && values.metadata.length > 0 ? (
                                                values.metadata.map((friend, index) => (
                                                    <div key={index}>
                                                        <HStack>
                                                            <InputControl name={`friends.${index}.key`} label="Key"/>
                                                            <InputControl name={`friends.${index}.value`}
                                                                          label="Value"/>
                                                            <ButtonGroup isAttached>


                                                                <Button
                                                                    mt={8}
                                                                    colorScheme={"red"}
                                                                    size={"sm"}
                                                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                                >X</Button>
                                                            </ButtonGroup>
                                                        </HStack>
                                                        {(index == values.metadata.length - 1) &&
                                                        <HStack justify={"flex-end"} mt={3}>
                                                            <Button
                                                                colorScheme={"blue"}
                                                                onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                                            >
                                                                Add another
                                                            </Button>
                                                        </HStack>}


                                                    </div>
                                                ))
                                            ) : (
                                                <Button onClick={() => arrayHelpers.push('')}>
                                                    {/* show this when user has removed all friends from the list */}
                                                    Add field
                                                </Button>
                                            )}
                                        </Box>
                                    )}
                                />
                            </VStack>
                        </FieldGroup>
                        <FieldGroup title="Asset">
                            <Stack direction="row" spacing="6" align="center" width="full" justifyContent={"flex-end"}>
                                <Avatar
                                    size="xl"
                                    name="Alyssa Mall"
                                    src={URL.createObjectURL(props.file)}
                                />
                                <Box>
                                    <HStack spacing="5">
                                        <Heading as="h3" size="lg" isTruncated maxW={"300px"}>
                                            {props.file?.name}
                                        </Heading>

                                    </HStack>
                                    <Text fontSize="sm" mt="1" color={useColorModeValue('gray.500', 'whiteAlpha.600')}>
                                        {props.file?.type} | size {props.file?.size}
                                    </Text>
                                </Box>
                            </Stack>
                        </FieldGroup>
                        <FieldGroup mt="8">
                            <HStack width="full" justifyContent={"flex-end"}>
                                <Button type="submit" colorScheme="blue">
                                    Save Changes
                                </Button>
                                <Button variant="outline">Cancel</Button>
                            </HStack>
                        </FieldGroup>

                    </Stack>
                </Form>)}


        </Formik>
    </Box>


}
