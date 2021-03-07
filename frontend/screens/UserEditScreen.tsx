import React, {
  useState, useEffect, useContext,
} from 'react';
import { useRouter } from 'next/router';
import {
  Center, Flex, FormLabel, Input, Button,
} from '@chakra-ui/react';
import Loader from 'components/Loader';
import Error from 'components/Error';
import UserContext from 'context/user/userContext';
import AuthContext from 'context/auth/authContext';
import { setNestedObjectValues } from 'formik';

const UserEditScreen = () => {
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);
  const { user: AuthUser, loading } = authContext;
  const {
    users, user, userInfo, updateUser, getUserDetails, success, resetUpdateUser, loading: userLoading, error,
  } = userContext;
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (success) {
      resetUpdateUser();
      router.push('/admin/userlist');
    } else if (!user || user._id !== id) {
      if (id) {
        getUserDetails(id);
      }
    } else if (id) {
      getUserDetails(id);
      setName(user.name);
      console.log(user);
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
    if (success) {
      resetUpdateUser();
      router.push('/');
    }
  }, [router, id, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(`ID: ${id}  NAME: ${name} EMAIL: ${email} ISADMIN: ${isAdmin}`);
    updateUser({
      _id: id, name, email, isAdmin,
    });
  };

  return (
    <>
      <Center>
        {/* {loadingUpdate && <Loader />}
        {loading && <Loader />}
        {errorUpdate && <Error>{errorUpdate}</Error>}
        {error && <Error>{error}</Error>} */}
        {!userLoading || !loading || !error }
        {!userLoading || !error ? (
          <Flex direction="column" justify="center" align="center">
            <form onSubmit={submitHandler}>
              <Input
                placeholder="name"
                name="name"
                type="input"
                mb={10}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="email"
                name="email"
                type="input"
                mb={5}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel>Admin user</FormLabel>
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <div>
                <Button mt={5} type="submit">
                  Update user
                </Button>
              </div>
            </form>
          </Flex>
        ) : ''}

      </Center>
    </>
  );
};
export default UserEditScreen;
