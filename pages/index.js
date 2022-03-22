import { removeCookies } from "cookies-next";
import Layout from "../components/Layout";
import getUser from "../lib/getUser";
import { useRouter } from "next/router";
import dbConnect from "../lib/dbConnect";

export default function HomePage(props) {
  const router = useRouter();

  const signoutHandler = () => {
    removeCookies("token");
    router.push("/signin");
  };

  return (
    <Layout>
      <h1>Home Page</h1>
      <p>
        This is the home page and it is protected. Only authenticated users can
        access this page.
      </p>

      <p>
        <strong>Name</strong>: {props.user.name}
      </p>
      <p>
        <strong>Email</strong>: {props.user.email}
      </p>

      <button onClick={signoutHandler}>Sign out</button>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  await dbConnect();
  const user = await getUser(req, res);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
      props: {},
    };
  }
  return {
    props: {
      user,
    },
  };
}
