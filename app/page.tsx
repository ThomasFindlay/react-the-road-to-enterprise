import Link from "next/link";

export default async function Home() {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    res => res.json()
  );

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>Posts</h1>
      <br />
      {posts?.slice(0, 10).map((post: { id: string; title: string }) => {
        return (
          <div key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </div>
        );
      })}
    </div>
  );
}
