import { useState } from 'react';
import { cn } from '@/lib/utils';
import { features } from './plansConfig';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import USDCIcon from '@/components/ui/icons/usdc-icon';
import { toast } from 'react-toastify';
import { Loader } from '@/components/ui/loader';
import {
  subscribeToBronzePlan,
  subscribeToGoldPlan,
  subscribeToSilverPlan,
  makePayment,
  approveToken,
} from '@/contracts/subgraphs/api';
import { useAccount } from 'wagmi';

export const defaultIndexer = '0x0fd8fd1dc8162148cb9413062fe6c6b144335dbf';

export default function PricingCard({
  tier,
  subgraph_id,
}: {
  tier: {
    name: string;
    price: string;
    features: { value?: string; feature: string }[];
  };
  subgraph_id: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();

  const handleActivation = async () => {
    if (!address) {
      toast.error('Wallet address is required');
      return;
    }

    setIsLoading(true);
    try {
      let tx;
      if (tier.name === 'bronze') {
        tx = await subscribeToBronzePlan(subgraph_id);
      } else if (tier.name === 'silver') {
        tx = await subscribeToSilverPlan(subgraph_id);
      } else if (tier.name === 'gold') {
        await approveToken('5000');

        tx = await subscribeToGoldPlan(subgraph_id);

        if (tx && tx.success) {
          const paymentTx = await makePayment(
            defaultIndexer,
            '0x1f8c8b1d78d01bcc42ebdd34fae60181bd697662',
          );

          if (paymentTx && paymentTx.success) {
            const activeSubgraphs = JSON.parse(
              localStorage.getItem('activeSubgraphs') || '[]',
            );
            const activeIndexers = JSON.parse(
              localStorage.getItem('activeIndexers') || '[]',
            );

            if (!activeSubgraphs.includes(subgraph_id)) {
              activeSubgraphs.push(subgraph_id);
              localStorage.setItem(
                'activeSubgraphs',
                JSON.stringify(activeSubgraphs),
              );
            }

            if (!activeIndexers.includes(defaultIndexer)) {
              activeIndexers.push(defaultIndexer);
              localStorage.setItem(
                'activeIndexers',
                JSON.stringify(activeIndexers),
              );
            }

            toast.success(`Plan ${tier.name} activated!`);
          } else {
            throw new Error('Payment transaction failed or was not completed.');
          }
        } else {
          throw new Error('Gold plan subscription failed.');
        }
      }

      if (tx && tx.success && tier.name !== 'gold') {
        toast.success(
          `Plan ${tier.name} activated! Transaction hash: ${tx.hash}`,
        );
      }
    } catch (error) {
      console.error(`Failed to activate ${tier.name} plan:`, error);
      toast.error(`Failed to activate ${tier.name} plan`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        'bg-white w-60 text-black rounded-2xl flex flex-col items-center justify-between pt-4',
        tier.name === 'gold' && 'bg-amber-400',
        tier.name === 'bronze' && 'bg-stone-500',
        tier.name === 'silver' && 'bg-slate-400',
      )}
    >
      <div className="text-5xl font-semibold capitalize">{tier.name}</div>
      <ul className="flex flex-col w-full mb-4">
        {features.map((featureObj) => {
          const find = tier.features.find(
            ({ feature }) => featureObj.name === feature,
          );
          return (
            <li
              key={featureObj.name}
              className={cn(
                'h-12 w-full flex items-center justify-center',
                'odd:bg-white/30 even:bg-black/40',
              )}
            >
              {find ? (
                find.value ? (
                  <div className="text-center font-semibold text-xs">
                    {find.value}
                  </div>
                ) : (
                  <CheckIcon
                    aria-hidden="true"
                    className="text-green-500 size-7 flex-none"
                  />
                )
              ) : (
                <Cross1Icon
                  aria-hidden="true"
                  className="text-red-500 size-6 flex-none"
                />
              )}
            </li>
          );
        })}
      </ul>
      <div className="flex items-center gap-1 mb-2">
        <span className="text-[44px] font-semibold">{tier.price}</span>
        <USDCIcon className="size-10 text-[#2775ca] hover:text-[#2775ca]" />
        <div className="flex flex-col items-center">
          <span className="text-xl font-semibold text-[#2750ca]">USDC</span>
          <span className="font-semibold">per month</span>
        </div>
      </div>
      <Button
        onClick={handleActivation}
        disabled={isLoading}
        className={cn(
          'w-full rounded-t-none rounded-b-2xl uppercase font-semibold',
          tier.name === 'gold' &&
            'bg-yellow-600 text-black hover:bg-yellow-700',
          tier.name === 'bronze' &&
            'bg-[#8a5a44] text-white hover:bg-[#7a5037]',
          tier.name === 'silver' && 'bg-gray-500 text-white hover:bg-gray-600',
          isLoading && 'bg-green-600',
        )}
        variant="secondary"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            Processing <Loader color="white" />
          </div>
        ) : (
          'Activate'
        )}
      </Button>
    </div>
  );
}
