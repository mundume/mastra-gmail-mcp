import Chat from "@/components/chat";
import { SignOutButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <Chat />;
      <SignOutButton />
    </>
  );
}
