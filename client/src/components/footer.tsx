import React from "react";
import { Logo } from "./logo";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer
      className={`bottom-0 flex h-24 w-full content-center justify-between bg-neutral-500 bg-opacity-70 p-4 dark:bg-neutral-800`}
    >
      <Logo />
      <div className={`mt-3 text-2xl`}>© 2023 Copyright: Andrii Veremchuk</div>
      <a
        href="https://github.com/AndriiVeremchuk20"
        target={"_blank"}
        rel={"noreferrer"}
        className={`mt-3 mr-4 flex w-fit text-4xl`}
      >
        <BsGithub className="mr-2" /> <div>Git</div>
      </a>
    </footer>
  );
};

export default React.memo(Footer);
