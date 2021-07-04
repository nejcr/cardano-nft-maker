import * as Yup from 'yup';
import { Box, Heading, Stack, StackProps } from '@chakra-ui/react';
import * as React from 'react';

interface FieldGroupProps extends StackProps {
  title?: string;
}

export interface MintTokenFormProps {
  file?: File;
  onClose: Function;
}

export const FieldGroup = (props: FieldGroupProps) => {
  const { title, children, ...flexProps } = props;
  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing="6"
      py="4"
      {...flexProps}
    >
      <Box minW="4xs">
        {title && (
          <Heading as="h2" fontWeight="semibold" fontSize="lg" flexShrink={0}>
            {title}
          </Heading>
        )}
      </Box>
      {children}
    </Stack>
  );
};

function validateAgainstPrevious(array: Array<{ key: string; value: string }>) {
  console.log(array, 'a');
  return true;
}

Yup.addMethod(Yup.array, 'allUnique', function (message) {
  return this.test(
    'allUnique',
    message,
    (values: Array<{ key: string; value: string }> | undefined) => {
      const keys = values?.map((item) => item.key);
      const hasDuplicateKeys = new Set(keys).size !== keys?.length;

      return !hasDuplicateKeys;
    }
  );
});

export const validationSchema = Yup.object({
  assetName: Yup.string().required('Asset name is required'),
  metadata: Yup.array(
    Yup.object({
      key: Yup.string().required('Key is required'),
      value: Yup.string().required('Value is required'),
    })
    // @ts-ignore
  ).allUnique('All keys should be unique'),
});
