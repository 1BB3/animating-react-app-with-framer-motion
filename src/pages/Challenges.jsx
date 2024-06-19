import Challenges from "../components/Challenges.jsx";
import Header from "../components/Header.jsx";
import ChallengesContextProvider from "../store/challenges-context.jsx";

export default function ChallengesPage() {
  return (
    <ChallengesContextProvider>
      <Header />
      <p className="do-your-best">
        Make a list of challenges to complete and do your best!
      </p>
      <main>
        <Challenges />
      </main>
    </ChallengesContextProvider>
  );
}
