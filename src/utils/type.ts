export type CompanyInfo = {
    companyName: string;
    title: string;
    mainSkill: string;
    iconUrl: string;
    detailUrl: string;
};

export type RaceInfo = {
    title: string;
    desc: string;
    startDate: string;
    startDetail: string;
    dueDate: string;
    dueDetail: string;
};

export type RaceDetail = {
    award: string;
    awardNum: string;
    frequent: string;
};

export type QaFilter = {
    general: boolean;
    ui: boolean;
    frontend: boolean;
    team: boolean;
};

export type QaFilterkey = keyof QaFilter;

export type TrueOne<QaFilter, T extends keyof QaFilter> = {
    [key in keyof QaFilter]: key extends T ? true : false;
};
