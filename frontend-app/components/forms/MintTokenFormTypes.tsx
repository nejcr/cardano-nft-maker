import * as Yup from "yup";
import {Box, Heading, Stack, StackProps} from "@chakra-ui/react";
import * as React from "react";

interface FieldGroupProps extends StackProps {
    title?: string
}

export interface MintTokenFormProps {
    file?: File,
    onClose?: Function
}

export const FieldGroup = (props: FieldGroupProps) => {
    const {title, children, ...flexProps} = props
    return (
        <Stack direction={{base: 'column', md: 'row'}} spacing="6" py="4" {...flexProps}>
            <Box minW="4xs">
                {title && (
                    <Heading as="h2" fontWeight="semibold" fontSize="lg" flexShrink={0}>
                        {title}
                    </Heading>
                )}
            </Box>
            {children}
        </Stack>
    )
}

export const validationSchema = Yup.object({
    assetName: Yup.string().required("Asset name is required"),
});
