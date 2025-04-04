/* eslint-disable @typescript-eslint/no-non-null-assertion */
/*
 * @Author: Ender-Wiggin
 * @Date: 2025-03-01 00:33:02
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-03-23 02:15:26
 * @Description:
 */
import { toPng } from 'html-to-image';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import baseCards from '@/data/baseCards';

import { EffectFactory } from '@/components/effect/Effect';
import { CardRender } from '@/components/form/CardRender';
import { EffectSelector } from '@/components/form/EffectSelector';
import { EffectsGenerator } from '@/components/form/EffectsGenerator';
import Layout from '@/components/layout/Layout';
import { AccordionV2 } from '@/components/ui/accordion-v2';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  effects2FreeAction,
  getEffectByIconType,
  updateEffectArray,
} from '@/utils/effect';

import { IBaseCard } from '@/types/BaseCard';
import { Effect } from '@/types/effect';
import { EResource, ESector, TSize } from '@/types/element';
import Seo from '@/components/Seo';

// make sure to import your TextFilter
type Props = {
  // Add custom props here
};

export default function HomePage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation('common');
  const downloadRef = React.useRef<HTMLDivElement>(null);

  const [currentEffects, setCurrentEffects] = useState<Effect[]>([]);
  const [currentIncome, setCurrentIncome] = useState<EResource>(
    EResource.CREDIT
  );
  const [currentSector, setCurrentSector] = useState<ESector>(ESector.RED);
  const [currentImage, setCurrentImage] = useState<string>();
  const [currentCredit, setCurrentCredit] = useState<string>();
  const [currentTitle, setCurrentTitle] = useState<string>();
  const [currentId, setCurrentId] = useState<string>('Fan.1');

  const [currentFlavorText, setCurrentFlavorText] = useState<string>();
  const [currentFreeActions, setCurrentFreeActions] = useState<Effect[]>([]);
  const [useUrl, setUseUrl] = useState(false);

  const handleReset = () => {
    setCurrentEffects([]);
    setCurrentIncome(EResource.CREDIT);
    setCurrentSector(ESector.RED);
    setCurrentCredit('');
    setCurrentTitle('');
    setCurrentFlavorText('');
    setCurrentFreeActions([]);
    setCurrentImage('');
    setCurrentId('Fan.1');
  };
  const handleEffectsChange = (effects: Effect[]) => {
    setCurrentEffects(effects);
  };

  const handleIncomeChange = (data: EResource) => {
    setCurrentIncome(data);
  };

  const handleFreeActionChange = (effect: Effect) => {
    setCurrentFreeActions((prevEffects) =>
      updateEffectArray(prevEffects, effect)
    );
  };

  const handleSectorChange = (data: ESector) => {
    setCurrentSector(data);
  };

  const handleImageUpload = (e: any) => {
    if (e.target.files) setCurrentImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSetImage = (data: string) => {
    setCurrentImage(data);
  };

  const handleCreditChange = (data: string) => {
    setCurrentCredit(data);
  };

  const handleTitleChange = (data: string) => {
    setCurrentTitle(data);
  };

  const handleFlavorTextChange = (data: string) => {
    setCurrentFlavorText(data);
  };

  const handleUrlChange = () => {
    setUseUrl((prev) => !prev);
  };

  const handleDownloadImage = async () => {
    if (downloadRef.current === null) {
      return;
    }

    toPng(downloadRef.current, { quality: 0.8, pixelRatio: 10 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = currentTitle + '.png';
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleJsonImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (!e.target.files) {
      return;
    }
    fileReader.readAsText(e.target.files[0], 'UTF-8');
    fileReader.onload = (event) => {
      if (!event.target) {
        return;
      }
      try {
        const parsedData = JSON.parse(event.target.result as string);
        if (!parsedData?.special?.fanMade) {
          throw new Error('Not Validate!');
        }

        setCurrentEffects(parsedData.effects);
        setCurrentIncome(parsedData.income);
        setCurrentSector(parsedData.sector);
        setCurrentCredit(parsedData.price);
        setCurrentTitle(parsedData.name);
        setCurrentFlavorText(parsedData.flavorText);
        setCurrentFreeActions(parsedData.freeAction);
        setCurrentImage(parsedData.image);
        setCurrentId(parsedData.id);
        // setIsResetting(true);
      } catch (error) {
        alert("Failed to parse the JSON. Please ensure it's a valid JSON.");
      }
    };
  };

  const renderCard = useMemo(() => {
    const res: IBaseCard = {
      ...baseCards[0],
      id: currentId || '',
      effects: currentEffects,
      income: currentIncome,
      sector: currentSector,
      // position: { src: currentImage || '', row: 0, col: 0 },
      image:
        currentImage ||
        'https://cf.geekdo-images.com/MUmw2-kFJ0OYBZMiUniI_g__imagepage/img/FtaM7L1afBKFc-T7JShGDkdNUGk=/fit-in/900x600/filters:no_upscale():strip_icc()/pic8259598.jpg',
      price: Number(currentCredit) || 0,
      name: currentTitle || '',
      flavorText: currentFlavorText,
      freeAction: effects2FreeAction(currentFreeActions),
      special: {
        fanMade: true,
        enableEffectRender: true,
      },
    };

    return res;
  }, [
    currentId,
    currentEffects,
    currentIncome,
    currentSector,
    currentImage,
    currentCredit,
    currentTitle,
    currentFlavorText,
    currentFreeActions,
  ]);

  const exportToJson = () => {
    const tmp = renderCard;
    // tmp.image = ''; // FIXME: data storage?
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tmp));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute(
      'download',
      `${renderCard.id || 'fan-made-card'}.json`
    );
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <Layout>
      <Seo templateTitle='Card Editor' />
      <div className='flex flex-col lg:flex-row gap-4 px-2'>
        <div className='relative flex flex-col w-full lg:w-3/5'>
          <div className='w-80 h-[440px]'>
            <div className='card-larger'>
              <div ref={downloadRef} className=''>
                <CardRender card={renderCard} />
              </div>
            </div>
          </div>
          <div className='flex justify-start items-center gap-2 mb-2'>
            <Button
              variant='destructive'
              className='w-20 mr-8'
              onClick={handleReset}
            >
              {t('Reset')}
            </Button>
            <Button
              variant='highlight'
              className='w-20'
              onClick={handleDownloadImage}
            >
              {t('Download')}
            </Button>
            <Button variant='highlight' className='w-20' onClick={exportToJson}>
              {t('Export')}
            </Button>
          </div>
          <AccordionV2 title='Effect'>
            <EffectsGenerator
              selectedEffects={currentEffects}
              onChange={(e) => handleEffectsChange(e)}
            />
          </AccordionV2>
        </div>
        <div className='flex flex-col gap-2'>
          <EffectSelector
            title={t('Free Action')}
            currentEffects={currentFreeActions}
            icons={[
              EResource.PUBLICITY,
              EResource.DATA,
              EResource.MOVE,
              EResource.SCORE,
            ]}
            onChange={handleFreeActionChange}
          />

          <AccordionV2 title='Income'>
            {/* <div className='text-white text-lg'>Income</div> */}
            <div className='w-full grid grid-cols-5 gap-4 lg:grid-cols-5 flex-shrink-0 h-40'>
              {Object.values(EResource).map((e) => {
                return (
                  <div
                    key={e}
                    onClick={() => handleIncomeChange(e)}
                    className={cn(
                      'flex w-40 h-40 items-center rounded-md bg-gradient-to-b px-4 py-2 text-sm font-medium shadow-zinc-800/5 ring-1 backdrop-blur-md focus:outline-none from-zinc-900/30 to-zinc-800/80 text-zinc-200 ring-white/10 hover:ring-white/20 p-2 shadow-md h-18 w-18 justify-center'
                      // { 'ring-white/10 from-zinc-900/30 to-primary/80': hasEffect }
                    )}
                  >
                    <EffectFactory
                      effect={{
                        ...getEffectByIconType(e)!,
                        size: 'xl' as TSize,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </AccordionV2>

          <AccordionV2 title={t('Sector')}>
            {/* <div className='text-white text-lg'>Sector</div> */}
            <div className='w-full grid grid-cols-5 gap-4 lg:grid-cols-5 flex-shrink-0'>
              {Object.values(ESector).map((e) => {
                return (
                  <div
                    key={e}
                    onClick={() => handleSectorChange(e as ESector)}
                    className={cn(
                      'flex w-40 h-fit items-center rounded-md bg-gradient-to-b px-4 py-2 text-sm font-medium shadow-zinc-800/5 ring-1 backdrop-blur-md focus:outline-none from-zinc-900/30 to-zinc-800/80 text-zinc-200 ring-white/10 hover:ring-white/20 p-2 shadow-md h-18 w-18 justify-center'
                      // { 'ring-white/10 from-zinc-900/30 to-primary/80': hasEffect }
                    )}
                  >
                    <EffectFactory
                      effect={{
                        ...getEffectByIconType(e)!,
                        size: 'xl' as TSize,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </AccordionV2>

          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='picture'>{t('Image')}</Label>
            <div className='flex gap-2'>
              {!useUrl ? (
                <Input
                  id='picture'
                  type='file'
                  onChange={(e) => handleImageUpload(e)}
                />
              ) : (
                <Input
                  type='url'
                  id='url'
                  placeholder='url'
                  value={currentImage}
                  onChange={(e) => handleSetImage(e.target.value)}
                />
              )}

              <Button className='w-40' onClick={handleUrlChange}>
                {useUrl ? t('Use Upload') : t('Use URL')}
              </Button>
            </div>
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='credit'>{t('Credit')}</Label>
            <Input
              type='credit'
              id='credit'
              placeholder={t('Your card price')}
              value={currentCredit}
              onChange={(e) => handleCreditChange(e.target.value)}
            />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='title'>{t('Title')}</Label>
            <Input
              type='title'
              id='title'
              placeholder={t('Your card title')}
              value={currentTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='title'>{t('Flavor Text')}</Label>
            <Input
              type='title'
              id='title'
              value={currentFlavorText}
              placeholder={t('Tell more about your card')}
              onChange={(e) => handleFlavorTextChange(e.target.value)}
            />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='title'>{t('Card ID')}</Label>
            <Input
              type='title'
              id='title'
              value={currentId}
              placeholder={t('Enter card title')}
              onChange={(e) => setCurrentId(e.target.value)}
            />
          </div>

          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='animal-json-import'>{t('diy.import_json')}</Label>
            <Input
              id='animal-json-import'
              type='file'
              value=''
              className=''
              onChange={handleJsonImport}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'zh-CN', [
      'common',
      'seti',
      'flavorText',
    ])),
  },
});
