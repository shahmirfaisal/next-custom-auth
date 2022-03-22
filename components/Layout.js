import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <nav>
        <Link href="/">
          <a>Home Page</a>
        </Link>

        <Link href="/signup">
          <a>SignUp</a>
        </Link>

        <Link href="/signin">
          <a>SignIn</a>
        </Link>
      </nav>

      <section>{children}</section>
    </>
  );
}
