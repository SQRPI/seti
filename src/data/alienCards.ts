/*
 * @Author: Ender-Wiggin
 * @Date: 2024-10-22 00:01:17
 * @LastEditors: Ender-Wiggin
 * @LastEditTime: 2025-02-29 02:12:12
 * @Description:
 */
// import {Size} from "@/types/Size";

import BaseCard, { EAlienType, EResource, ESector } from '@/types/BaseCard';

export const alienCards: BaseCard[] = [
  {
    id: 'ET.20',
    name: 'Amazing Uncertainty',
    position: { src: '/images/aliens/anomalies.webp', row: 0, col: 0 },
    freeAction: [{ type: EResource.PUBLICITY, value: 2 }],
    sector: ESector.YELLOW,
    price: 1,
    income: EResource.ENERGY,
    alien: EAlienType.ANOMALIES,
  },
  {
    id: 'ET.17',
    name: 'Are we Being Observed?',
    position: { src: '/images/aliens/anomalies.webp', row: 0, col: 1 },
    freeAction: [
      { type: EResource.MOVE, value: 1 },
      { type: EResource.SCORE, value: 1 },
    ],
    sector: ESector.YELLOW,
    price: 1,
    income: EResource.CARD,
    alien: EAlienType.ANOMALIES,
  },
  {
    id: 'ET.12',
    name: 'Close-up View',
    position: { src: '/images/aliens/anomalies.webp', row: 0, col: 2 },
    freeAction: [{ type: EResource.PUBLICITY, value: 2 }],
    sector: ESector.RED,
    price: 1,
    income: EResource.CREDIT,
    alien: EAlienType.ANOMALIES,
  },
  {
    id: 'ET.13',
    name: 'Concerned People',
    position: { src: '/images/aliens/anomalies.webp', row: 0, col: 3 },
    freeAction: [
      { type: EResource.DATA, value: 1 },
      { type: EResource.SCORE, value: 1 },
    ],
    sector: ESector.YELLOW,
    price: 1,
    income: EResource.CREDIT,
    alien: EAlienType.ANOMALIES,
  },
  {
    id: 'ET.16',
    name: '',
    position: { src: '/images/aliens/anomalies.webp', row: 0, col: 4 },
    freeAction: [
      { type: EResource.DATA, value: 1 },
      { type: EResource.SCORE, value: 1 },
    ],
    sector: ESector.RED,
    price: 1,
    income: EResource.CREDIT,
    alien: EAlienType.ANOMALIES,
  },
  {
    id: 'ET.14',
    name: 'Listening Carefully',
    position: { src: '/images/aliens/anomalies.webp', row: 1, col: 0 },
    freeAction: [
      { type: EResource.MOVE, value: 1 },
      { type: EResource.SCORE, value: 1 },
    ],
    sector: ESector.RED,
    price: 2,
    income: EResource.CARD,
    alien: EAlienType.ANOMALIES,
  },
  {
    id: 'ET.18',
    name: 'Message Capsule',
    position: { src: '/images/aliens/anomalies.webp', row: 1, col: 1 },
    freeAction: [
      { type: EResource.MOVE, value: 1 },
      { type: EResource.SCORE, value: 1 },
    ],
    sector: ESector.BLUE,
    price: 2,
    income: EResource.CREDIT,
    alien: EAlienType.ANOMALIES,
  },
  {
    id: 'ET.19',
    name: 'New Physics',
    position: { src: '/images/aliens/anomalies.webp', row: 1, col: 2 },
    freeAction: [{ type: EResource.PUBLICITY, value: 2 }],
    sector: ESector.BLACK,
    price: 1,
    income: EResource.ENERGY,
    alien: EAlienType.ANOMALIES,
  },
  {
    id: 'ET.15',
    name: 'Part of Everyday Life',
    position: { src: '/images/aliens/anomalies.webp', row: 1, col: 3 },
    freeAction: [
      { type: EResource.MOVE, value: 1 },
      { type: EResource.SCORE, value: 1 },
    ],
    sector: ESector.BLUE,
    price: 1,
    income: EResource.ENERGY,
    alien: EAlienType.ANOMALIES,
  },
  {
    id: 'ET.11',
    name: 'Signs of Life',
    position: { src: '/images/aliens/anomalies.webp', row: 1, col: 4 },
    freeAction: [{ type: EResource.PUBLICITY, value: 1 }],
    sector: ESector.BLUE,
    price: 1,
    income: EResource.CARD,
    alien: EAlienType.ANOMALIES,
  },

  {
    id: 'ET.34',
    name: 'A Message from Afar',
    position: { src: '/images/aliens/centaurians.webp', row: 0, col: 0 },
    freeAction: [
      { type: EResource.MOVE, value: 1 },
      { type: EResource.SCORE, value: 1 },
    ],
    sector: ESector.RED,
    price: 1,
    income: EResource.ENERGY,
    alien: EAlienType.CENTAURIANS,
  },
  {
    id: 'ET.36',
    name: 'Alien Schematics',
    position: { src: '/images/aliens/centaurians.webp', row: 0, col: 1 },
    freeAction: [
      { type: EResource.DATA, value: 1 },
      { type: EResource.SCORE, value: 1 },
    ],
    sector: ESector.BLUE,
    price: 1,
    income: EResource.CREDIT,
    alien: EAlienType.CENTAURIANS,
  },
  {
    id: 'ET.32',
    name: 'Exocomputers',
    position: { src: '/images/aliens/centaurians.webp', row: 0, col: 2 },
    freeAction: [
      { type: EResource.MOVE, value: 1 },
      { type: EResource.SCORE, value: 1 },
    ],
    sector: ESector.RED,
    price: 1,
    income: EResource.DATA,
    alien: EAlienType.CENTAURIANS,
  },
  {
    id: 'ET.38',
    name: 'Hivemind Concept',
    position: { src: '/images/aliens/centaurians.webp', row: 0, col: 3 },
    freeAction: [{ type: EResource.PUBLICITY, value: 1 }],
    sector: ESector.BLUE,
    price: 2,
    income: EResource.DATA,
    alien: EAlienType.CENTAURIANS,
  },
  {
    id: 'ET.33',
    name: 'Infocluster',
    position: { src: '/images/aliens/centaurians.webp', row: 0, col: 4 },
    freeAction: [{ type: EResource.PUBLICITY, value: 2 }],
    sector: ESector.YELLOW,
    price: 1,
    income: EResource.PUBLICITY,
    alien: EAlienType.CENTAURIANS,
  },
  {
    id: 'ET.37',
    name: 'Music of the Spheres',
    position: { src: '/images/aliens/centaurians.webp', row: 1, col: 0 },
    freeAction: [
      { type: EResource.DATA, value: 1 },
      { type: EResource.SCORE, value: 1 },
    ],
    sector: ESector.BLACK,
    price: 2,
    income: EResource.ENERGY,
    alien: EAlienType.CENTAURIANS,
  },
  {
    id: 'ET.35',
    name: 'Synthesis Instructions',
    position: { src: '/images/aliens/centaurians.webp', row: 1, col: 1 },
    freeAction: [{ type: EResource.PUBLICITY, value: 2 }],
    sector: ESector.YELLOW,
    price: 1,
    income: EResource.CARD,
    alien: EAlienType.CENTAURIANS,
  },
  {
    id: 'ET.39',
    name: 'Telescope Blueprints',
    position: { src: '/images/aliens/centaurians.webp', row: 1, col: 2 },
    freeAction: [
      { type: EResource.MOVE, value: 1 },
      { type: EResource.SCORE, value: 1 },
    ],
    sector: ESector.RED,
    price: 2,
    income: EResource.PUBLICITY,
    alien: EAlienType.CENTAURIANS,
  },
  {
    id: 'ET.40',
    name: 'Torrent-chain Signal',
    position: { src: '/images/aliens/centaurians.webp', row: 1, col: 3 },
    freeAction: [{ type: EResource.PUBLICITY, value: 2 }],
    sector: ESector.YELLOW,
    price: 2,
    income: EResource.DATA,
    alien: EAlienType.CENTAURIANS,
  },
  {
    id: 'ET.31',
    name: 'Vessel Designs',
    position: { src: '/images/aliens/centaurians.webp', row: 1, col: 4 },
    freeAction: [
      { type: EResource.DATA, value: 1 },
      { type: EResource.SCORE, value: 1 },
    ],
    sector: ESector.BLUE,
    price: 1,
    income: EResource.PUBLICITY,
    alien: EAlienType.CENTAURIANS,
  },
];

console.log(alienCards.map((a) => a.name).join(', '));
