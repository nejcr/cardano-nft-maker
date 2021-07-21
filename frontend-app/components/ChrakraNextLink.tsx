
import React from 'react';
import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';

export const ChakraNextLink = ({
  children,
  href,
  locale,
  prefetch,
  ...rest
}: any) => (
  <NextLink passHref href={href} locale={locale} prefetch={prefetch}>
    <ChakraLink {...rest} color={'blue.500'}>
      {children}
    </ChakraLink>
  </NextLink>
);
