import Link from 'next/link';
import Image from 'next/image';
import ParticipationCard from '../ui/participation-card';

export default function Footer() {
  return (
    <footer className="z-10 border-t flex flex-col md:flex-row items-center justify-between w-full p-4 text-white mt-auto space-y-4 md:space-y-0">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.webp" alt="Logo" width={45} height={33} priority />
        <div className="flex flex-col text-center md:text-left">
          <h2 className="text-lg font-semibold">SLA Layer</h2>
          <span className="text-sm text-gray-400">
            Infrastructure Guarantees as a Service
          </span>
        </div>
      </Link>
      <div className="flex flex-wrap md:flex-nowrap justify-center gap-5 w-full md:w-auto">
        <ParticipationCard
          redirectUrl="https://201kn2sy7s0.typeform.com/to/VKaunnN1"
          heading="Participate as"
          highlightedText="AVS"
          description="Spin up your novel distributed system"
          accentColor="blue"
        />

        <ParticipationCard
          redirectUrl="https://201kn2sy7s0.typeform.com/to/VKaunnN1"
          heading="Participate as"
          highlightedText="Node Operator"
          description="Explore and secure systems building with SLA layer"
          accentColor="violet"
        />

        <ParticipationCard
          redirectUrl="https://201kn2sy7s0.typeform.com/to/VKaunnN1"
          heading="Activate SLA Layer for your"
          highlightedText="Web3 Infrastructure Network"
          description="Add guarantees to an existing Web3 infrastructure"
          accentColor="pink"
        />
      </div>
    </footer>
  );
}
