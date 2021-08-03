import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Image,
  Stack,
  StackDivider,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { FieldArray, Form, Formik } from 'formik';
import * as React from 'react';
import { MouseEventHandler } from 'react';
import {
  FieldGroup,
  MintTokenFormProps,
  validationSchema,
} from './MintTokenFormTypes';
import InputControl from './core/InputControl';
import { formatBytes } from '../../utils/utils';
import { MintTokenConformationForm } from './MintTokenConformationForm';
import { postMint } from '../../api/api';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

export type MintSubmissionProps = {
  values: {
    assetName: string;
    metadata: Array<{ key: string; value: string }>;
  };
  file: File | { ipfsHash: string };
};
export const MintTokenForm = (props: MintTokenFormProps) => {
  const { isOpen: formConfirmationOpened, onOpen, onClose } = useDisclosure();
  const initialFormState = { assetName: '', metadata: [], ipfsHash: '' };
  const initialFormSubmission = {
    values: initialFormState,
    file: props.file ?? { ipfsHash: '' },
  };

  const router = useRouter();
  const [formConfirmationState, setFormConfirmationState] =
    React.useState<MintSubmissionProps>(initialFormSubmission);

  const color = useColorModeValue('gray.500', 'whiteAlpha.600');
  const onFormConfirmationClose = () => {
    onClose();
    props.onClose();
    setFormConfirmationState(initialFormSubmission);
  };

  const toast = useToast();

  const onFormConfirmationOpen = (values: any) => {
    onOpen();
    const { ipfsHash, ...rest } = values;
    console.log('setting', ipfsHash);
    setFormConfirmationState({
      values: rest,
      file: props.file ?? { ipfsHash: ipfsHash ?? '' },
    });
  };

  const postMintMutation = useMutation(
    (submissionData: MintSubmissionProps) => postMint('/mint', submissionData),
    {
      onSuccess: (res) => {
        toast({
          title: 'Succesfully created NFT',
          description: JSON.stringify(res),
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onClose();
        props.onClose();
        router.push(`/uploads/${res?.data?.id}`);
      },
      onError: (error: any) => {
        toast({
          title: 'An error occurred',
          description: JSON.stringify(error?.response?.data),
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        onClose();
      },
    }
  );
  let fileSrc: string;

  if (props.file instanceof File) {
    fileSrc = URL.createObjectURL(props.file);
  }

  return (
    <Box px={{ base: '4', md: '10' }} py="16" maxWidth="3xl" mx="auto">
      <MintTokenConformationForm
        onConfirm={() => {
          postMintMutation.mutate(formConfirmationState);
        }}
        isOpen={formConfirmationOpened}
        onClose={onFormConfirmationClose}
      />

      <Formik
        initialValues={initialFormState}
        onSubmit={onFormConfirmationOpen}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, values, errors }) => {
          const uniquenessError =
            errors?.hasOwnProperty('metadata') &&
            !Array.isArray(errors.metadata);
          return (
            <Form>
              <Stack spacing="4" divider={<StackDivider />}>
                <Heading size="lg" as="h1" paddingBottom="4">
                  Create your NFT on Cardano
                </Heading>

                <VStack width="full" spacing="6">
                  <InputControl name={'assetName'} label="Asset Name" />
                </VStack>
                <FieldGroup title="Metadata">
                  <VStack width="full" spacing="6" alignItems={'flex-end'}>
                    <FieldArray
                      name="metadata"
                      render={(arrayHelpers) => (
                        <Box mt={'-3px'}>
                          {values.metadata && values.metadata.length > 0 ? (
                            values.metadata.map((field, index) => (
                              <div key={index}>
                                <HStack alignItems={'end'}>
                                  <InputControl
                                    name={`metadata.${index}.key`}
                                    height={'110px'}
                                    label="Key"
                                  />
                                  <InputControl
                                    name={`metadata.${index}.value`}
                                    height={'110px'}
                                    label="Value"
                                  />
                                  <ButtonGroup isAttached>
                                    <Button
                                      mt={9}
                                      colorScheme={'red'}
                                      size={'sm'}
                                      onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                    >
                                      X
                                    </Button>
                                  </ButtonGroup>
                                </HStack>

                                {index == values.metadata.length - 1 && (
                                  <>
                                    {uniquenessError ? (
                                      <Box
                                        textAlign={'right'}
                                        color={'red.300'}
                                      >
                                        {errors?.metadata}
                                      </Box>
                                    ) : (
                                      <Box visibility={'hidden'}>hidden</Box>
                                    )}
                                    <HStack justify={'flex-end'} mt={3}>
                                      <Button
                                        colorScheme={'blue'}
                                        onClick={() =>
                                          arrayHelpers.push({
                                            key: '',
                                            value: '',
                                          })
                                        } // insert an empty string at a position
                                      >
                                        Add another
                                      </Button>
                                    </HStack>
                                  </>
                                )}
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
                {props.file instanceof File ? (
                  <FieldGroup title="Asset">
                    <Stack
                      direction="row"
                      spacing="6"
                      align="center"
                      width="full"
                      justifyContent={'flex-end'}
                    >
                      <Tooltip
                        padding={0}
                        label={
                          <Image
                            objectFit="cover"
                            boxSize="300px"
                            alt={'Your uploaded image preview'}
                            src={fileSrc}
                          />
                        }
                        fontSize="md"
                        placement={'top-end'}
                      >
                        <Avatar
                          size="xl"
                          name="Your uploaded image"
                          src={fileSrc}
                        />
                      </Tooltip>

                      <Box>
                        <HStack spacing="5" justifyContent={'end'}>
                          <Heading
                            as="h3"
                            size="lg"
                            isTruncated
                            maxW={['150px', '200px', '300px']}
                          >
                            {props.file?.name}
                          </Heading>
                        </HStack>
                        <Text
                          fontSize="sm"
                          mt="1"
                          textAlign={'right'}
                          mr={3}
                          color={color}
                        >
                          {props.file?.type} |{' '}
                          {formatBytes(props?.file?.size, 3)}
                        </Text>
                      </Box>
                    </Stack>
                  </FieldGroup>
                ) : (
                  <VStack width="full" spacing="6">
                    <InputControl name={'ipfsHash'} label="IPFS Hash" />
                  </VStack>
                )}
                <FieldGroup mt="8">
                  <HStack width="full" justifyContent={'flex-end'}>
                    <Button type="submit" colorScheme="blue">
                      Upload and deploy
                    </Button>
                    <Button
                      variant="outline"
                      onClick={props.onClose as MouseEventHandler}
                    >
                      Cancel
                    </Button>
                  </HStack>
                </FieldGroup>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
