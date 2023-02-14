import React from "react";
import { Logo } from "./logo";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer
      className={`w-full h-24 bg-lime-700 dark:bg-indigo-800 flex p-4 bottom-0 justify-between content-center`}
    >
      <Logo />
      <div
      className={`text-2xl mt-3`}
      >© 2023 Copyright: Andrii Veremchuk</div>
      <a
        href="https://github.com/AndriiVeremchuk20"
        target={"_blank"}
        rel={"noreferrer"}
        className={`text-4xl w-fit flex mt-3 mr-4`}
      >
        <BsGithub className="mr-2"/> <div>Git</div>
      </a>
    </footer>
  );
};

export default React.memo(Footer);
