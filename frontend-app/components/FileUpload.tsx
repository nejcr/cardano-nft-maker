import {AspectRatio, Box, BoxProps, forwardRef, Heading, Input, Stack, Text} from "@chakra-ui/react";
import {motion, useAnimation} from "framer-motion";
import {useRef} from "react";
import cardanoKids from "./kidz.jpg"
import hoskinsons from "./hoskin.jpg"
import spacebud from "./spacebud.jpg"

const first = {
    rest: {
        rotate: "-15deg",
        scale: 0.95,
        x: "-50%",
        filter: "grayscale(80%)",
        transition: {
            duration: 0.5,
            type: "tween",
            ease: "easeIn"
        }
    },
    hover: {
        x: "-70%",
        scale: 1.1,
        rotate: "-20deg",
        filter: "grayscale(0%)",
        transition: {
            duration: 0.4,
            type: "tween",
            ease: "easeOut"
        }
    }
};

const second = {
    rest: {
        rotate: "15deg",
        scale: 0.95,
        x: "50%",
        filter: "grayscale(80%)",
        transition: {
            duration: 0.5,
            type: "tween",
            ease: "easeIn"
        }
    },
    hover: {
        x: "70%",
        scale: 1.1,
        rotate: "20deg",
        filter: "grayscale(0%)",
        transition: {
            duration: 0.4,
            type: "tween",
            ease: "easeOut"
        }
    }
};

const third = {
    rest: {
        scale: 1.1,
        filter: "grayscale(80%)",
        transition: {
            duration: 0.5,
            type: "tween",
            ease: "easeIn"
        }
    },
    hover: {
        scale: 1.3,
        filter: "grayscale(0%)",
        transition: {
            duration: 0.4,
            type: "tween",
            ease: "easeOut"
        }
    }
};

const PreviewImage = forwardRef<BoxProps, typeof Box>((props, ref) => {
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
const FileUpload = () => {
    const inputRef = useRef();
    const controls = useAnimation();
    const startAnimation = () => controls.start("hover");
    const stopAnimation = () => controls.stop();

    return (
        <AspectRatio width="64" ratio={1}>
            <Box
                borderColor="gray.300"
                borderStyle="dashed"
                borderWidth="2px"
                rounded="md"
                shadow="sm"
                role="group"
                transition="all 150ms ease-in-out"
                _hover={{
                    shadow: "md"
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
                                    variants={first}
                                    backgroundImage={`url(${cardanoKids.src})`}
                                />
                                <PreviewImage
                                    variants={second}
                                    backgroundImage={`url(${hoskinsons.src})`}

                                />
                                <PreviewImage
                                    variants={third}
                                    backgroundImage={`url(${spacebud.src})`}
                                />
                            </Box>
                            <Stack p="8" textAlign="center" spacing="1">
                                <Heading fontSize="lg" color="gray.500" fontWeight="bold">
                                    Drop images here
                                </Heading>
                                <Text fontWeight="light">or click to upload</Text>
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
                        onDrop={e => console.log(e)}
                        onDragEnter={startAnimation}
                        onDragLeave={stopAnimation}
                    />
                </Box>
            </Box>
        </AspectRatio>
    );
}

export default FileUpload;
