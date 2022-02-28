import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type HomeProps = {
  children?: React.ReactNode;
  posts?: Post[];
};

const Home: NextPage<HomeProps> = props => {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>Posts</h1>
      <br />
      {props.posts?.map(post => {
        return (
          <div key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps: GetStaticProps<{
  posts: Post[];
}> = async context => {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    res => res.json()
  );
  return {
    props: {
      posts: posts.slice(0, 10),
    },
  };
};

export default Home;
