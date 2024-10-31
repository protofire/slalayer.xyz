import Tooltip from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { features, tiers } from './plansConfig';
import PricingCard from './pricing-card';

export default function PricingContent({
  subgraph_id,
}: {
  subgraph_id: string;
}) {
  return (
    <div className="relative p-6 mx-auto">
      <div className="mx-auto text-center">
        <p className="text-balance text-5xl mb-4 font-semibold tracking-tight text-white sm:text-6xl">
          {'Choose the SLA plan'}
        </p>
      </div>

      <div className="mx-auto flex items-start gap-6">
        <div className="flex flex-col">
          {/* Placeholder for leveling */}
          <div className="opacity-0 h-16" />
          <ul className="flex flex-col w-full mb-4">
            {features.map((feature) => (
              <li
                key={feature.name}
                className={cn('h-12 w-full flex items-center')}
              >
                <div className="flex gap-2 items-center">
                  <span className="text-gray-200 font-medium text-lg">
                    {feature.name}
                  </span>
                  <Tooltip
                    content={
                      <div className="text-gray-200 text-sm max-w-[350px]">
                        {feature.description}
                      </div>
                    }
                  >
                    <span>
                      <InfoCircledIcon className="w-[15px] h-[15px] cursor-pointer text-white hover:text-[#B0FFC9]" />
                    </span>
                  </Tooltip>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4">
          {tiers.map((tier) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              subgraph_id={subgraph_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
