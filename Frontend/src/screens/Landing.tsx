// import { useNavigate } from "react-router-dom";
import { Button } from "../Components/Button";

export const Landing = () => {
  // const navigate = useNavigate();

  const handleSignIn = () => {
    const cognitoSignInUrl = "https://chessweb098.auth.us-east-1.amazoncognito.com/login?client_id=26nlj0lgomka7g98fmehk8js32&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fgame";
    window.location.assign(cognitoSignInUrl);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-900">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center md:justify-start">
            <img src="/chessBoard.jpg" className="w-full max-w-md rounded-lg shadow-lg" alt="Chess Board" />
          </div>
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl md:text-5xl text-white font-bold mb-4">Play Chess online on the #1 Site</h1>
            <p className="text-lg md:text-xl text-white mb-6">Play chess with your friends anytime, anywhere.</p>
            <Button onClick={handleSignIn}>Sign In / Sign Up</Button>
          </div>
        </div>
      </div>
    </div>
  );
};