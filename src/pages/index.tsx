import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useMemo, useState } from 'react';
import { FiRotateCcw } from 'react-icons/fi';

import { SortButton } from '@/components/buttons/SortButton';
import { BaseCardList } from '@/components/cards/base_cards/BaseCardList';
import { CardSourceFilter } from '@/components/filters/CardSourceFilter';
import { CardTypeFilter } from '@/components/filters/CardTypeFilter';
import { CreditFilter } from '@/components/filters/CreditFilter';
import { FreeActionFilter } from '@/components/filters/FreeActionFilter';
import { SectorFilter } from '@/components/filters/SectorFilter';
import { TextFilter } from '@/components/filters/TextFilter'; // make sure to import your TextFilter
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { CardOdometer } from '@/components/ui/CardOdometer';
import { Separator } from '@/components/ui/separator';

import { EResource, ESector } from '@/types/BaseCard';
import { CardType } from '@/types/Card';
import { CardSource } from '@/types/CardSource';
import { SortOrder } from '@/types/Order';

type Props = {
  // Add custom props here
};

const INIT_MAX_NUM = 20;

export default function HomePage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation('common');
  const [reset, setReset] = useState<boolean>(false);

  // limit the number of cards to be displayed for optimization
  const [totalMaxNum, setTotalMaxNum] = useState<number>(INIT_MAX_NUM);
  const [selectedFreeActions, setSelectedFreeActions] = useState<EResource[]>(
    []
  );
  const [selectedSectors, setSelectedSectors] = useState<ESector[]>([]);
  const [textFilter, setTextFilter] = useState<string>(''); // add this line
  const [selectedCardTypes, setSelectedCardTypes] = useState<CardType[]>([]);
  const [selectedCardSources, setSelectedCardSources] = useState<CardSource[]>(
    []
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ID_ASC);
  const [credit, setCredit] = useState<number[]>([0]);
  // const [strength, setStrength] = useState<number[]>([0]);

  const [animalCardsCount, setBaseCardsCount] = useState<number>(0);
  const [sponsorCardsCount, setSponsorCardsCount] = useState<number>(0);

  const animalMaxNum = useMemo(() => {
    if (reset) return INIT_MAX_NUM;
    return animalCardsCount > 0 ? Math.min(totalMaxNum, animalCardsCount) : 0;
  }, [animalCardsCount, totalMaxNum]);

  const sponsorMaxNum = useMemo(() => {
    if (reset) return 0;
    const remainingMaxNum = totalMaxNum - animalMaxNum;
    return remainingMaxNum > 0
      ? Math.min(remainingMaxNum, sponsorCardsCount)
      : 0;
  }, [animalMaxNum, sponsorCardsCount, totalMaxNum]);

  const shouldDisplayViewMore = useMemo(() => {
    return totalMaxNum < animalCardsCount + sponsorCardsCount;
  }, [animalCardsCount, sponsorCardsCount, totalMaxNum]);

  const handleViewMore = () => {
    setTotalMaxNum(totalMaxNum + INIT_MAX_NUM);
  };

  useEffect(() => {
    if (
      selectedCardTypes.length !== 0 &&
      !selectedCardTypes.includes(CardType.ANIMAL_CARD)
    ) {
      setBaseCardsCount(0);
    }
    if (
      selectedCardTypes.length !== 0 &&
      !selectedCardTypes.includes(CardType.SPONSOR_CARD)
    ) {
      setSponsorCardsCount(0);
    }
  }, [selectedCardTypes]);

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  const resetAll = () => {
    setSelectedFreeActions([]);
    setSelectedSectors([]);
    setTextFilter('');
    setSelectedCardTypes([]);
    setSelectedCardSources([]);
    // setBaseCardsCount(0);
    // setSponsorCardsCount(0);
    setSortOrder(SortOrder.ID_ASC);
    setCredit([0]);
    // setStrength([0]);
    setTotalMaxNum(INIT_MAX_NUM); // reset the total number of cards to be displayed
    setReset(true);
  };

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <div className='flex flex-col space-y-4 px-2 py-2 md:px-4'>
          <div className='flex flex-col md:flex-row'>
            <CardTypeFilter
              cardTypes={[CardType.ANIMAL_CARD, CardType.SPONSOR_CARD]}
              onFilterChange={setSelectedCardTypes}
              reset={reset}
            />
            <Separator orientation='vertical' className='mr-5 bg-zinc-900' />
            <CardSourceFilter
              onFilterChange={setSelectedCardSources}
              reset={reset}
            />
          </div>
          <FreeActionFilter
            onFilterChange={setSelectedFreeActions}
            reset={reset}
          />
          {/* <SectorFilter
            onFilterChange={setSelectedSectors}
            reset={reset}
          /> */}
          <div className='flex flex-row space-x-4'>
            <TextFilter onTextChange={setTextFilter} reset={reset} />
            <div
              onClick={resetAll}
              className='group flex w-auto items-center justify-between space-x-2 rounded-2xl rounded-md bg-zinc-600 px-4 py-2 text-lg font-medium text-zinc-100 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md hover:bg-zinc-500 hover:text-primary-400 focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80'
            >
              <FiRotateCcw className='' />
            </div>
          </div>
          <div className='flex flex-row space-x-4'>
            <SortButton sortOrder={sortOrder} setSortOrder={setSortOrder} />
            <CreditFilter onFilterChange={setCredit} reset={reset} />
            {/* <StrengthFilter onFilterChange={setStrength} reset={reset} /> */}
          </div>
          <div className='flex flex-row space-x-4'>
            <CardOdometer
              value={animalCardsCount}
              name={t('Animal')}
              className='text-amber-500 hover:text-amber-600'
            />
            <CardOdometer
              value={sponsorCardsCount}
              name={t('Sponsor')}
              className='text-sky-600 hover:text-sky-700'
            />
          </div>
        </div>
        <div className='mb-2 md:mb-8'></div>
        <div className='relative'>
          {(selectedCardTypes.length === 0 ||
            selectedCardTypes.includes(CardType.ANIMAL_CARD)) && (
            <BaseCardList
              selectedFreeActions={selectedFreeActions}
              selectedSectors={selectedSectors}
              selectedCardSources={selectedCardSources}
              textFilter={textFilter}
              sortOrder={sortOrder}
              onCardCountChange={setBaseCardsCount}
              credit={credit}
              maxNum={animalMaxNum}
            />
          )}
          {/* {(selectedCardTypes.length === 0 ||
            selectedCardTypes.includes(CardType.SPONSOR_CARD)) && (
            <SponsorCardList
              selectedFreeActions={selectedFreeActions}
              selectedSectors={selectedSectors}
              selectedCardSources={selectedCardSources}
              textFilter={textFilter}
              sortOrder={sortOrder}
              onCardCountChange={setSponsorCardsCount}
              strength={strength}
              maxNum={sponsorMaxNum}
            />
          )} */}
          {/* {shouldDisplayViewMore && (
            <>
              <div className='h-10 w-full'></div>
              <div className='absolute bottom-0 h-40 w-full bg-gradient-to-b from-transparent via-[#ecf5e8] to-[#ecf5e8] lg:h-60 xl:h-80'></div>
              <Button
                className='absolute bottom-5 h-12 w-full bg-primary-600 hover:bg-primary-700'
                onClick={handleViewMore}
              >
                {t('View More')}
              </Button>
            </>
          )} */}
        </div>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'zh-CN', ['common'])),
  },
});
