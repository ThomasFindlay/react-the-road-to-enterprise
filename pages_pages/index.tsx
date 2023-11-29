import { GetStaticPropsContext } from "next";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
}

const Home = (props: { posts: Array<Post> }) => {
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

export const getStaticProps = async (context: GetStaticPropsContext) => {
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
