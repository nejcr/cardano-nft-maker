import {
  AspectRatio,
  Box,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import React, { EventHandler } from 'react';
import cardanoKids from './kidz.jpg';
import hoskinsons from './hoskin.jpg';
import spacebud from './spacebud.jpg';
import { PreviewImage, previewImageStyles } from './PreviewImage';

const FileUpload = ({ onFileSelect }: { onFileSelect: EventHandler<any> }) => {
  const controls = useAnimation();
  const startAnimation = () => controls.start('hover');
  const stopAnimation = () => controls.stop();

  return (
    <AspectRatio width={'250px'} ratio={1} height={'300px'}>
      <Box
        borderColor="gray.300"
        borderStyle="dashed"
        borderWidth="2px"
        rounded="md"
        shadow="sm"
        role="group"
        transition="all 150ms ease-in-out"
        _hover={{
          shadow: 'md',
        }}
        as={motion.div}
        initial="rest"
        animate="rest"
        whileHover="hover"
      >
        <Box position="relative" height="100%" width="100%">
          <Box
            position="absolute"
            top="0"
            left="0"
            height="100%"
            width="100%"
            display="flex"
            flexDirection="column"
          >
            <Stack
              height="100%"
              width="100%"
              display="flex"
              alignItems="center"
              justify="center"
              spacing="4"
            >
              <Box height="16" width="12" position="relative">
                <PreviewImage
                  variants={previewImageStyles.left}
                  backgroundImage={`url(${cardanoKids.src})`}
                />
                <PreviewImage
                  variants={previewImageStyles.middle}
                  backgroundImage={`url(${hoskinsons.src})`}
                />
                <PreviewImage
                  variants={previewImageStyles.right}
                  backgroundImage={`url(${spacebud.src})`}
                />
              </Box>
              <Stack p="8" textAlign="center" spacing="1">
                <Heading fontSize="lg" color="gray.500" fontWeight="bold">
                  Upload to arweave
                </Heading>
              </Stack>
            </Stack>
          </Box>
          <Input
            type="file"
            height="100%"
            width="100%"
            position="absolute"
            top="0"
            left="0"
            opacity="0"
            aria-hidden="true"
            accept="image/*"
            onDrop={onFileSelect}
            onChange={onFileSelect}
            onDragEnter={startAnimation}
            onDragLeave={stopAnimation}
          />
        </Box>
      </Box>
    </AspectRatio>
  );
};

export default FileUpload;
