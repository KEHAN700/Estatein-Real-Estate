import AppsAddIcon from '@/assets/icons/apps-add.svg?react';
import BulbIcon from '@/assets/icons/bulb.svg?react';
import ChartIcon from '@/assets/icons/chart.svg?react';
import CoinsIcon from '@/assets/icons/coins.svg?react';
import FireIcon from '@/assets/icons/fire.svg?react';
import MegaphoneIcon from '@/assets/icons/megaphone.svg?react';
import PieIcon from '@/assets/icons/pie.svg?react';
import SparklesIcon from '@/assets/icons/sparkles.svg?react';
import SunIcon from '@/assets/icons/sun.svg?react';
import SwatchIcon from '@/assets/icons/swatch.svg?react';

export const sellingServices = [
  { icon: ChartIcon, title: 'Valuation Mastery', text: 'Discover the true worth of your property with our expert valuation services.' },
  { icon: PieIcon, title: 'Strategic Marketing', text: 'Selling a property requires more than just a listing; it demands a strategic marketing approach.' },
  { icon: CoinsIcon, title: 'Negotiation Wizardry', text: 'Negotiating the best deal is an art, and our negotiation experts are masters of it.' },
  { icon: MegaphoneIcon, title: 'Closing Success', text: 'A successful sale is not complete until the closing. We guide you through the intricate closing process.' },
];

export const managementServices = [
  { icon: AppsAddIcon, title: 'Tenant Harmony', text: 'Our Tenant Management services ensure that your tenants have a smooth and reducing vacancies.' },
  { icon: SwatchIcon, title: 'Maintenance Ease', text: 'Say goodbye to property maintenance headaches. We handle all aspects of property upkeep.' },
  { icon: SparklesIcon, title: 'Financial Peace of Mind', text: 'Managing property finances can be complex. Our financial experts take care of rent collection' },
  { icon: SunIcon, title: 'Legal Guardian', text: 'Stay compliant with property laws and regulations effortlessly.' },
];

export const investmentServices = [
  { icon: ChartIcon, title: 'Market Insight', text: 'Stay ahead of market trends with our expert Market Analysis. We provide in-depth insights into real estate market conditions' },
  { icon: FireIcon, title: 'ROI Assessment', text: 'Make investment decisions with confidence. Our ROI Assessment services evaluate the potential returns on your investments' },
  { icon: BulbIcon, title: 'Customized Strategies', text: 'Every investor is unique, and so are their goals. We develop Customized Investment Strategies tailored to your specific needs' },
  { icon: SunIcon, title: 'Diversification Mastery', text: 'Diversify your real estate portfolio effectively. Our experts guide you in spreading your investments across various property types and locations' },
];

export type Service = (typeof sellingServices)[number];
