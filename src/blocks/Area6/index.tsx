import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { QaFilter, QaFilterkey, TrueOne } from '../../utils/type';
import './area6.scss';

const qa1 = [
    {
        q: '如果某一週不小心挑戰失敗，是否能再繼續挑戰後面關卡？',
        a: ':可以，儘管那週挑戰失敗，之後您仍可以挑選喜歡的關卡進行挑戰，並在該關卡期限內繳交作品。'
    },
    {
        q: '大家都好強，我怕我做的東西沒有達到過關門檻，不敢登錄作品',
        a: ':這個活動並非競爭性質，每個參賽者都是你的隊友，最大的敵人是你自己，因為你必須定期練功前端開發，讓自己能夠順利完賽。'
    },
    {
        q: '我不確定自己做的版型有沒有符合過關門檻，要寫到什麼程度才有到過關門檻？',
        a: ':主辦單位其實不會去審核大家的程式碼，只要你認為當週你有針對主題有做到一定程度，就算是半完成品也請大方投稿，不用擔心。'
    },
    {
        q: '我已經寫到一半了，但時間快來不及，可以先投稿嗎？',
        a: ':可以，有投稿表示你還會持續努力在這次活動上。'
    }
];

const qa2 = [
    {
        q: '到時投稿到平台是提供什麼呢？我也不像是工程師可以有 CODEPEN 上傳。',
        a: ':其中投稿的欄位裡面會有一個「線上標示文件」，像是 Adobe XD 便有提供該服務(範例連結)，屆時提供標示文件後，便可讓其他前端工程師採用你的設計稿來開發。'
    },
    {
        q: '投稿上去的 UI 作品，我知道需要授權讓前端工程師組做成 Web 介面，那授權部分可以設定嗎？',
        a: ':會有的，屆時平台投稿流程上，會讓您的作品可以選擇 CC0、CC BY 等授權，以保障您的 UI 作品權益。'
    },
    {
        q: '一定要上傳「線上標示文件」嗎？',
        a: ':是的，因為這樣才有辦法讓其他前端工程師，能採用您的設計稿，將您的設計稿實作出網頁格式。如果您是使用 Sketch，也可使用 Sketch Measure 編譯出來後，壓縮 ZIP 到雲端空間 (Dropbox、Google Drive)。'
    },
    {
        q: '不能使用 PS、Illustrator 設計嗎？',
        a: ':只要您能找到 PS 或 Illustrator 產出線上標示文件的方式就可以，因為前端工程師大部分皆比較少具有繪圖軟體，所以用線上標示文件將會減少許工程師協作上的溝通時間。'
    },
    {
        q: '當每週一題目出來後，我有一些設計進度也可以先投稿嗎？',
        a: ':可以，團隊在協作過程中，一定也會先出些進度提供前端切版，有進度時您也可以先投稿，讓前端工程師可以先接手，之後再透過 FB 社團來溝通進度即可。'
    }
];

const qa3 = [
    {
        q: '我可以不依照設計稿，自己做版面嗎？因為我想多練習 JS / 後端',
        a: ':可以，The F2E 活動是希望讓大家人人有功練，所以依照你自己想投入的方向練功即可。CSS 也可以用框架，例如 Bootstrap。'
    },
    {
        q: '前端介面一定要長得一模一樣嗎？',
        a: ':不用，依照自己的想法來開發也可以'
    },
    {
        q: '有現成的網頁靜態頁面嗎？我想只練習 JS / 後端就好',
        a: ':這段我們不會提供，畢竟每個人習慣的 Coding style 又不一樣，產出的 HTML、CSS 並非是自己習慣的 Layout 反而會更花時間。'
    },
    {
        q: '那我只想要練習 JS，HTML/CSS 我用陽春版，不依照設計稿開發可以嗎？',
        a: ':可以，你可以當做我們就是出一個主題，你依照那主題當作參考方向來開發即可。'
    }
];

const qa4 = [
    { q: '請問團體組最多幾人？', a: ':最多 4 人，投稿作品時請派一位組長來投稿即可。' },
    {
        q: '我對獎項有興趣，可以只做第三道主題就好嗎？',
        a: ':可以，您可以在這場活動中，和組員一起打磨第三道主題，不用三個主題都做。'
    },
    {
        q: '那團體組第三道主題最晚投稿期限為？',
        a: ':團體組投稿第三週 UI 最晚投稿時間為 11/21(一) 中午 12 點，前端最晚投稿期限為 11/28(一) 中午 12 點。'
    },
    {
        q: '我們團體組比較想做手機 APP，可以投稿並符合評審門檻嗎？',
        a: ':您可以開發手機 APP，若有在期限前投稿也能獲得數位獎狀。但評審門檻僅限 Web 瀏覽器應用開發，Android、iOS APP 則不在評審範圍內，故不符合評審門檻。'
    },
    {
        q: '請問除了前端開發、UI 設計外，還能做其他加值應用嗎？例如後端動態應用整合？',
        a: ':可以的，只要能透過網頁瀏覽器操控您的服務，並有使用到 TDX API 的任何一個 API，您可以依照本次主題「全台公車動態時刻查詢應用服務」做最大的加值整合應用，甚至搭配後端應用，整合多個外部 API 也是可以的。'
    },
    {
        q: '團體組的 UI 設計稿，可以讓『個人組-前端工程師』組別採用嗎？',
        a: ':不能，預設是不能讓『個人組-前端工程師』採用。'
    }
];

const titleLengthLimit = 21;
const contentLengthLimit = 26;

const checkTitleLength = (title: string) => {
    return title.length <= titleLengthLimit;
};

export default function Area6() {
    const [qaSection, setQaSection] = useState<QaFilter>({
        general: true,
        ui: false,
        frontend: false,
        team: false
    });

    const [qa, setQa] = useState<Array<{ q: string; a: string }>>(qa1);

    // const qaRef = useRef(qa1);

    const chooseQa = (section: string) => {
        demoRef.current!.forEach((ele) => {
            if (ele!.classList.contains('disappear')) {
                ele?.classList.remove('disappear');
            }
        });
        // get refer section
        demoRef.current = document.querySelectorAll(section);

        // clean bottom line
        demoRef.current!.forEach((ele) => {
            ele!.classList.add('disappear');
        });
    };

    const qaContent = (qaStr: string, transFormData: string) => {
        const list = [];
        let preIdx = 0;

        let y = 0;
        while (preIdx < qaStr.length) {
            list.push(
                <tspan key={preIdx} x="0" y={y}>
                    {qaStr.slice(preIdx, (preIdx += contentLengthLimit))}
                </tspan>
            );
            y = y + 28.8;
        }

        return (
            <text className="w" transform={transFormData}>
                {list}
            </text>
        );
    };

    const qaTitle = (qaStr: string, transFormData: string) => {
        const list = [];
        let preIdx = 0;

        let y = 0;
        while (preIdx < qaStr.length) {
            list.push(
                <tspan key={preIdx} x="0" y={y}>
                    {qaStr.slice(preIdx, (preIdx += titleLengthLimit))}
                </tspan>
            );
            y = y + 28.8;
        }

        return (
            <text className="w" transform={transFormData}>
                {list}
            </text>
        );
    };

    useEffect(() => {
        if (qaSection.general) {
            chooseQa('.section1');
        } else if (qaSection.ui) {
            chooseQa('.section2');
        } else if (qaSection.frontend) {
            chooseQa('.section3');
            //setQa(qa3);
        } else {
            chooseQa('.section4');
            //setQa(qa4);
        }
    }, [qaSection.frontend, qaSection.general, qaSection.ui, qaSection.team]);

    const demoRef = useRef<NodeListOf<Element> | Array<null>>([]);

    // useEffect(() => {

    return (
        <div className="root6">
            <div className="container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1804.42 980.37">
                    <g id="a">
                        <g>
                            <g id="b">
                                <rect className="ac" x="412.54" y="3.35" width="338" height="855" />
                            </g>
                            <rect className="a`" x="408.56" y="92.2" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="89.03" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="85.85" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="82.69" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="79.51" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="76.31" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="73.13" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="69.97" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="66.79" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="63.59" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="60.41" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="57.25" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="54.07" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="50.87" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="47.69" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="44.53" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="41.35" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="38.15" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="34.97" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="31.81" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="28.63" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="25.43" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="22.25" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="19.09" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="15.91" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="12.71" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="9.53" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="6.37" width="3.96" height="3.18" />
                            <rect className="a`" x="408.56" y="3.19" width="3.96" height="3.18" />
                            <g>
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="92.59"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="89.42"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="86.24"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="83.08"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="79.9"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="76.7"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="73.52"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="70.36"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="67.18"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="63.98"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="60.8"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="57.64"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="54.46"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="51.26"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="48.08"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="44.92"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="41.74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="38.54"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="35.36"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="32.2"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="29.02"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="25.82"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="22.64"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="19.48"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="16.3"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="13.1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="9.92"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="6.76"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="747.41"
                                    y="3.58"
                                    width="3.96"
                                    height="3.18"
                                />
                            </g>
                            <rect className="a`" x="412.56" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="412.51" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="416.52" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="420.52" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="424.48" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="428.48" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="432.49" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="436.49" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="440.42" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="444.42" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="448.43" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="452.43" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="456.37" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="460.37" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="464.38" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="468.38" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="472.31" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="476.31" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="480.32" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="484.32" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="488.28" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="492.28" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="496.29" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="500.29" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="504.22" y=".16" width="3.96" height="3.18" />
                            <rect className="a`" x="508.22" y=".16" width="3.96" height="3.18" />
                            <g>
                                <rect
                                    className="a`"
                                    x="512.18"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="516.19"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="520.19"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="524.15"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="528.15"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="532.16"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="536.15"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="540.09"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="544.09"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect className="a`" x="548.1" y=".16" width="3.96" height="3.18" />
                                <rect className="a`" x="552.1" y=".16" width="3.96" height="3.18" />
                                <rect
                                    className="a`"
                                    x="556.09"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="560.09"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect className="a`" x="564.1" y=".16" width="3.96" height="3.18" />
                                <rect className="a`" x="568.1" y=".16" width="3.96" height="3.18" />
                                <rect
                                    className="a`"
                                    x="572.04"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="576.03"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="580.04"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="584.04"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect className="a`" x="588" y=".16" width="3.96" height="3.18" />
                                <rect className="a`" x="592" y=".16" width="3.96" height="3.18" />
                                <rect
                                    className="a`"
                                    x="596.01"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="600.01"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="603.94"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="607.94"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="611.95"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="615.95"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="619.89"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="623.89"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect className="a`" x="627.9" y=".16" width="3.96" height="3.18" />
                                <rect className="a`" x="631.9" y=".16" width="3.96" height="3.18" />
                                <rect
                                    className="a`"
                                    x="635.84"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="639.83"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="643.84"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="647.84"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect className="a`" x="651.8" y=".16" width="3.96" height="3.18" />
                                <rect className="a`" x="655.8" y=".16" width="3.96" height="3.18" />
                                <rect
                                    className="a`"
                                    x="659.81"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="663.81"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="667.74"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="671.74"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                            </g>
                            <g>
                                <rect
                                    className="a`"
                                    x="675.69"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="679.69"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="683.63"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="687.63"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="691.64"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="695.64"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="699.57"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="703.57"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="707.58"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="711.58"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="715.54"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="719.54"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="723.55"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="727.54"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="731.48"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="735.48"
                                    y=".16"
                                    width="3.96"
                                    height="3.18"
                                />
                                <g>
                                    <rect
                                        className="a`"
                                        x="739.44"
                                        y=".16"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="743.44"
                                        y=".16"
                                        width="3.96"
                                        height="3.18"
                                    />
                                </g>
                            </g>
                        </g>
                        <g>
                            <g id="c">
                                <rect className="ac" x="755.44" y="3.23" width="338" height="855" />
                            </g>
                            <rect className="a`" x="751.46" y="92.08" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="88.91" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="85.73" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="82.57" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="79.39" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="76.19" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="73.01" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="69.85" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="66.67" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="63.46" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="60.28" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="57.12" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="53.94" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="50.74" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="47.56" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="44.4" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="41.22" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="38.03" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="34.85" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="31.69" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="28.51" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="25.31" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="22.13" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="18.97" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="15.79" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="12.58" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="9.4" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="6.24" width="3.96" height="3.18" />
                            <rect className="a`" x="751.46" y="3.06" width="3.96" height="3.18" />
                            <g>
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="92.47"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="89.29"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="86.11"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="82.95"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="79.77"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="76.57"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="73.39"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="70.23"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="67.05"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="63.85"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="60.67"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="57.51"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="54.33"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="51.13"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="47.95"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="44.79"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="41.61"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="38.41"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="35.23"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="32.07"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="28.89"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="25.69"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="22.51"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="19.35"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="16.17"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="12.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="9.79"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="6.63"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1090.31"
                                    y="3.45"
                                    width="3.96"
                                    height="3.18"
                                />
                            </g>
                            <rect className="a`" x="755.45" y=".04" width="3.96" height="3.18" />
                            <rect className="a`" x="755.41" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="759.42" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="763.42" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="767.38" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="771.38" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="775.39" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="779.39" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="783.32" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="787.32" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="791.33" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="795.33" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="799.27" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="803.27" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="807.28" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="811.28" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="815.21" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="819.21" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="823.22" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="827.22" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="831.18" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="835.18" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="839.19" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="843.19" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="847.12" y=".03" width="3.96" height="3.18" />
                            <rect className="a`" x="851.12" y=".03" width="3.96" height="3.18" />
                            <g>
                                <rect
                                    className="a`"
                                    x="855.08"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="859.09"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="863.08"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="867.05"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="871.04"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="875.05"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="879.05"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="882.99"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="886.99"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="890.99"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="894.99"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="898.99"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="902.99"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect className="a`" x="907" y=".03" width="3.96" height="3.18" />
                                <rect className="a`" x="911" y=".03" width="3.96" height="3.18" />
                                <rect
                                    className="a`"
                                    x="914.93"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="918.93"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="922.94"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="926.94"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect className="a`" x="930.9" y=".03" width="3.96" height="3.18" />
                                <rect className="a`" x="934.9" y=".03" width="3.96" height="3.18" />
                                <rect
                                    className="a`"
                                    x="938.91"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="942.91"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="946.84"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="950.84"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="954.85"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="958.85"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="962.79"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="966.79"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect className="a`" x="970.8" y=".03" width="3.96" height="3.18" />
                                <rect className="a`" x="974.8" y=".03" width="3.96" height="3.18" />
                                <rect
                                    className="a`"
                                    x="978.73"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="982.73"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="986.74"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="990.74"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect className="a`" x="994.7" y=".03" width="3.96" height="3.18" />
                                <rect className="a`" x="998.7" y=".03" width="3.96" height="3.18" />
                                <rect
                                    className="a`"
                                    x="1002.71"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1006.71"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1010.64"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1014.64"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                            </g>
                            <g>
                                <rect
                                    className="a`"
                                    x="1018.58"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1022.58"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1026.53"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1030.53"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1034.53"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1038.53"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1042.47"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1046.47"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1050.48"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1054.47"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1058.44"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1062.43"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1066.44"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1070.44"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1074.38"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1078.38"
                                    y=".03"
                                    width="3.96"
                                    height="3.18"
                                />
                                <g>
                                    <rect
                                        className="a`"
                                        x="1082.33"
                                        y=".03"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1086.34"
                                        y=".03"
                                        width="3.96"
                                        height="3.18"
                                    />
                                </g>
                            </g>
                        </g>
                        <g>
                            <g id="d">
                                <rect
                                    className="ac"
                                    x="1098.41"
                                    y="3.29"
                                    width="338"
                                    height="855"
                                />
                            </g>
                            <rect className="a`" x="1094.43" y="92.14" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="88.97" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="85.79" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="82.63" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="79.45" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="76.25" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="73.07" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="69.91" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="66.73" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="63.53" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="60.35" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="57.19" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="54.01" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="50.81" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="47.63" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="44.47" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="41.29" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="38.09" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="34.91" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="31.75" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="28.57" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="25.37" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="22.19" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="19.03" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="15.85" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="12.65" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="9.47" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="6.31" width="3.96" height="3.18" />
                            <rect className="a`" x="1094.43" y="3.13" width="3.96" height="3.18" />
                            <g>
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="92.53"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="89.36"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="86.18"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="83.02"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="79.84"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="76.64"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="73.46"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="70.3"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="67.12"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="63.92"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="60.74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="57.57"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="54.39"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="51.2"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="48.02"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="44.86"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="41.68"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="38.48"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="35.3"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="32.14"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="28.96"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="25.76"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="22.58"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="19.42"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="16.24"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="13.04"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="9.86"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="6.69"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1433.27"
                                    y="3.51"
                                    width="3.96"
                                    height="3.18"
                                />
                            </g>
                            <rect className="a`" x="1098.42" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1098.38" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1102.39" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1106.39" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1110.35" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1114.35" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1118.35" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1122.35" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1126.29" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1130.29" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1134.3" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1138.29" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1142.24" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1146.24" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1150.25" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1154.25" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1158.18" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1162.18" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1166.19" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1170.19" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1174.15" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1178.15" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1182.15" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1186.15" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1190.09" y=".1" width="3.96" height="3.18" />
                            <rect className="a`" x="1194.09" y=".1" width="3.96" height="3.18" />
                            <g>
                                <rect
                                    className="a`"
                                    x="1198.04"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1202.05"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1206.05"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1210.01"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1214.01"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1218.02"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1222.02"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1225.95"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1229.95"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1233.96"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1237.96"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1241.96"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1245.96"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1249.97"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1253.97"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect className="a`" x="1257.9" y=".1" width="3.96" height="3.18" />
                                <rect className="a`" x="1261.9" y=".1" width="3.96" height="3.18" />
                                <rect
                                    className="a`"
                                    x="1265.91"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1269.91"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1273.87"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1277.87"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1281.87"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1285.87"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1289.81"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1293.81"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1297.82"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1301.81"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1305.76"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1309.76"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1313.77"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1317.77"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect className="a`" x="1321.7" y=".1" width="3.96" height="3.18" />
                                <rect className="a`" x="1325.7" y=".1" width="3.96" height="3.18" />
                                <rect
                                    className="a`"
                                    x="1329.71"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1333.71"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1337.67"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1341.67"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1345.67"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1349.67"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1353.61"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1357.61"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                            </g>
                            <g>
                                <rect
                                    className="a`"
                                    x="1361.55"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1365.55"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect className="a`" x="1369.5" y=".1" width="3.96" height="3.18" />
                                <rect
                                    className="a`"
                                    x="1373.49"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect className="a`" x="1377.5" y=".1" width="3.96" height="3.18" />
                                <rect className="a`" x="1381.5" y=".1" width="3.96" height="3.18" />
                                <rect
                                    className="a`"
                                    x="1385.44"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1389.44"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1393.44"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1397.44"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect className="a`" x="1401.4" y=".1" width="3.96" height="3.18" />
                                <rect className="a`" x="1405.4" y=".1" width="3.96" height="3.18" />
                                <rect
                                    className="a`"
                                    x="1409.41"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1413.41"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1417.34"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1421.34"
                                    y=".1"
                                    width="3.96"
                                    height="3.18"
                                />
                                <g>
                                    <rect
                                        className="a`"
                                        x="1425.3"
                                        y=".1"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1429.31"
                                        y=".1"
                                        width="3.96"
                                        height="3.18"
                                    />
                                </g>
                            </g>
                        </g>
                    </g>
                    <g id="e">
                        <g>
                            <g id="f">
                                <g>
                                    <rect
                                        className="ac"
                                        x="2.07"
                                        y="98.94"
                                        width="1782.11"
                                        height="859"
                                        rx="12.66"
                                        ry="12.66"
                                    />
                                    <rect
                                        className="ac"
                                        x="70.01"
                                        y="3.94"
                                        width="338"
                                        height="855"
                                    />
                                </g>
                            </g>
                            <rect className="a`" x="3.03" y="951.17" width="3.96" height="3.18" />
                            <rect className="a`" x=".03" y="948.01" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="95.97" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="92.79" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="89.62" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="86.44" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="83.28" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="80.1" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="76.9" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="73.72" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="70.56" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="67.38" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="64.17" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="60.99" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="57.83" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="54.65" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="51.45" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="48.27" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="45.11" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="41.93" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="38.74" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="35.56" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="32.4" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="29.22" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="26.02" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="22.84" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="19.68" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="16.5" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="13.29" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="10.11" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="6.95" width="3.96" height="3.18" />
                            <rect className="a`" x="66.03" y="3.77" width="3.96" height="3.18" />
                            <rect className="a`" x="1783.16" y="105.9" width="3.96" height="3.18" />
                            <g>
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="93.18"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="90.01"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="86.83"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="83.67"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="80.48"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="77.29"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="74.11"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="70.95"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="67.77"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="64.56"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="61.38"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="58.22"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="55.04"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="51.84"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="48.66"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="45.5"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="42.32"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="39.13"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="35.95"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="32.79"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="29.61"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="26.41"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="23.23"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="20.07"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="16.89"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="13.68"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="10.5"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="7.34"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="404.88"
                                    y="4.16"
                                    width="3.96"
                                    height="3.18"
                                />
                            </g>
                            <rect className="a`" x="6.03" y="954.35" width="3.96" height="3.18" />
                            <rect className="a`" x="2.13" y="95.97" width="3.96" height="3.18" />
                            <rect className="a`" x="6.14" y="95.97" width="3.96" height="3.18" />
                            <rect className="a`" x="10.14" y="95.97" width="3.96" height="3.18" />
                            <rect className="a`" x="14.1" y="95.97" width="3.96" height="3.18" />
                            <rect className="a`" x="18.1" y="95.97" width="3.96" height="3.18" />
                            <rect className="a`" x="22.11" y="95.97" width="3.96" height="3.18" />
                            <rect className="a`" x="26.11" y="95.97" width="3.96" height="3.18" />
                            <rect className="a`" x="30.04" y="95.97" width="3.96" height="3.18" />
                            <rect className="a`" x="34.04" y="95.97" width="3.96" height="3.18" />
                            <rect className="a`" x="38.05" y="95.97" width="3.96" height="3.18" />
                            <rect className="a`" x="42.05" y="95.97" width="3.96" height="3.18" />
                            <rect className="a`" x="46.05" y="95.97" width="3.96" height="3.18" />
                            <rect className="a`" x="50.05" y="95.97" width="3.96" height="3.18" />
                            <rect className="a`" x="54.06" y="95.97" width="3.96" height="3.18" />
                            <rect className="a`" x="58.06" y="95.97" width="3.96" height="3.18" />
                            <rect className="a`" x="61.99" y="95.97" width="3.96" height="3.18" />
                            <rect className="a`" x="65.99" y="95.97" width="3.96" height="3.18" />
                            <rect
                                className="a` section1"
                                x="70 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="74 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="77.96 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="81.96 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="85.96 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="89.96 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="93.9 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="97.9 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="101.91 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="105.9 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="109.85"
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="113.85 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="117.86 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="121.86"
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="125.79 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="129.79 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="133.8 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="137.8 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="141.76 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="145.76 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="149.76 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="153.76 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="157.7 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <rect
                                className="a` section1"
                                x="161.7 "
                                y="95.97"
                                width="3.96"
                                height="3.18"
                            />
                            <g>
                                <rect
                                    className="a` section1"
                                    x="165.65"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="169.66"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="173.66"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="177.62"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="181.62"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="185.63"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="189.63"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="193.56"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="197.56"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="201.57"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="205.57"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="209.57"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="213.57"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="217.58"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="221.58"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="225.51"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="229.51"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="233.52"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="237.52"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="241.48"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="245.48"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="249.49"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="253.48"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="257.42"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="261.42"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="265.43"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="269.43"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="273.37"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="277.37"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="281.38"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="285.38"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="289.31"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="293.31"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="297.32"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="301.32"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="305.28"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="309.28"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="313.29"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="317.28"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="321.22"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="325.22"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                            </g>
                            <g>
                                <rect
                                    className="a` section1"
                                    x="329.16"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="333.16"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="337.11"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="341.1"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="345.11"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="349.11"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="353.05"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="357.05"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="361.05"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="365.05"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="369.01"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="373.01"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="377.02"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="381.02"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="384.95"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a` section1"
                                    x="388.95"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <g>
                                    <rect
                                        className="a` section1"
                                        x="392.91"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section1"
                                        x="396.92"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section1"
                                        x="400.92"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section1"
                                        x="404.88"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="408.88"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="412.89"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="416.89"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`  section2"
                                        x="420.82"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`  section2"
                                        x="424.82"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`  section2"
                                        x="428.83"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`  section2"
                                        x="432.83"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`  section2"
                                        x="436.83"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`  section2"
                                        x="440.83"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`  section2"
                                        x="444.83"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`  section2"
                                        x="448.83"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="452.77"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="456.77"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="460.77"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="464.77"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="468.73"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="472.73"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="476.74"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="480.74"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="484.68"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="488.67"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="492.68"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="496.68"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="500.63"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="504.63"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="508.63"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="512.63"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="516.57"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="520.57"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="524.57"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="528.57"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="532.53"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="536.53"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="540.54"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="544.54"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`  section2"
                                        x="548.48"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="552.47"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                </g>
                            </g>
                            <rect className="a`" x="70.03" y=".75" width="3.96" height="3.18" />
                            <rect className="a`" x="69.98" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="73.99" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="77.99" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="81.95" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="85.95" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="89.96" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="93.96" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="97.89" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="101.89" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="105.9" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="109.9" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="113.84" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="117.84" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="121.85" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="125.85" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="129.78" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="133.78" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="137.79" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="141.79" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="145.75" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="149.75" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="153.76" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="157.76" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="161.69" y=".74" width="3.96" height="3.18" />
                            <rect className="a`" x="165.69" y=".74" width="3.96" height="3.18" />
                            <g>
                                <rect
                                    className="a`"
                                    x="169.65"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="173.66"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="177.66"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="181.62"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="185.62"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="189.63"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="193.62"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="197.56"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="201.56"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="205.57"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="209.57"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="213.56"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="217.56"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="221.57"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="225.57"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="229.51"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect className="a`" x="233.5" y=".74" width="3.96" height="3.18" />
                                <rect
                                    className="a`"
                                    x="237.51"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="241.51"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="245.47"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="249.47"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="253.48"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="257.48"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="261.41"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="265.41"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="269.42"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="273.42"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="277.36"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="281.36"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="285.37"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="289.37"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="293.31"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect className="a`" x="297.3" y=".74" width="3.96" height="3.18" />
                                <rect
                                    className="a`"
                                    x="301.31"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="305.31"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="309.27"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="313.27"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="317.28"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="321.28"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="325.21"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="329.21"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                            </g>
                            <g>
                                <rect
                                    className="a`"
                                    x="333.16"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="337.16"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect className="a`" x="341.1" y=".74" width="3.96" height="3.18" />
                                <rect className="a`" x="345.1" y=".74" width="3.96" height="3.18" />
                                <rect
                                    className="a`"
                                    x="349.11"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="353.11"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="357.04"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="361.04"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="365.05"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="369.05"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="373.01"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="377.01"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="381.02"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="385.01"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="388.95"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="392.95"
                                    y=".74"
                                    width="3.96"
                                    height="3.18"
                                />
                                <g>
                                    <rect
                                        className="a`"
                                        x="396.91"
                                        y=".74"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="400.91"
                                        y=".74"
                                        width="3.96"
                                        height="3.18"
                                    />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <rect
                                        className="a` section2"
                                        x="556.47"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="560.48"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="564.47"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="568.44"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="572.43"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="576.44"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="580.44"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="584.38"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="588.38"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="592.38"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="596.38"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="600.38"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="604.38"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="608.39"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="612.39"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="616.32"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="620.32"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="624.33"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="628.33"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="632.29"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="636.29"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="640.3"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="644.3"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="648.23"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="652.23"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="656.24"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="660.24"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="664.18"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="668.18"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="672.19"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="676.19"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="680.12"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="684.12"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="688.13"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="692.13"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="696.09"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="700.09"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="704.1"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="708.1"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="712.03"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="716.03"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                </g>
                                <g>
                                    <rect
                                        className="a` section2"
                                        x="719.97"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="723.97"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="727.92"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="731.92"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="735.93"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section2"
                                        x="739.92"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`  section2"
                                        x="743.86"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="747.86"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="751.87"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="755.87"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="759.83"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="763.82"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="767.83"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="771.83"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="775.77"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="779.77"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <g>
                                        <rect
                                            className="a` section3"
                                            x="783.72"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="787.73"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="791.73"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="795.69"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="799.69"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="803.7"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="807.7"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="811.63"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="815.63"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="819.64"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="823.64"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="827.64"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="831.64"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="835.65"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="839.64"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="843.58"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="847.58"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="851.59"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="855.59"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="859.55"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="863.55"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="867.55"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="871.55"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="875.49"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="879.49"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="883.49"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="887.49"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="891.44"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="895.44"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="899.45"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="903.44"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="907.38"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="911.38"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="915.39"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="919.39"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="923.35"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="927.35"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="931.35"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="935.35"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="939.29"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="943.29"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                    </g>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <rect
                                        className="a` section3"
                                        x="947.22"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="951.22"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="955.17"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="959.16"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="963.17"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="967.17"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="971.11"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="975.11"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="979.11"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="983.11"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="987.07"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="991.07"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="995.08"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="999.08"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="1003.01"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a` section3"
                                        x="1007.01"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <g>
                                        <rect
                                            className="a` section3"
                                            x="1010.97"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="1014.98"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="1018.98"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="1022.94"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="1026.94"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="1030.95"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="1034.95"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="1038.88"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="1042.88"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="1046.89"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="1050.89"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="1054.89"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="1058.89"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="1062.89"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="1066.89"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="1070.83"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="1074.83"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="1078.83"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="1082.83"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section3"
                                            x="1086.79"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a`"
                                            x="1090.79"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a`"
                                            x="1094.8"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1098.8"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1102.74"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1106.73"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1110.74"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1114.74"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1118.69"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1122.69"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1126.69"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1130.69"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1134.63"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1138.63"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1142.63"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1146.63"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1150.59"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1154.59"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1158.6"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1162.6"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1166.54"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1170.53"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <rect
                                            className="a` section4"
                                            x="1174.53"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1178.54"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1182.53"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1186.5"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1190.49"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1194.5"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1198.5"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1202.44"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1206.44"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1210.44"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1214.44"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1218.44"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1222.44"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1226.45"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1230.45"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1234.38"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1238.38"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1242.39"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1246.39"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1250.35"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1254.35"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1258.36"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1262.36"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1266.29"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1270.29"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1274.3"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1278.3"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1282.24"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1286.24"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1290.25"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1294.25"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1298.18"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1302.18"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1306.19"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1310.19"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1314.15"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1318.15"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1322.16"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1326.16"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1330.09"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1334.09"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                    </g>
                                    <g>
                                        <rect
                                            className="a` section4"
                                            x="1338.03"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1342.03"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1345.98"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1349.98"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1353.99"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1357.98"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1361.92"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1365.92"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1369.93"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1373.93"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1377.89"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1381.88"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1385.89"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1389.89"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1393.83"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <rect
                                            className="a` section4"
                                            x="1397.83"
                                            y="95.97"
                                            width="3.96"
                                            height="3.18"
                                        />
                                        <g>
                                            <rect
                                                className="a` section4"
                                                x="1401.78"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a` section4"
                                                x="1405.79"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a` section4"
                                                x="1409.79"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a` section4"
                                                x="1413.75"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a` section4"
                                                x="1417.75"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a` section4"
                                                x="1421.76"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a` section4"
                                                x="1425.76"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a` section4"
                                                x="1429.69"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1433.69"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1437.7"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1441.7"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1445.7"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1449.7"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1453.71"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1457.7"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1461.64"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1465.64"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1469.65"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1473.65"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1477.61"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1481.61"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1485.61"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1489.61"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1493.55"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1497.55"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1501.55"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1505.55"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1509.5"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1513.5"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1517.51"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1521.5"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1525.44"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1529.44"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1533.45"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1537.45"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1541.41"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1545.41"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1549.41"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1553.41"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1557.35"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                            <rect
                                                className="a`"
                                                x="1561.35"
                                                y="95.97"
                                                width="3.96"
                                                height="3.18"
                                            />
                                        </g>
                                    </g>
                                </g>
                            </g>
                            <g>
                                <rect
                                    className="a`"
                                    x="1565.29"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1569.29"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1573.23"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1577.23"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1581.24"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1585.24"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1589.18"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1593.17"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1597.18"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1601.18"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1605.14"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1609.14"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1613.15"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1617.15"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1621.08"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <rect
                                    className="a`"
                                    x="1625.08"
                                    y="95.97"
                                    width="3.96"
                                    height="3.18"
                                />
                                <g>
                                    <rect
                                        className="a`"
                                        x="1629.04"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1633.05"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1637.05"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1641.01"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1645.01"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1649.02"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1653.01"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1656.95"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1660.95"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1664.96"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1668.96"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1672.95"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1676.95"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1680.96"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1684.96"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1688.9"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1692.89"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1696.9"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1700.9"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1704.86"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1708.86"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1712.87"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1716.87"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1720.8"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1724.8"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1728.81"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1732.81"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1736.75"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1740.75"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1744.76"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1748.76"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1752.7"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1756.69"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1760.7"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1764.7"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1768.66"
                                        y="95.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1772.66"
                                        y="96.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1776.67"
                                        y="99.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                    <rect
                                        className="a`"
                                        x="1780.67"
                                        y="102.97"
                                        width="3.96"
                                        height="3.18"
                                    />
                                </g>
                            </g>
                            <line className="aa" x1="9.55" y1="957.76" x2="1776.05" y2="957.76" />
                            <line className="aa" x1="2.05" y1="96.26" x2="2.05" y2="948.26" />
                            <line
                                className="aa"
                                x1="1785.55"
                                y1="107.76"
                                x2="1785.55"
                                y2="949.76"
                            />
                            <rect className="y" x="1783.05" y="951.26" width="2" height="1" />
                            <rect className="y" x="1780.05" y="954.26" width="2" height="1" />
                            <rect className="y" x="1776.05" y="956.26" width="2" height="1" />
                        </g>
                    </g>
                    {qaSection.team && <g id="g">{qaContent(qa[5].a, 'translate(930.86 832)')}</g>}
                    {qaSection.team && <g id="h">{qaContent(qa[4].a, 'translate(81.23 802)')}</g>}
                    {qaSection.ui && <g id="h">{qaContent(qa[4].a, 'translate(81.23 872)')}</g>}
                    <g id="i">{qaContent(qa[3].a, 'translate(932.1 571.61)')}</g>
                    <g id="j">{qaContent(qa[2].a, 'translate(82.1 574.61)')}</g>
                    <g id="k">{qaContent(qa[1].a, 'translate(931.11 304.7)')}</g>
                    <g id="l">{qaContent(qa[0].a, 'translate(80.34 304.38)')}</g>

                    {qaSection.team && (
                        <g id="m">
                            <g>
                                {checkTitleLength(qa[5].q) && (
                                    <text className="x" transform="translate(936.91 758)">
                                        <tspan x="0" y="0">
                                            問題06. {qa[5].q}
                                        </tspan>
                                    </text>
                                )}
                                {!checkTitleLength(qa[5].q) && (
                                    <text className="x" transform="translate(936.91 758)">
                                        <tspan x="0" y="-30">
                                            問題06. {qa[5].q.slice(0, titleLengthLimit)}
                                        </tspan>
                                        <tspan x="0" y="0">
                                            {'' + qa[5].q.slice(titleLengthLimit)}
                                        </tspan>
                                    </text>
                                )}
                                <line className="ab" x1="931.6" y1="783" x2="1318.6" y2="783" />
                            </g>
                        </g>
                    )}
                    {qaSection.team && (
                        <g id="n">
                            <g>
                                {checkTitleLength(qa[4].q) && (
                                    <text className="x" transform="translate(86.91 727)">
                                        <tspan x="0" y="0">
                                            問題05. {qa[4].q}
                                        </tspan>
                                    </text>
                                )}
                                {!checkTitleLength(qa[4].q) && (
                                    <text className="x" transform="translate(86.91 727)">
                                        <tspan x="0" y="-30">
                                            問題05. {qa[4].q.slice(0, titleLengthLimit)}
                                        </tspan>
                                        <tspan x="0" y="0">
                                            {'' + qa[4].q.slice(titleLengthLimit)}
                                        </tspan>
                                    </text>
                                )}
                                <line className="ab" x1="81.6" y1="752" x2="468.6" y2="752" />
                            </g>
                        </g>
                    )}
                    {qaSection.ui && (
                        <g id="n">
                            <g>
                                {checkTitleLength(qa[4].q) && (
                                    <text className="x" transform="translate(86.91 797)">
                                        <tspan x="0" y="0">
                                            問題05. {qa[4].q}
                                        </tspan>
                                    </text>
                                )}
                                {!checkTitleLength(qa[4].q) && (
                                    <text className="x" transform="translate(86.91 797)">
                                        <tspan x="0" y="-30">
                                            問題05. {qa[4].q.slice(0, titleLengthLimit)}
                                        </tspan>
                                        <tspan x="0" y="0">
                                            {'' + qa[4].q.slice(titleLengthLimit)}
                                        </tspan>
                                    </text>
                                )}
                                <line className="ab" x1="81.6" y1="812" x2="468.6" y2="812" />
                            </g>
                        </g>
                    )}
                    <g id="o">
                        {checkTitleLength(qa[3].q) && (
                            <text className="x" transform="translate(941.15 489.65)">
                                <tspan x="0" y="0">
                                    問題04. {qa[3].q}
                                </tspan>
                            </text>
                        )}
                        {!checkTitleLength(qa[3].q) && (
                            <text className="x" transform="translate(941.15 489.65)">
                                <tspan x="0" y="-30">
                                    問題04. {qa[3].q.slice(0, titleLengthLimit)}
                                </tspan>
                                <tspan x="0" y="0">
                                    {'' + qa[3].q.slice(titleLengthLimit)}
                                </tspan>
                            </text>
                        )}

                        <line className="ab" x1="931.6" y1="515.5" x2="1318.6" y2="515.5" />
                    </g>
                    <g id="p">
                        {checkTitleLength(qa[2].q) && (
                            <text className="x" transform="translate(86.91 490.95)">
                                <tspan x="0" y="0">
                                    問題03. {qa[2].q}
                                </tspan>
                            </text>
                        )}
                        {!checkTitleLength(qa[2].q) && (
                            <text className="x" transform="translate(86.91 490.95)">
                                <tspan x="0" y="-30">
                                    問題03. {qa[2].q.slice(0, titleLengthLimit)}
                                </tspan>
                                <tspan x="0" y="0">
                                    {'' + qa[2].q.slice(titleLengthLimit)}
                                </tspan>
                            </text>
                        )}

                        <line className="ab" x1="81.6" y1="515.5" x2="468.6" y2="515.5" />
                    </g>
                    <g id="q">
                        {checkTitleLength(qa[1].q) && (
                            <text className="x" transform="translate(939.13 234.71)">
                                <tspan x="0" y="0">
                                    問題02. {qa[1].q}
                                </tspan>
                            </text>
                        )}
                        {!checkTitleLength(qa[1].q) && (
                            <text className="x" transform="translate(939.13 234.71)">
                                <tspan x="0" y="-30">
                                    問題02. {qa[1].q.slice(0, titleLengthLimit)}
                                </tspan>
                                <tspan x="0" y="0">
                                    {'' + qa[1].q.slice(titleLengthLimit)}
                                </tspan>
                            </text>
                        )}

                        <line className="ab" x1="931.6" y1="256.5" x2="1318.6" y2="256.5" />
                    </g>
                    <g id="r">
                        {checkTitleLength(qa[0].q) && (
                            <text className="x" transform="translate(85.14 233.09)">
                                <tspan x="0" y="0">
                                    問題01. {qa[0].q.slice(0, titleLengthLimit)}
                                </tspan>
                            </text>
                        )}
                        {!checkTitleLength(qa[0].q) && (
                            <text className="x" transform="translate(85.14 233.09)">
                                <tspan x="0" y="-30">
                                    問題01. {qa[0].q.slice(0, titleLengthLimit)}
                                </tspan>
                                <tspan x="0" y="0">
                                    {'' + qa[0].q.slice(titleLengthLimit)}
                                </tspan>
                            </text>
                        )}

                        <line className="ab" x1="81.6" y1="257" x2="468.6" y2="257" />
                    </g>
                    <g
                        id="s"
                        className="touchTitle"
                        onClick={() => {
                            setQa(qa1);
                            setQaSection((pre) => {
                                (Object.keys(pre) as Array<QaFilterkey>).forEach((key) => {
                                    if (key === 'general') {
                                        pre[key] = true;
                                    } else {
                                        pre[key] = false;
                                    }
                                });
                                return { ...pre };
                            });
                        }}
                    >
                        <text className="x" transform="translate(179.19 58.14)">
                            <tspan x="0" y="0">
                                常見問題
                            </tspan>
                        </text>
                    </g>
                    <g
                        id="t"
                        className="touchTitle"
                        onClick={() => {
                            setQa(qa2);
                            setQaSection((pre) => {
                                (Object.keys(pre) as Array<QaFilterkey>).forEach((key) => {
                                    if (key === 'ui') {
                                        pre[key] = true;
                                    } else {
                                        pre[key] = false;
                                    }
                                });
                                return { ...pre };
                            });
                        }}
                    >
                        <text className="x" transform="translate(467.1 58.98)">
                            <tspan x="0" y="0">
                                UI 設計師常見問題
                            </tspan>
                        </text>
                    </g>
                    <g
                        id="u"
                        className="touchTitle"
                        onClick={() => {
                            setQa(qa3);
                            setQaSection((pre) => {
                                (Object.keys(pre) as Array<QaFilterkey>).map((key) => {
                                    if (key === 'frontend') {
                                        pre[key] = true;
                                    } else {
                                        pre[key] = false;
                                    }
                                });
                                console.log(pre);
                                return { ...pre };
                            });
                        }}
                    >
                        <text className="x" transform="translate(804.1 60.98)">
                            <tspan x="0" y="0">
                                前端工程師常見問題
                            </tspan>
                        </text>
                    </g>
                    <g
                        id="v"
                        className="touchTitle"
                        onClick={() => {
                            setQa(qa4);
                            setQaSection((pre) => {
                                (Object.keys(pre) as Array<QaFilterkey>).forEach((key) => {
                                    if (key === 'team') {
                                        pre[key] = true;
                                    } else {
                                        pre[key] = false;
                                    }
                                });
                                console.log(pre);
                                return { ...pre };
                            });
                        }}
                    >
                        <text className="x" transform="translate(1169.1 60.98)">
                            <tspan x="0" y="0">
                                團體組常見問題
                            </tspan>
                        </text>
                    </g>
                </svg>
            </div>
            <div className="footer">Copyright © 2022 HexSchool.All rights reserved.</div>
        </div>
    );
}
