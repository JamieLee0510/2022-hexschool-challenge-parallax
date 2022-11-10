import companyIcon01 from '../assets/section03/company01.png';
import companyIcon02 from '../assets/section03/company02.png';
import companyIcon03 from '../assets/section03/company03.png';

export const companyInfoList = [
    {
        companyName: '板塊設計',
        title: 'The F2E 活動網站設計',
        mainSkill: '視差滾動',
        icon: companyIcon01,
        detailUrl: ''
    },
    {
        companyName: '凱鈿行動科技',
        title: '今晚，我想來點點簽',
        mainSkill: 'Canvas',
        icon: companyIcon02,
        detailUrl: ''
    },
    {
        companyName: '鈦坦科技',
        title: 'SCRUM 新手村',
        mainSkill: 'JS draggable',
        icon: companyIcon03,
        detailUrl: ''
    }
];

export type RaceInfo = {
    title: string;
    desc: string;
    startDate: string;
    startDetail: string;
    dueDate: string;
    dueDetail: string;
};

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
