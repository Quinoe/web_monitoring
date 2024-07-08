import { useState } from "preact/hooks";

import { Button } from "../components/Button.tsx";
import { trpc } from "../utils/trpc.ts";

import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '../router.ts';
import { ClientType } from '../models/Clients.ts'
 
type RouterOutput = inferRouterOutputs<AppRouter>;
 
type PostCreateOutput = RouterOutput['clients.get'];

export default function Counter() {
  const [helloResponse, setHelloResponse] = useState("");
  const [posts, setPosts] = useState<PostCreateOutput>([]);

  const fetchPosts = () => trpc["clients.get"].query().then(setPosts);

  return (
    <div>
      <Button
        onClick={() => {
          trpc["hello"].query().then(setHelloResponse);
        }}
      >
        Hello
      </Button>

      {helloResponse}

      <hr />

      <Button
        onClick={() => {
          trpc["clients.create"].mutate({ name: `Random Post ${Math.random()}` })
            .then(
              fetchPosts,
            );
        }}
      >
        Create Random Post
      </Button>

      <hr />

      <Button onClick={fetchPosts}>Get Posts</Button>

      <ul>
        {(posts as ClientType[]).map((post, i) => <li key={i}>{post.client_name}</li>)}
      </ul>
    </div>
  );
}