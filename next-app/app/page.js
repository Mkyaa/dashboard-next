import React from "react";

//containers
import SignInContainer from "@/containers/auth/signIn";

//toast
import { Toaster } from "react-hot-toast";

export default function Home() {

  return (
    <main className="w-full min-h-100dvh ">
      <SignInContainer />
    </main>
  );
}
