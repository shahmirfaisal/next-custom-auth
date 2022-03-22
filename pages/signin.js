import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import getUser from "../lib/getUser";
import dbConnect from "../lib/dbConnect";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signinHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/signin", {
        email,
        password,
      });

      console.log(res.data);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1>SignIn</h1>

      <p>Only unauthenticated users can access this page.</p>

      <form onSubmit={signinHandler}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button>SignIn</button>
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  await dbConnect();

  const user = await getUser(req, res);
  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
}
