import { Box, BoxProps, forwardRef } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const previewImageStyles = {
  left: {
    rest: {
      rotate: '-15deg',
      scale: 0.95,
      x: '-50%',
      filter: 'grayscale(80%)',
      transition: {
        duration: 0.5,
        type: 'tween',
        ease: 'easeIn',
      },
    },
    hover: {
      x: '-70%',
      scale: 1.1,
      rotate: '-20deg',
      filter: 'grayscale(0%)',
      transition: {
        duration: 0.4,
        type: 'tween',
        ease: 'easeOut',
      },
    },
  },
  middle: {
    rest: {
      rotate: '15deg',
      scale: 0.95,
      x: '50%',
      filter: 'grayscale(80%)',
      transition: {
        duration: 0.5,
        type: 'tween',
        ease: 'easeIn',
      },
    },
    hover: {
      x: '70%',
      scale: 1.1,
      rotate: '20deg',
      filter: 'grayscale(0%)',
      transition: {
        duration: 0.4,
        type: 'tween',
        ease: 'easeOut',
      },
    },
  },
  right: {
    rest: {
      scale: 1.1,
      filter: 'grayscale(80%)',
      transition: {
        duration: 0.5,
        type: 'tween',
        ease: 'easeIn',
      },
    },
    hover: {
      scale: 1.3,
      filter: 'grayscale(0%)',
      transition: {
        duration: 0.4,
        type: 'tween',
        ease: 'easeOut',
      },
    },
  },
};

export const PreviewImage = forwardRef<BoxProps, typeof Box>((props, ref) => {
  return (
    <Box
      bg="white"
      top="0"
      height="100%"
      width="100%"
      position="absolute"
      borderWidth="1px"
      borderStyle="solid"
      rounded="sm"
      borderColor="gray.400"
      as={motion.div}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      {...props}
      ref={ref}
    />
  );
});
