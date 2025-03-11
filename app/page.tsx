import Chat from "@/components/chat";
import { testGmail } from "./actions/test-gmail";

export default async function Home() {
  const res = await testGmail();
  console.log(res);

  return (
    <>
      <p>{JSON.stringify(res)}</p>
      <Chat />;
    </>
  );
}
