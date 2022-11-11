import companyIcon01 from '../assets/section03/company01.png';
import companyIcon02 from '../assets/section03/company02.png';
import companyIcon03 from '../assets/section03/company03.png';
import { CompanyInfo, RaceDetail, RaceInfo } from './type';

export const companyInfoList: Array<CompanyInfo> = [
    {
        companyName: '板塊設計',
        title: 'The F2E 活動網站設計',
        mainSkill: '視差滾動',
        iconUrl: companyIcon01,
        detailUrl: 'https://2022.thef2e.com/news/week1'
    },
    {
        companyName: '凱鈿行動科技',
        title: '今晚，我想來點點簽',
        mainSkill: 'Canvas',
        iconUrl: companyIcon02,
        detailUrl: 'https://2022.thef2e.com/news/week2'
    },
    {
        companyName: '鈦坦科技',
        title: 'SCRUM 新手村',
        mainSkill: 'JS draggable',
        iconUrl: companyIcon03,
        detailUrl: 'https://2022.thef2e.com/news/week3'
    }
];

export const raceInfoList: Array<RaceInfo> = [
    {
        title: 'SIGN UP!',
        desc: '開放報名',
        startDate: '10/13',
        startDetail: '(四)早上 11:00',
        dueDate: '11/06',
        dueDetail: '(日)晚上 23:59'
    },
    {
        title: 'START!',
        desc: '個組別開賽',
        startDate: '10/31',
        startDetail: 'UI組、團體組開賽',
        dueDate: '11/07',
        dueDetail: '前端組開賽'
    },
    {
        title: 'UP LOAD!',
        desc: '登錄作品',
        startDate: '10/31',
        startDetail: '(一)中午 12:00',
        dueDate: '11/28',
        dueDetail: '(一)中午 12:00'
    },
    {
        title: 'STREAM!',
        desc: '線上直播',
        startDate: '11/03 ',
        startDetail: '每週四',
        dueDate: '11/24',
        dueDetail: ''
    }
];

export const raceDetailList: Array<RaceDetail> = [
    {
        award: '初選佳作共六十位 ',
        awardNum: '數位獎狀',
        frequent: '每週主題個人組共十位 團體組十組'
    },
    {
        award: '個人企業獎 共六位 ',
        awardNum: 'NTD 3,000/位',
        frequent: '每週各2名，前端1位、設計1位'
    },
    {
        award: '團體企業獎 共三組 ',
        awardNum: 'NTD 10,000/組',
        frequent: '每週主題各1組'
    }
];
