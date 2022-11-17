import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  Image,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Divider,
} from "@chakra-ui/react"
import { useState } from "react"
const arrowStyles = {
  cursor: "pointer",
  pos: "absolute",
  top: "50%",
  w: "auto",
  mt: "-22px",
  p: "16px",
  color: "white",
  fontWeight: "bold",
  fontSize: "18px",
  transition: "0.6s ease",
  borderRadius: "0 3px 3px 0",
  userSelect: "none",
  _hover: {
    opacity: 0.8,
    bg: "black",
  },
}

const SlideBanner = () => {
  const slides = [
    {
      img: "https://images.tokopedia.net/img/NsjrJu/2020/9/25/ea701ee6-f36b-473d-b429-4d2a1da0713d.jpg?ect=4g",
    },
    {
      img: "https://images.tokopedia.net/img/cache/1208/NsjrJu/2022/11/15/9c137fc1-fd20-47c2-83ea-3ad71c094b21.jpg.webp?ect=4g",
    },
    {
      img: "https://www.static-src.com/siva/asset//11_2022/desktop-16nov-tefal-car3.jpg?w=960",
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const slidesCount = slides.length

  const prevSlide = () => {
    setCurrentSlide((val) => (val === 0 ? slidesCount - 1 : val - 1))
  }

  const nextSlide = () => {
    setCurrentSlide((val) => (val === slidesCount - 1 ? 0 : val + 1))
  }

  const setSlide = (slide) => {
    setCurrentSlide(slide)
  }

  const carouselStyle = {
    transition: "all .5s",
    autoplay: true,
    ml: `-${currentSlide * 100}%`,
  }
  return (
    <>
      <Flex
        w="full"
        overflow="hidden"
        pos="relative"
        zIndex="1"
        borderRadius="16px"
        mb="auto"
      >
        <Flex h="auto" pos="relative" w="full" {...carouselStyle}>
          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
              <Text
                color="white"
                fontSize="xs"
                p="8px 12px"
                pos="absolute"
                top="0"
              ></Text>
              <Image src={slide.img} alt="carousel image" boxSize="full" />
            </Box>
          ))}
        </Flex>

        <Text {...arrowStyles} left="0" onClick={prevSlide}>
          &#10094;
        </Text>
        <Text {...arrowStyles} right="0" onClick={nextSlide}>
          &#10095;
        </Text>
        <HStack justify="center" pos="absolute" bottom="8px" w="full">
          {Array.from({
            length: slidesCount,
          }).map((_, slide) => (
            <Box
              key={`dots-${slide}`}
              cursor="pointer"
              boxSize={["7px", null, "15px"]}
              m="0 2px"
              bg={currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"}
              rounded="50%"
              display="inline-block"
              transition="background-color 0.6s ease"
              _hover={{
                bg: "blackAlpha.800",
              }}
              onClick={() => setSlide(slide)}
            ></Box>
          ))}
        </HStack>
      </Flex>
    </>
  )
}
export default SlideBanner
