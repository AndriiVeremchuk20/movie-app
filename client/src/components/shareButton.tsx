import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";

const ShareButton = () => {
  const router = useRouter();

  const onShareClick = useCallback(() => {
    const currUrl = router.asPath;
    navigator.clipboard.writeText(`http://localhost:3000${currUrl}`);
  }, []);

  return (
    <button
      title="Share to/Надіслати"
      className={`text-3xl focus:text-green-600`}
      onClick={onShareClick}
    >
      <AiOutlineShareAlt />
    </button>
  );
};

export default React.memo(ShareButton);
