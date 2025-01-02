import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import loading from "../../../asset/animation/loading.lottie";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(255,255,255,0.5)] z-10">
      <DotLottieReact
        src={loading}
        loop
        autoplay
        style={{ width: 100, height: 100 }}
      />
    </div>
  );
};

export default Loading;
