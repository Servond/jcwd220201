import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../api";
import { useFormik } from "formik";
import { login } from "../redux/features/authSlice";
import { useEffect } from "react";

const EditProfile = () => {
  const authSelector = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  const toast = useToast();

  // const fetchUser = async () => {
  const getUser = async () => {
    try {
      // const response = await axiosInstance.get("/users", {
      //   params: {
      //     userId: authSelector.id,
      //     _expand: "user",
      //   },
      // });

      const response = await axiosInstance.get(`http://localhost:8000/auth`);

      setUsers(response.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      profile_picture: null,
      gender: "",
      phone: "",
      date_of_birth: "",
      password: "",
    },
    onSubmit: async ({
      name,
      profile_picture,
      gender,
      phone,
      date_of_birth,
      password,
    }) => {
      try {
        const userData = new FormData();

        if (name && name !== authSelector.name) {
          userData.append("name", name);
        }

        if (
          profile_picture &&
          profile_picture !== authSelector.profile_picture
        ) {
          userData.append("profile_picture", profile_picture);
        }
        if (gender && gender !== authSelector.gender) {
          userData.append("gender", gender);
        }
        if (phone && phone !== authSelector.phone) {
          userData.append("phone", phone);
        }
        if (date_of_birth && date_of_birth !== authSelector.date_of_birth) {
          userData.append("date_of_birth", date_of_birth);
        }
        if (password && password !== authSelector.password) {
          userData.append("password", password);
        }

        const userResponse = await axiosInstance.patch(
          "auth/profile",
          userData
        );

        dispatch(login(userResponse.data.data));
        setEditMode(false);
        toast({ title: "Profile Edited" });
      } catch (err) {
        console.log(err);
        toast({
          title: "Failed Edit",
          status: "error",
          description: err.response.data.message,
        });
      }
    },
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;

    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    getUser();
  }, []);

  const dummyProfile = {
    name: "nobi",
    profile_picture:
      "https://xsgames.co/randomusers/assets/avatars/female/13.jpg",
    gender: "Wanita",
    date_of_birth: "2000-01-01",
    phone: "08190812345",
  };

  return (
    <Container maxW="container.md" py="4" pb="10">
      <Box borderColor="gray.300" borderWidth="1px" p="6" borderRadius="8px">
        <HStack spacing="6">
          {editMode ? (
            <Stack
              spacing={6}
              w={"full"}
              maxW={"lg"}
              bg={"white"}
              rounded={"xl"}
              boxShadow={"lg"}
              p={6}
              my={12}
              ml={10}
              mr={10}
            >
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                Ubah Profil Pengguna
              </Heading>
              <Center>
                <Avatar
                  size="2xl"
                  name={authSelector.name}
                  src={authSelector.profile_picture}
                />
              </Center>

              <FormControl>
                <FormLabel>Foto Profil</FormLabel>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={(event) =>
                    formik.setFieldValue(
                      "profile_picture",
                      event.target.files[0]
                    )
                  }
                  name="profile_picture"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Nama</FormLabel>
                <Input
                  onChange={formChangeHandler}
                  name="name"
                  defaultValue={authSelector.name}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Jenis Kelamin</FormLabel>
                <Input
                  onChange={formChangeHandler}
                  name="gender"
                  defaultValue={authSelector.gender}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Nomor Telpon</FormLabel>
                <Input
                  onChange={formChangeHandler}
                  name="phone"
                  defaultValue={authSelector.phone}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Tanggal Lahir</FormLabel>
                <Input
                  onChange={formChangeHandler}
                  name="date_of_birth"
                  defaultValue={authSelector.date_of_birth}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={formChangeHandler}
                  name="password"
                  defaultValue={authSelector.password}
                />
              </FormControl>
            </Stack>
          ) : (
            <Stack spacing="0.5">
              <Text fontSize="2xl" fontWeight="semibold">
                {authSelector.name}
              </Text>
              <Text fontSize="lg">{authSelector.email}</Text>
              <Text fontSize="lg" fontWeight="light">
                {authSelector.role}
              </Text>
            </Stack>
          )}
        </HStack>

        {editMode ? (
          <>
            <Button
              mt="8"
              width="100%"
              colorScheme="green"
              onClick={formik.handleSubmit}
            >
              Simpan
            </Button>
            <Button
              mt="5"
              width="100%"
              colorScheme="red"
              onClick={() => setEditMode(false)}
            >
              Batalkan
            </Button>
          </>
        ) : (
          <Stack>
            <Center>
              <Avatar
                size="2xl"
                name={authSelector.name}
                src={authSelector.profile_picture}
              />
            </Center>

            <Button mt="8" width="100%" onClick={() => setEditMode(true)}>
              Ubah Profil
            </Button>
          </Stack>
        )}
      </Box>
    </Container>
  );
};

export default EditProfile;
