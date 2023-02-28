import { LoremIpsum } from 'lorem-ipsum';
import {
  BsBicycle,
  BsDribbble,
  BsFillBrightnessAltHighFill, 
  BsFillMoonStarsFill, 
  BsFillPersonCheckFill,
  BsSpeaker,
  BsWifi,
} from 'react-icons/bs'
import { WiDayWindy } from 'react-icons/wi'
import { TiThumbsUp , TiNotesOutline, } from 'react-icons/ti'
import {AiFillBank, AiFillExperiment, AiFillHome, AiOutlineDashboard, AiOutlineFire, AiOutlineLineChart, AiOutlineShoppingCart, AiTwotoneCamera, AiTwotoneCar} from 'react-icons/ai'
import {GiAirplaneDeparture, GiAmericanFootballBall, GiCoffeeCup, GiColtM1911, GiCycling} from 'react-icons/gi'
import {TbHammer, TbHandRingFinger, TbHanger, TbHelmet, TbLock, TbMedicalCross, TbParachute, TbPennant, TbRadioactive, TbSnowflake} from 'react-icons/tb'

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 6,
    min: 2
  }
});
export const reviewsArr = [
  {
    icon: BsFillBrightnessAltHighFill,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: BsFillPersonCheckFill,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: BsFillMoonStarsFill,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: BsBicycle,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: BsDribbble,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: BsSpeaker,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: BsWifi,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: WiDayWindy,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: TiThumbsUp,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: TiNotesOutline,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: AiFillBank,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: AiFillExperiment,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: AiFillHome,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: AiOutlineDashboard,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: AiOutlineFire,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: AiOutlineLineChart,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: AiOutlineShoppingCart,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: AiTwotoneCamera,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: AiTwotoneCar,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: GiAirplaneDeparture,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: GiAmericanFootballBall,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: GiCoffeeCup,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: GiColtM1911,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: GiCycling,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },//
  {
    icon: TbHanger,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: TbHandRingFinger,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: TbHammer,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: TbHelmet,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: TbLock,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: TbMedicalCross,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: TbParachute,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: TbPennant,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: TbRadioactive,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
  {
    icon: TbSnowflake,
    title: lorem.generateSentences(1),
    description: lorem.generateSentences(2)
  },
]