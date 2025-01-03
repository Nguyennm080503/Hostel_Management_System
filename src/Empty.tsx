import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import empty from "./asset/animation/empty.lottie";

const Empty = () => {
  return (
    <div className="flex justify-center items-center">
      <DotLottieReact
        src={empty}
        loop
        autoplay
        style={{ width: 100, height: 100 }}
      />
    </div>
  );
};

export default Empty;
