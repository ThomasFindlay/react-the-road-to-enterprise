import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

const PostPage = (props: {
  post?: {
    title: string;
    body: string;
  };
}) => {
  const router = useRouter();
  const { postId } = router.query;
  const { post } = props;
  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>Post ID: {postId}</h1>
      {post ? (
        <div>
          <div>{post.title}</div>
          <br />
          <div>{post.body}</div>
        </div>
      ) : (
        <p>Post not found</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const postId = context.params?.postId;

  if (!postId) {
    return {
      props: {},
    };
  }

  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  ).then(res => res.json());

  return {
    props: {
      post,
    },
  };
};

// SSG + ISR
// export const getStaticPaths: GetStaticPaths = async () => {
//   const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(
//     res => res.json()
//   );

//   return {
//     paths: posts.slice(0, 10).map((post: { id: string }) => {
//       return {
//         params: {
//           postId: String(post.id),
//         },
//       };
//     }),
//     fallback: "blocking",
//   };
// };

// export const getStaticProps: GetStaticProps = async context => {
//   const postId = context.params?.postId;

//   if (!postId) {
//     return {
//       props: {},
//     };
//   }

//   const post = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${postId}`
//   ).then(res => res.json());

//   return {
//     props: {
//       post,
//     },
//     revalidate: 60,
//   };
// };

export default PostPage;
