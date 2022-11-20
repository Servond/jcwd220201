import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
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

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/users", {
        params: {
          userId: authSelector.id,
          _expand: "user",
        },
      });

      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      profile_picture: null,
      gender: "",
      phone: "",
      date_of_birth: "",
      password: "",
    },
    onSubmit: async ({
      name,
      email,
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

        const userResponse = await axiosInstance.patch("auth/me", userData);

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
    fetchUser();
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
          <Avatar
            size="2xl"
            name={authSelector.name}
            src={authSelector.profile_picture}
          />

          {editMode ? (
            <Stack>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  onChange={formChangeHandler}
                  name="name"
                  defaultValue={authSelector.name}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Profile Picture</FormLabel>
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
                <FormLabel>Gender</FormLabel>
                <Input
                  onChange={formChangeHandler}
                  name="gender"
                  defaultValue={authSelector.gender}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
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
              Save
            </Button>
            <Button
              mt="8"
              width="100%"
              colorScheme="red"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button mt="8" width="100%" onClick={() => setEditMode(true)}>
            Edit Profile
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default EditProfile;
