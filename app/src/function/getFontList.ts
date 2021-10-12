import { createInvisibleDOM, removeDOM } from "./createInvisibleDOM"
import { ZerWidth_WoffBase64 } from "./ZeroWidthFont"


const installZeroWidthFontIfNeed = function (): boolean {
    if (!document.getElementById("ZeroWidthFont-install")) {
        const dom = document.createElement("style");
        dom.innerHTML = `@font-face {
    font-family: 'ZeroWidth';      
    src: url(${ZerWidth_WoffBase64}) format('woff');
}
.font-test-span{
    font-size: 64px;
    font-weight: 400;
}`
        document.head.appendChild(dom);
        return true
    }
    return false
}

export async function getFontList() {
    const element = createInvisibleDOM()
    installZeroWidthFontIfNeed()

    element.innerHTML = ""
    let waitingCheckDomList: HTMLSpanElement[] = []
    let outterDiv = document.createElement("div");

    for (let fontInfo of frontList) {
        const fontCSSName = fontInfo.en_name
        let newDiv = document.createElement("span");
        newDiv.style.fontFamily = `"${fontCSSName}", "ZeroWidth"`
        newDiv.className = "font-test-span"
        newDiv.innerHTML = "A"
        newDiv.setAttribute("en_name", fontInfo.en_name)
        newDiv.setAttribute("cn_name", fontInfo.cn_name)
        outterDiv.appendChild(newDiv);
        waitingCheckDomList.push(newDiv)
    }

    element.appendChild(outterDiv);
    const installedFontEnNameList: Set<{
        en_name: string
        cn_name: string
    }> = new Set()

    await document.fonts.ready
    for (let dom of waitingCheckDomList) {
        if (dom.offsetWidth > 5) {
            installedFontEnNameList.add({
                en_name: dom.getAttribute("en_name") || "null??",
                cn_name: dom.getAttribute("cn_name") || "null??"
            })
        }
    }
    removeDOM(element)
    return [...installedFontEnNameList]
}



const frontList = [
    {
        "cn_name": "Zhiyong Elegant",
        "en_name": "Zhiyong Elegant"
    },
    {
        "cn_name": "ZhiyongWrite",
        "en_name": "ZhiyongWrite"
    },
    {
        "cn_name": "汉仪贤二体",
        "en_name": "XianErTi"
    },
    {
        "cn_name": "等线",
        "en_name": "等线"
    },
    {
        "cn_name": "濑户字体",
        "en_name": "SetoFont"
    },
    {
        "cn_name": "隶书",
        "en_name": "LiSu"
    },
    {
        "cn_name": "沐瑶软笔手写体",
        "en_name": "Muyao-Softbrush"
    },
    {
        "cn_name": "庞门正道标题体",
        "en_name": "PangMenZhengDao"
    },
    {
        "cn_name": "锐字真言体",
        "en_name": "ZhenyanGB"
    },
    {
        "cn_name": "手书体",
        "en_name": "ShouShuti"
    },
    {
        "cn_name": "思源黑体",
        "en_name": "Source Han Sans CN"
    },
    {
        "cn_name": "思源柔黑体",
        "en_name": "Gen Jyuu Gothic"
    },
    {
        "cn_name": "思源宋体",
        "en_name": "Source Han Serif CN"
    },
    {
        "cn_name": "思源真黑体",
        "en_name": "Gen Shin Gothic"
    },
    {
        "cn_name": "杨任东竹石体",
        "en_name": "YRDZST"
    },
    {
        "cn_name": "幼圆",
        "en_name": "YouYuan"
    },
    {
        "cn_name": "源流明体",
        "en_name": "GenRynMin TW"
    },
    {
        "cn_name": "源漾明体",
        "en_name": "GenYoMin TW"
    },
    {
        "cn_name": "源云明体",
        "en_name": "GenWanMin TW"
    },
    {
        "cn_name": "站酷高端黑",
        "en_name": "huxiaobo-gdh"
    },
    {
        "cn_name": "站酷酷黑",
        "en_name": "HuXiaoBo-KuHei"
    },
    {
        "cn_name": "站酷快乐体",
        "en_name": "HappyZcool"
    },
    {
        "cn_name": "站酷快乐体新版",
        "en_name": "HappyZcool-2016"
    },
    {
        "cn_name": "站酷庆科黄油体",
        "en_name": "zcoolqingkehuangyouti"
    },
    {
        "cn_name": "站酷文艺体",
        "en_name": "zcoolwenyiti"
    },
    {
        "cn_name": "站酷小薇logo体",
        "en_name": "xiaowei"
    },
    {
        "cn_name": "装甲明朝体",
        "en_name": "SoukouMincho"
    },
    {
        "cn_name": "Abril",
        "en_name": "Abril"
    },
    {
        "cn_name": "Abril Titling",
        "en_name": "Abril Titling"
    },
    {
        "cn_name": "Adelle",
        "en_name": "Adelle"
    },
    {
        "cn_name": "Adelle Sans",
        "en_name": "Adelle Sans"
    },
    {
        "cn_name": "Adelle Sans DEV",
        "en_name": "Adelle Sans"
    },
    {
        "cn_name": "Adobe Gothic Std B",
        "en_name": "Adobe Gothic Std B"
    },
    {
        "cn_name": "Adobe Myungjo Std M",
        "en_name": "Adobe Myungjo Std M"
    },
    {
        "cn_name": "Alize",
        "en_name": "Alize"
    },
    {
        "cn_name": "Athelas",
        "en_name": "Athelas"
    },
    {
        "cn_name": "AwanZaman",
        "en_name": "AwanZaman"
    },
    {
        "cn_name": "Bely",
        "en_name": "BELY"
    },
    {
        "cn_name": "Bree",
        "en_name": "Bree"
    },
    {
        "cn_name": "Bree Serif",
        "en_name": "Bree Serif"
    },
    {
        "cn_name": "Capitolium2",
        "en_name": "Capitolium2"
    },
    {
        "cn_name": "Century Gothic",
        "en_name": "Century Gothic"
    },
    {
        "cn_name": "Cora",
        "en_name": "Cora"
    },
    {
        "cn_name": "Coranto 2",
        "en_name": "Coranto 2"
    },
    {
        "cn_name": "Crete",
        "en_name": "Crete"
    },
    {
        "cn_name": "Ebony",
        "en_name": "Ebony"
    },
    {
        "cn_name": "Edita",
        "en_name": "Edita"
    },
    {
        "cn_name": "Eskapade",
        "en_name": "Eskapade"
    },
    {
        "cn_name": "Essay",
        "en_name": "Essay Text"
    },
    {
        "cn_name": "Fino",
        "en_name": "FINO"
    },
    {
        "cn_name": "Fino Stencil",
        "en_name": "FINO STENCIL"
    },
    {
        "cn_name": "Garalda",
        "en_name": "Garalda"
    },
    {
        "cn_name": "Givry",
        "en_name": "Givry"
    },
    {
        "cn_name": "Helvetica",
        "en_name": "Helvetica"
    },
    {
        "cn_name": "Iro Sans",
        "en_name": "IRO SANS"
    },
    {
        "cn_name": "Iskra",
        "en_name": "Iskra"
    },
    {
        "cn_name": "Karmina",
        "en_name": "Karmina"
    },
    {
        "cn_name": "Karmina Sans",
        "en_name": "Karmina Sans"
    },
    {
        "cn_name": "LFT Etica",
        "en_name": "LFT Etica"
    },
    {
        "cn_name": "Lipa Agate",
        "en_name": "Lipa Agate"
    },
    {
        "cn_name": "Lisbeth",
        "en_name": "Lisbeth"
    },
    {
        "cn_name": "Maiola",
        "en_name": "Maiola"
    },
    {
        "cn_name": "Marco",
        "en_name": "Marco"
    },
    {
        "cn_name": "Noam",
        "en_name": "NOAM"
    },
    {
        "cn_name": "Noort",
        "en_name": "NOORT"
    },
    {
        "cn_name": "Pollen",
        "en_name": "Pollen"
    },
    {
        "cn_name": "Protipo",
        "en_name": "PROTIPO"
    },
    {
        "cn_name": "Ronnia",
        "en_name": "Ronnia"
    },
    {
        "cn_name": "Sanserata",
        "en_name": "Sanserata"
    },
    {
        "cn_name": "Serifa?",
        "en_name": "Serifa"
    },
    {
        "cn_name": "Serpentine?",
        "en_name": "Serpentine"
    },
    {
        "cn_name": "Sirba",
        "en_name": "Sirba"
    },
    {
        "cn_name": "Soleil",
        "en_name": "Soleil"
    },
    {
        "cn_name": "Tablet Gothic",
        "en_name": "Tablet Gothic"
    },
    {
        "cn_name": "冬青黑体简",
        "en_name": "Hiragino Sans GB"
    },
    {
        "cn_name": "方正报宋简体",
        "en_name": "FZBaoSong-Z04S"
    },
    {
        "cn_name": "方正本墨绪圆体",
        "en_name": "FZBMXY JW"
    },
    {
        "cn_name": "方正兵马俑体",
        "en_name": "FZBingMaYongTiS"
    },
    {
        "cn_name": "方正博雅宋简体",
        "en_name": "FZBoYaSongS-GB"
    },
    {
        "cn_name": "方正彩云简体",
        "en_name": "FZCaiYun-M09S"
    },
    {
        "cn_name": "方正藏意汉体简体",
        "en_name": "FZZangYiHanTiS-R-GB"
    },
    {
        "cn_name": "方正超粗黑简体",
        "en_name": "FZChaoCuHei-M10S"
    },
    {
        "cn_name": "方正超重要体",
        "en_name": "FzCHAOZYTJW"
    },
    {
        "cn_name": "方正粗活意简体",
        "en_name": "FZCuHuoYi-M25S"
    },
    {
        "cn_name": "方正粗倩简体",
        "en_name": "FZCuQian-M17S"
    },
    {
        "cn_name": "方正粗宋简体",
        "en_name": "FZCuSong-B09S"
    },
    {
        "cn_name": "方正粗谭黑简体",
        "en_name": "FZTanHeiS-B-GB"
    },
    {
        "cn_name": "方正粗雅宋简体",
        "en_name": "FZYaSongS-B-GB"
    },
    {
        "cn_name": "方正粗圆简体",
        "en_name": "FZCuYuan-M03S"
    },
    {
        "cn_name": "方正大标宋简体",
        "en_name": "FZDaBiaoSong-B06S"
    },
    {
        "cn_name": "方正大黑简体",
        "en_name": "FZDaHei-B02S"
    },
    {
        "cn_name": "方正大魏体简体",
        "en_name": "FZDaWeiTiS-R-GB"
    },
    {
        "cn_name": "方正邓黑隶",
        "en_name": "FZDengHLJ"
    },
    {
        "cn_name": "方正方俊黑",
        "en_name": "FZFangJunHeiS"
    },
    {
        "cn_name": "方正仿宋简体",
        "en_name": "FZFangSong-Z02S"
    },
    {
        "cn_name": "方正飞跃体",
        "en_name": "FZFeiYueTiS"
    },
    {
        "cn_name": "方正复古粗宋",
        "en_name": "FOUNDERTYPE"
    },
    {
        "cn_name": "方正古隶简体",
        "en_name": "FZGuLi-S12S"
    },
    {
        "cn_name": "方正管峻楷书",
        "en_name": "FZGUANJUNKAISHUS"
    },
    {
        "cn_name": "方正汉真广标简体",
        "en_name": "FZHanZhenGuangBiaoS-GB"
    },
    {
        "cn_name": "方正行楷简体",
        "en_name": "FZXingKai-S04S"
    },
    {
        "cn_name": "方正黑体简体",
        "en_name": "FZHei-B01S"
    },
    {
        "cn_name": "方正琥珀简体",
        "en_name": "FZHuPo-M04S"
    },
    {
        "cn_name": "方正华隶简体",
        "en_name": "FZHuaLi-M14S"
    },
    {
        "cn_name": "方正黄草简体",
        "en_name": "FZHuangCao-S09S"
    },
    {
        "cn_name": "方正活龙体",
        "en_name": "FZHuoLTJ"
    },
    {
        "cn_name": "方正记忆的碎片体",
        "en_name": "FZJiYiDeSuiPianTiS"
    },
    {
        "cn_name": "方正剪纸简体",
        "en_name": "FZJianZhi-M23S"
    },
    {
        "cn_name": "方正静蕾简体",
        "en_name": "FZJingLeiS-R-GB"
    },
    {
        "cn_name": "方正卡通简体",
        "en_name": "FZKaTong-M19S"
    },
    {
        "cn_name": "方正楷体简体",
        "en_name": "FZKai-Z03S"
    },
    {
        "cn_name": "方正康体简体",
        "en_name": "FZKangTi-S07S"
    },
    {
        "cn_name": "方正克书皇榜体",
        "en_name": "FZKeShuHuangBang"
    },
    {
        "cn_name": "方正兰亭超细黑简体",
        "en_name": "FZLanTingHeiS-UL-GB"
    },
    {
        "cn_name": "方正兰亭粗黑简体",
        "en_name": "FZLTCHJW"
    },
    {
        "cn_name": "方正兰亭黑简体",
        "en_name": "FZLanTingHeiS-R-GB"
    },
    {
        "cn_name": "方正兰亭特黑简体",
        "en_name": "FZLanTingHeiS-H-GB"
    },
    {
        "cn_name": "方正兰亭细黑_GBK",
        "en_name": "FZLanTingHei-L-GBK"
    },
    {
        "cn_name": "方正兰亭细黑_GBK-M",
        "en_name": "FZLanTingHei-L-GBK-M"
    },
    {
        "cn_name": "方正兰亭纤黑繁体",
        "en_name": "FZLanTingHeiT-EL-GB"
    },
    {
        "cn_name": "方正兰亭纤黑简体",
        "en_name": "FZLanTingHeiS-EL-GB"
    },
    {
        "cn_name": "方正兰亭圆简体",
        "en_name": "FZLanTingYuanS-R-GB"
    },
    {
        "cn_name": "方正兰亭圆简体_纤",
        "en_name": "FZLanTingYuanS-EL-GB"
    },
    {
        "cn_name": "方正隶变简体",
        "en_name": "FZLiBian-S02S"
    },
    {
        "cn_name": "方正隶二简体",
        "en_name": "FZLiShu II-S06S"
    },
    {
        "cn_name": "方正隶书简体",
        "en_name": "FZLiShu-S01S"
    },
    {
        "cn_name": "方正流行体简体",
        "en_name": "FZLiuXingTi-M26S"
    },
    {
        "cn_name": "方正美黑简体",
        "en_name": "FZMeiHei-M07S"
    },
    {
        "cn_name": "方正萌软体",
        "en_name": "FZMengRuanTiS"
    },
    {
        "cn_name": "方正萌艺体",
        "en_name": "FZMengYiTiS"
    },
    {
        "cn_name": "方正喵呜简体",
        "en_name": "FZMiaoWuS-R-GB"
    },
    {
        "cn_name": "方正喵呜体",
        "en_name": "FZMiaoWuS-R-GB"
    },
    {
        "cn_name": "方正胖头鱼简体",
        "en_name": "FZPangTouYu-M24S"
    },
    {
        "cn_name": "方正胖娃简体",
        "en_name": "FZPangWa-M18S"
    },
    {
        "cn_name": "方正品尚粗黑简体",
        "en_name": "FZPinShangHeiS-B-GB"
    },
    {
        "cn_name": "方正品尚黑简体",
        "en_name": "FZPinShangHeiS-R-GB"
    },
    {
        "cn_name": "方正平和简体",
        "en_name": "FZPingHe-S11S"
    },
    {
        "cn_name": "方正奇妙体",
        "en_name": "FZQiMTJ"
    },
    {
        "cn_name": "方正启笛简体",
        "en_name": "FZQiDiS-R-GB"
    },
    {
        "cn_name": "方正启体简体",
        "en_name": "FZQiTi-S14S"
    },
    {
        "cn_name": "方正清仿宋系列",
        "en_name": "FZQingFangSongS"
    },
    {
        "cn_name": "方正晴朗体",
        "en_name": "FZQINGLANGTIS"
    },
    {
        "cn_name": "方正趣黑",
        "en_name": "FZQuHJW"
    },
    {
        "cn_name": "方正锐正圆",
        "en_name": "FZRuiZhengYuanS"
    },
    {
        "cn_name": "方正尚酷简体",
        "en_name": "FZShangKuS-R-GB"
    },
    {
        "cn_name": "方正尚艺体",
        "en_name": "FZShangYiTiS"
    },
    {
        "cn_name": "方正少儿简体",
        "en_name": "FZShaoEr-M11S"
    },
    {
        "cn_name": "方正瘦金书简体",
        "en_name": "FZShouJinShu-S10S"
    },
    {
        "cn_name": "方正书宋",
        "en_name": "FZSS"
    },
    {
        "cn_name": "方正书宋简体",
        "en_name": "FZShuSong-Z01S"
    },
    {
        "cn_name": "方正舒体",
        "en_name": "FZShuTi"
    },
    {
        "cn_name": "方正舒体简体",
        "en_name": "FZShuTi-S05S"
    },
    {
        "cn_name": "方正水黑简体",
        "en_name": "FZShuiHei-M21S"
    },
    {
        "cn_name": "方正水云简体",
        "en_name": "FZShuiYunS-EB-GB"
    },
    {
        "cn_name": "方正水柱简体",
        "en_name": "FZShuiZhu-M08S"
    },
    {
        "cn_name": "方正宋黑简体",
        "en_name": "FZSongHei-B07S"
    },
    {
        "cn_name": "方正宋三简体",
        "en_name": "FZSong"
    },
    {
        "cn_name": "方正宋一简体",
        "en_name": "FZSongYi-Z13S"
    },
    {
        "cn_name": "方正苏新诗小爨",
        "en_name": "FZSuXinShiXiaoCuanS"
    },
    {
        "cn_name": "方正孙拥声简体",
        "en_name": "FZSunYongShengS-R-GB"
    },
    {
        "cn_name": "方正淘乐简体",
        "en_name": "FZTLJW"
    },
    {
        "cn_name": "方正玩伴体系列",
        "en_name": "FZWanBTJ"
    },
    {
        "cn_name": "方正魏碑简体",
        "en_name": "FZWeiBei-S03S"
    },
    {
        "cn_name": "方正细等线简体",
        "en_name": "FZXiDengXian-Z06S"
    },
    {
        "cn_name": "方正细黑一简体",
        "en_name": "FZXiHei I-Z08S"
    },
    {
        "cn_name": "方正细倩简体",
        "en_name": "FZXiQian-M15S"
    },
    {
        "cn_name": "方正细珊瑚简体",
        "en_name": "FZXiShanHu-M13S"
    },
    {
        "cn_name": "方正细圆简体",
        "en_name": "FZXiYuan-M01S"
    },
    {
        "cn_name": "方正仙阵体",
        "en_name": "FZXianZhenTiS"
    },
    {
        "cn_name": "方正祥隶简体",
        "en_name": "FZXiangLi-S17S"
    },
    {
        "cn_name": "方正小标宋简体",
        "en_name": "FZXiaoBiaoSong-B05S"
    },
    {
        "cn_name": "方正小篆体",
        "en_name": "FZXiaoZhuanTi-S13T"
    },
    {
        "cn_name": "方正新报宋简体",
        "en_name": "FZNew BaoSong-Z12S"
    },
    {
        "cn_name": "方正新舒体简体",
        "en_name": "FZNew ShuTi-S08S"
    },
    {
        "cn_name": "方正秀麗",
        "en_name": "FZXiuLiB-Z13"
    },
    {
        "cn_name": "方正雅士黑",
        "en_name": "FZYaShiHeiS"
    },
    {
        "cn_name": "方正颜宋简体_粗",
        "en_name": "FZYanSongS-B-GB"
    },
    {
        "cn_name": "方正姚体",
        "en_name": "FZYaoti"
    },
    {
        "cn_name": "方正姚体简体",
        "en_name": "FZYaoTi-M06S"
    },
    {
        "cn_name": "方正艺黑简体",
        "en_name": "FZYiHei-M20S"
    },
    {
        "cn_name": "方正硬笔行书简体",
        "en_name": "FZYingBiXingShu-S16S"
    },
    {
        "cn_name": "方正硬笔楷书简体",
        "en_name": "FZYingBiKaiShu-S15S"
    },
    {
        "cn_name": "方正悠宋简可变",
        "en_name": "FZYouSJ VF WT"
    },
    {
        "cn_name": "方正幼线简体",
        "en_name": "FZYouXian-Z09S"
    },
    {
        "cn_name": "方正韵动特黑简体",
        "en_name": "FZYunDongHeiS-H-GB"
    },
    {
        "cn_name": "方正赞美体",
        "en_name": "FZZANMTJ"
    },
    {
        "cn_name": "方正毡笔黑简体",
        "en_name": "FZZhanBiHei-M22S"
    },
    {
        "cn_name": "方正正粗黑简体",
        "en_name": "FZZhengHeiS-B-GB"
    },
    {
        "cn_name": "方正正大黑简体",
        "en_name": "FZZhengHeiS-EB-GB"
    },
    {
        "cn_name": "方正正纤黑简体",
        "en_name": "FZZhengHeiS-EL-GB"
    },
    {
        "cn_name": "方正正准黑简体",
        "en_name": "FZZhengHeiS-M-GB"
    },
    {
        "cn_name": "方正稚艺简体",
        "en_name": "FZZhiYi-M12S"
    },
    {
        "cn_name": "方正中等线简体",
        "en_name": "FZZhongDengXian-Z07S"
    },
    {
        "cn_name": "方正中倩简体",
        "en_name": "FZZhongQian-M16S"
    },
    {
        "cn_name": "方正准圆简体",
        "en_name": "FZZhunYuan-M02S"
    },
    {
        "cn_name": "方正字迹-曾柏求排笔",
        "en_name": "FZZJ-ZBQPBJW"
    },
    {
        "cn_name": "方正字迹-陈光池楷书",
        "en_name": "FZZJ-CGCKSJW"
    },
    {
        "cn_name": "方正字迹-顾建平楷书",
        "en_name": "FZZJ-GJPKSJW"
    },
    {
        "cn_name": "方正字迹-顾建平隶书",
        "en_name": "FZZJ-GJPLSJF"
    },
    {
        "cn_name": "方正字迹-顧建平篆書",
        "en_name": "FZZJ-GJPZSFU"
    },
    {
        "cn_name": "方正字迹-豪放行书简体",
        "en_name": "FZZJ-HFXSJW"
    },
    {
        "cn_name": "方正字迹-李凤武行书",
        "en_name": "FZZJ-LFWXSJW"
    },
    {
        "cn_name": "方正字迹-刘宏楷书",
        "en_name": "FZZJ-LHKSJW"
    },
    {
        "cn_name": "方正字迹-刘毅硬笔行书",
        "en_name": "FZZJ-LYYBXSJW"
    },
    {
        "cn_name": "方正字迹-刘毅硬笔楷书",
        "en_name": "FZZJ-LYYBKSJW"
    },
    {
        "cn_name": "方正字迹-柳正枢行楷",
        "en_name": "FZZJ-LZSXKJW"
    },
    {
        "cn_name": "方正字迹-清代碑体",
        "en_name": "FZZJ-QDBTJW"
    },
    {
        "cn_name": "方正字迹-陶建华魏碑",
        "en_name": "FZZJ-TJHWBJW"
    },
    {
        "cn_name": "方正字迹-童体硬笔字体",
        "en_name": "FZZJ-TTYBFONT"
    },
    {
        "cn_name": "方正字迹-吴进行书",
        "en_name": "FZZJ-WJXSJW"
    },
    {
        "cn_name": "方正字迹-严祖喜行楷",
        "en_name": "FZZJ-YZXXKJW"
    },
    {
        "cn_name": "方正字迹-颜振东楷",
        "en_name": "FZZJ-YZDKJW"
    },
    {
        "cn_name": "方正字迹-叶根友特楷",
        "en_name": "YEGENYOUTEKAI"
    },
    {
        "cn_name": "方正字迹-张二魁硬楷",
        "en_name": "FZZJ-ZEKYKJW"
    },
    {
        "cn_name": "方正字迹-张亮硬笔行书",
        "en_name": "FZZJ-ZLYBXSJW"
    },
    {
        "cn_name": "方正字迹-长江行书",
        "en_name": "FZZJ-CJXSJW"
    },
    {
        "cn_name": "方正字迹-周密行楷",
        "en_name": "FZZJ-ZMXKJW"
    },
    {
        "cn_name": "方正字迹-禚效锋行草",
        "en_name": "FZZJ-ZXFXCJW"
    },
    {
        "cn_name": "方正字迹-自强魏楷体",
        "en_name": "FZZJ-ZQWKJW"
    },
    {
        "cn_name": "方正综艺简体",
        "en_name": "FZZongYi-M05S"
    },
    {
        "cn_name": "仿宋",
        "en_name": "FangSong"
    },
    {
        "cn_name": "汉仪PP体简",
        "en_name": "HYPPTiJ"
    },
    {
        "cn_name": "汉仪程行简",
        "en_name": "HYChengXingJ"
    },
    {
        "cn_name": "汉仪大黑简",
        "en_name": "HYDaHeiJ"
    },
    {
        "cn_name": "汉仪大宋简",
        "en_name": "HYDaSongJ"
    },
    {
        "cn_name": "汉仪蝶语简体",
        "en_name": "HYDieYuJ"
    },
    {
        "cn_name": "汉仪方叠体检",
        "en_name": "HYFangDieJ"
    },
    {
        "cn_name": "汉仪仿宋简",
        "en_name": "HYFangSongJ"
    },
    {
        "cn_name": "汉仪刚艺体",
        "en_name": "HYGangYiTi"
    },
    {
        "cn_name": "汉仪行楷简",
        "en_name": "HYXingKaiJ"
    },
    {
        "cn_name": "汉仪黑荔枝",
        "en_name": "HYHeiLiZhiTiJ"
    },
    {
        "cn_name": "汉仪家书简",
        "en_name": "HYJiaShuJ"
    },
    {
        "cn_name": "汉仪楷体",
        "en_name": "HYKaiti"
    },
    {
        "cn_name": "汉仪楷体简",
        "en_name": "HYKaiTiJ"
    },
    {
        "cn_name": "汉仪乐喵体简",
        "en_name": "HYLeMiaoTi"
    },
    {
        "cn_name": "汉仪立黑简",
        "en_name": "HYLiHeiJ"
    },
    {
        "cn_name": "汉仪菱心体简",
        "en_name": "HYLingXinJ"
    },
    {
        "cn_name": "汉仪漫步体间",
        "en_name": "HYManBuJ"
    },
    {
        "cn_name": "汉仪旗黑",
        "en_name": "HYQihei 40S"
    },
    {
        "cn_name": "汉仪旗黑",
        "en_name": "HYQihei 50S"
    },
    {
        "cn_name": "汉仪旗黑",
        "en_name": "HYQihei 60S"
    },
    {
        "cn_name": "汉仪尚巍手书W",
        "en_name": "HYShangWeiShouShuW"
    },
    {
        "cn_name": "汉仪书魂体检",
        "en_name": "HYShuHunJ"
    },
    {
        "cn_name": "汉仪娃娃纂简",
        "en_name": "HYWaWaZhuanJ"
    },
    {
        "cn_name": "汉仪小麦体",
        "en_name": "HYXiaoMaiTiJ"
    },
    {
        "cn_name": "汉仪醒示体简",
        "en_name": "HYXingShiJ"
    },
    {
        "cn_name": "汉仪秀英体简",
        "en_name": "HYXiuYingJ"
    },
    {
        "cn_name": "汉仪雪峰体简",
        "en_name": "HYXueFengJ"
    },
    {
        "cn_name": "汉仪雪君体简",
        "en_name": "HYXueJunJ"
    },
    {
        "cn_name": "汉仪丫丫体简",
        "en_name": "HYYaYaJ"
    },
    {
        "cn_name": "汉仪雅酷黑W",
        "en_name": "HYYaKuHeiW"
    },
    {
        "cn_name": "汉仪长美黑简",
        "en_name": "HYChangMeiHeiJ"
    },
    {
        "cn_name": "汉仪中等线简",
        "en_name": "HYZhongDengXianJ"
    },
    {
        "cn_name": "汉仪中黑简",
        "en_name": "HYZhongHeiJ"
    },
    {
        "cn_name": "汉仪中隶书简",
        "en_name": "HYZhongLiShuJ"
    },
    {
        "cn_name": "汉仪中宋简",
        "en_name": "HYZhongSongJ"
    },
    {
        "cn_name": "汉仪综艺体简",
        "en_name": "HYZongYiJ"
    },
    {
        "cn_name": "黑体",
        "en_name": "SimHei"
    },
    {
        "cn_name": "华康翩翩体",
        "en_name": "Hanzipen SC"
    },
    {
        "cn_name": "华康手札体",
        "en_name": "Hannotate SC"
    },
    {
        "cn_name": "华文彩云",
        "en_name": "STCaiyun"
    },
    {
        "cn_name": "华文仿宋",
        "en_name": "STFangsong"
    },
    {
        "cn_name": "华文行楷",
        "en_name": "STXingkai"
    },
    {
        "cn_name": "华文黑体",
        "en_name": "STHeiti"
    },
    {
        "cn_name": "华文琥珀",
        "en_name": "STHupo"
    },
    {
        "cn_name": "华文楷体",
        "en_name": "STKaiti"
    },
    {
        "cn_name": "华文隶书",
        "en_name": "STLiti"
    },
    {
        "cn_name": "华文宋体",
        "en_name": "STSong"
    },
    {
        "cn_name": "华文细黑",
        "en_name": "STXihei"
    },
    {
        "cn_name": "华文新魏",
        "en_name": "STXinwei"
    },
    {
        "cn_name": "华文中宋",
        "en_name": "STZhongsong"
    },
    {
        "cn_name": "楷体",
        "en_name": "KaiTi"
    },
    {
        "cn_name": "兰亭黑-简",
        "en_name": "Lantinghei SC"
    },
    {
        "cn_name": "苹方",
        "en_name": "PingFang SC"
    },
    {
        "cn_name": "宋体",
        "en_name": "SimSun"
    },
    {
        "cn_name": "微软雅黑",
        "en_name": "Microsoft Yahei"
    },
    {
        "cn_name": "微软正黑体",
        "en_name": "Microsoft JhengHei"
    },
    {
        "cn_name": "小美体",
        "en_name": "XIAOMEI JW"
    },
    {
        "cn_name": "新宋体",
        "en_name": "NSimSun"
    },
    {
        "cn_name": "造字工房版黑 G0v1",
        "en_name": "RTWS BanHei G0v1"
    },
    {
        "cn_name": "造字工房博黑",
        "en_name": "MF BoHei"
    },
    {
        "cn_name": "造字工房典黑",
        "en_name": "MF DianHei"
    },
    {
        "cn_name": "造字工房鼎黑体",
        "en_name": "MF DingHei"
    },
    {
        "cn_name": "造字工房黄金时代",
        "en_name": "MF TheGoldenEra"
    },
    {
        "cn_name": "造字工房佳黑",
        "en_name": "MF JiaHei"
    },
    {
        "cn_name": "造字工房坚黑",
        "en_name": "MF JianHei"
    },
    {
        "cn_name": "造字工房锦宋体",
        "en_name": "MF JinSong"
    },
    {
        "cn_name": "造字工房劲黑 G0v1",
        "en_name": "RTWS JinHei G0v1"
    },
    {
        "cn_name": "造字工房郎宋 G0v1",
        "en_name": "RTWS LangSong G0v1"
    },
    {
        "cn_name": "造字工房力黑",
        "en_name": "MF LiHei"
    },
    {
        "cn_name": "造字工房力黑体",
        "en_name": "MF LiHei"
    },
    {
        "cn_name": "造字工房凌黑",
        "en_name": "MF LingHei"
    },
    {
        "cn_name": "造字工房明黑",
        "en_name": "MF MingHei"
    },
    {
        "cn_name": "造字工房品宋",
        "en_name": "MF PinSong"
    },
    {
        "cn_name": "造字工房启黑体",
        "en_name": "MF QiHei"
    },
    {
        "cn_name": "造字工房形黑",
        "en_name": "MF XingHei"
    },
    {
        "cn_name": "造字工房形黑体",
        "en_name": "MF XingHei"
    },
    {
        "cn_name": "造字工房雅圆 G0v1",
        "en_name": "RTWS YaYuan G0v1"
    },
    {
        "cn_name": "造字工房元黑体",
        "en_name": "MF YuanHei"
    },
    {
        "cn_name": "造字工房云宋体",
        "en_name": "MF YunSong"
    },
    {
        "cn_name": "造字工房哲黑",
        "en_name": "MF ZheHei"
    },
    {
        "cn_name": "造字工房臻宋体",
        "en_name": "MF ZhenSong"
    },
    {
        "cn_name": "造字工房卓黑体",
        "en_name": "MF ZhuoHei"
    },
    {
        "cn_name": "Tahoma",
        "en_name": "tahoma"
    },
    {
        "cn_name": "行楷-简",
        "en_name": "Xingkai SC"
    },
    {
        "cn_name": "宋体-简",
        "en_name": "Songti SC"
    },
    {
        "cn_name": "娃娃体-简",
        "en_name": "Wawati SC"
    },
    {
        "cn_name": "魏碑-简",
        "en_name": "Weibei SC"
    },
    {
        "cn_name": "雅痞-简",
        "en_name": "Yapi SC"
    },
    {
        "cn_name": "圆体-简",
        "en_name": "Yuanti SC"
    },
    {
        "cn_name": "AR BERKLEY",
        "en_name": "AR BERKLEY"
    },
    {
        "cn_name": "AR BLANCA",
        "en_name": "AR BLANCA"
    },
    {
        "cn_name": "AR BONNIE",
        "en_name": "AR BONNIE"
    },
    {
        "cn_name": "AR CARTER",
        "en_name": "AR CARTER"
    },
    {
        "cn_name": "AR CENA",
        "en_name": "AR CENA"
    },
    {
        "cn_name": "AR CHRISTY",
        "en_name": "AR CHRISTY"
    },
    {
        "cn_name": "AR DARLING",
        "en_name": "AR DARLING"
    },
    {
        "cn_name": "AR DECODE",
        "en_name": "AR DECODE"
    },
    {
        "cn_name": "AR DELANEY",
        "en_name": "AR DELANEY"
    },
    {
        "cn_name": "AR DESTINE",
        "en_name": "AR DESTINE"
    },
    {
        "cn_name": "AR ESSENCE",
        "en_name": "AR ESSENCE"
    },
    {
        "cn_name": "AR HERMANN",
        "en_name": "AR HERMANN"
    },
    {
        "cn_name": "AR JULIAN",
        "en_name": "AR JULIAN"
    },
    {
        "cn_name": "Arial",
        "en_name": "Arial"
    },
    {
        "cn_name": "Arial Black",
        "en_name": "Arial Black"
    },
    {
        "cn_name": "Arial Narrow",
        "en_name": "Arial Narrow"
    },
    {
        "cn_name": "Bahnschrift",
        "en_name": "Bahnschrift"
    },
    {
        "cn_name": "Bahnschrift Condensed",
        "en_name": "Bahnschrift Condensed"
    },
    {
        "cn_name": "Bahnschrift Light",
        "en_name": "Bahnschrift Light"
    },
    {
        "cn_name": "Bahnschrift Light Condensed",
        "en_name": "Bahnschrift Light Condensed"
    },
    {
        "cn_name": "Bahnschrift Light SemiCondensed",
        "en_name": "Bahnschrift Light SemiCondensed"
    },
    {
        "cn_name": "Bahnschrift SemiBold",
        "en_name": "Bahnschrift SemiBold"
    },
    {
        "cn_name": "Bahnschrift SemiBold Condensed",
        "en_name": "Bahnschrift SemiBold Condensed"
    },
    {
        "cn_name": "Bahnschrift SemiCondensed",
        "en_name": "Bahnschrift SemiCondensed"
    },
    {
        "cn_name": "Bahnschrift SemiLight",
        "en_name": "Bahnschrift SemiLight"
    },
    {
        "cn_name": "Bahnschrift SemiLight Condensed",
        "en_name": "Bahnschrift SemiLight Condensed"
    },
    {
        "cn_name": "Book Antiqua",
        "en_name": "Book Antiqua"
    },
    {
        "cn_name": "Bookman Old Style",
        "en_name": "Bookman Old Style"
    },
    {
        "cn_name": "Bookshelf Symbol 7",
        "en_name": "Bookshelf Symbol 7"
    },
    {
        "cn_name": "Bradley Hand ITC",
        "en_name": "Bradley Hand ITC"
    },
    {
        "cn_name": "Calibri",
        "en_name": "Calibri"
    },
    {
        "cn_name": "Calibri Light",
        "en_name": "Calibri Light"
    },
    {
        "cn_name": "Cambria",
        "en_name": "Cambria"
    },
    {
        "cn_name": "Cambria Math",
        "en_name": "Cambria Math"
    },
    {
        "cn_name": "Candara",
        "en_name": "Candara"
    },
    {
        "cn_name": "Candara Light",
        "en_name": "Candara Light"
    },
    {
        "cn_name": "Cascadia Code",
        "en_name": "Cascadia Code"
    },
    {
        "cn_name": "Cascadia Code ExtraLight",
        "en_name": "Cascadia Code ExtraLight"
    },
    {
        "cn_name": "Cascadia Code Light",
        "en_name": "Cascadia Code Light"
    },
    {
        "cn_name": "Cascadia Code PL",
        "en_name": "Cascadia Code PL"
    },
    {
        "cn_name": "Cascadia Code PL ExtraLight",
        "en_name": "Cascadia Code PL ExtraLight"
    },
    {
        "cn_name": "Cascadia Code PL Light",
        "en_name": "Cascadia Code PL Light"
    },
    {
        "cn_name": "Cascadia Code PL SemiBold",
        "en_name": "Cascadia Code PL SemiBold"
    },
    {
        "cn_name": "Cascadia Code PL SemiLight",
        "en_name": "Cascadia Code PL SemiLight"
    },
    {
        "cn_name": "Cascadia Code SemiBold",
        "en_name": "Cascadia Code SemiBold"
    },
    {
        "cn_name": "Cascadia Code SemiLight",
        "en_name": "Cascadia Code SemiLight"
    },
    {
        "cn_name": "Cascadia Mono",
        "en_name": "Cascadia Mono"
    },
    {
        "cn_name": "Cascadia Mono ExtraLight",
        "en_name": "Cascadia Mono ExtraLight"
    },
    {
        "cn_name": "Cascadia Mono Light",
        "en_name": "Cascadia Mono Light"
    },
    {
        "cn_name": "Cascadia Mono PL",
        "en_name": "Cascadia Mono PL"
    },
    {
        "cn_name": "Cascadia Mono PL ExtraLight",
        "en_name": "Cascadia Mono PL ExtraLight"
    },
    {
        "cn_name": "Cascadia Mono PL Light",
        "en_name": "Cascadia Mono PL Light"
    },
    {
        "cn_name": "Cascadia Mono PL SemiBold",
        "en_name": "Cascadia Mono PL SemiBold"
    },
    {
        "cn_name": "Cascadia Mono PL SemiLight",
        "en_name": "Cascadia Mono PL SemiLight"
    },
    {
        "cn_name": "Cascadia Mono SemiBold",
        "en_name": "Cascadia Mono SemiBold"
    },
    {
        "cn_name": "Cascadia Mono SemiLight",
        "en_name": "Cascadia Mono SemiLight"
    },
    {
        "cn_name": "Century",
        "en_name": "Century"
    },
    {
        "cn_name": "Comic Sans MS",
        "en_name": "Comic Sans MS"
    },
    {
        "cn_name": "Consolas",
        "en_name": "Consolas"
    },
    {
        "cn_name": "Constantia",
        "en_name": "Constantia"
    },
    {
        "cn_name": "Corbel",
        "en_name": "Corbel"
    },
    {
        "cn_name": "Corbel Light",
        "en_name": "Corbel Light"
    },
    {
        "cn_name": "Courier New",
        "en_name": "Courier New"
    },
    {
        "cn_name": "Dubai",
        "en_name": "Dubai"
    },
    {
        "cn_name": "Dubai Light",
        "en_name": "Dubai Light"
    },
    {
        "cn_name": "Dubai Medium",
        "en_name": "Dubai Medium"
    },
    {
        "cn_name": "Ebrima",
        "en_name": "Ebrima"
    },
    {
        "cn_name": "Fira Code",
        "en_name": "Fira Code"
    },
    {
        "cn_name": "Fira Code Light",
        "en_name": "Fira Code Light"
    },
    {
        "cn_name": "Fira Code Medium",
        "en_name": "Fira Code Medium"
    },
    {
        "cn_name": "Fira Code Retina",
        "en_name": "Fira Code Retina"
    },
    {
        "cn_name": "Franklin Gothic Medium",
        "en_name": "Franklin Gothic Medium"
    },
    {
        "cn_name": "Freestyle Script",
        "en_name": "Freestyle Script"
    },
    {
        "cn_name": "French Script MT",
        "en_name": "French Script MT"
    },
    {
        "cn_name": "Gabriola",
        "en_name": "Gabriola"
    },
    {
        "cn_name": "Gadugi",
        "en_name": "Gadugi"
    },
    {
        "cn_name": "Garamond",
        "en_name": "Garamond"
    },
    {
        "cn_name": "Georgia",
        "en_name": "Georgia"
    },
    {
        "cn_name": "Impact",
        "en_name": "Impact"
    },
    {
        "cn_name": "Ink Free",
        "en_name": "Ink Free"
    },
    {
        "cn_name": "Javanese Text",
        "en_name": "Javanese Text"
    },
    {
        "cn_name": "Juice ITC",
        "en_name": "Juice ITC"
    },
    {
        "cn_name": "Kristen ITC",
        "en_name": "Kristen ITC"
    },
    {
        "cn_name": "Leelawadee",
        "en_name": "Leelawadee"
    },
    {
        "cn_name": "Leelawadee UI",
        "en_name": "Leelawadee UI"
    },
    {
        "cn_name": "Leelawadee UI Semilight",
        "en_name": "Leelawadee UI Semilight"
    },
    {
        "cn_name": "Lucida Console",
        "en_name": "Lucida Console"
    },
    {
        "cn_name": "Lucida Handwriting",
        "en_name": "Lucida Handwriting"
    },
    {
        "cn_name": "Lucida Sans Unicode",
        "en_name": "Lucida Sans Unicode"
    },
    {
        "cn_name": "Malgun Gothic",
        "en_name": "Malgun Gothic"
    },
    {
        "cn_name": "Malgun Gothic Semilight",
        "en_name": "Malgun Gothic Semilight"
    },
    {
        "cn_name": "Manrope",
        "en_name": "Manrope"
    },
    {
        "cn_name": "Manrope ExtraBold",
        "en_name": "Manrope ExtraBold"
    },
    {
        "cn_name": "Manrope ExtraLight",
        "en_name": "Manrope ExtraLight"
    },
    {
        "cn_name": "Manrope Light",
        "en_name": "Manrope Light"
    },
    {
        "cn_name": "Manrope Medium",
        "en_name": "Manrope Medium"
    },
    {
        "cn_name": "Manrope SemiBold",
        "en_name": "Manrope SemiBold"
    },
    {
        "cn_name": "Marlett",
        "en_name": "Marlett"
    },
    {
        "cn_name": "Microsoft Himalaya",
        "en_name": "Microsoft Himalaya"
    },
    {
        "cn_name": "Microsoft JhengHei UI",
        "en_name": "Microsoft JhengHei UI"
    },
    {
        "cn_name": "Microsoft JhengHei UI Light",
        "en_name": "Microsoft JhengHei UI Light"
    },
    {
        "cn_name": "Microsoft New Tai Lue",
        "en_name": "Microsoft New Tai Lue"
    },
    {
        "cn_name": "Microsoft PhagsPa",
        "en_name": "Microsoft PhagsPa"
    },
    {
        "cn_name": "Microsoft Sans Serif",
        "en_name": "Microsoft Sans Serif"
    },
    {
        "cn_name": "Microsoft Tai Le",
        "en_name": "Microsoft Tai Le"
    },
    {
        "cn_name": "Microsoft Uighur",
        "en_name": "Microsoft Uighur"
    },
    {
        "cn_name": "Microsoft YaHei UI",
        "en_name": "Microsoft YaHei UI"
    },
    {
        "cn_name": "Microsoft YaHei UI Light",
        "en_name": "Microsoft YaHei UI Light"
    },
    {
        "cn_name": "Microsoft Yi Baiti",
        "en_name": "Microsoft Yi Baiti"
    },
    {
        "cn_name": "Mistral",
        "en_name": "Mistral"
    },
    {
        "cn_name": "Mongolian Baiti",
        "en_name": "Mongolian Baiti"
    },
    {
        "cn_name": "Monotype Corsiva",
        "en_name": "Monotype Corsiva"
    },
    {
        "cn_name": "Montserrat",
        "en_name": "Montserrat"
    },
    {
        "cn_name": "Montserrat Medium",
        "en_name": "Montserrat Medium"
    },
    {
        "cn_name": "MS Gothic",
        "en_name": "MS Gothic"
    },
    {
        "cn_name": "MS PGothic",
        "en_name": "MS PGothic"
    },
    {
        "cn_name": "MS Reference Sans Serif",
        "en_name": "MS Reference Sans Serif"
    },
    {
        "cn_name": "MS Reference Specialty",
        "en_name": "MS Reference Specialty"
    },
    {
        "cn_name": "MS UI Gothic",
        "en_name": "MS UI Gothic"
    },
    {
        "cn_name": "MT Extra",
        "en_name": "MT Extra"
    },
    {
        "cn_name": "MV Boli",
        "en_name": "MV Boli"
    },
    {
        "cn_name": "Myanmar Text",
        "en_name": "Myanmar Text"
    },
    {
        "cn_name": "Nirmala UI",
        "en_name": "Nirmala UI"
    },
    {
        "cn_name": "Nirmala UI Semilight",
        "en_name": "Nirmala UI Semilight"
    },
    {
        "cn_name": "Palatino Linotype",
        "en_name": "Palatino Linotype"
    },
    {
        "cn_name": "Papyrus",
        "en_name": "Papyrus"
    },
    {
        "cn_name": "Pristina",
        "en_name": "Pristina"
    },
    {
        "cn_name": "r6icons",
        "en_name": "r6icons"
    },
    {
        "cn_name": "Segoe MDL2 Assets",
        "en_name": "Segoe MDL2 Assets"
    },
    {
        "cn_name": "Segoe Print",
        "en_name": "Segoe Print"
    },
    {
        "cn_name": "Segoe Script",
        "en_name": "Segoe Script"
    },
    {
        "cn_name": "Segoe UI",
        "en_name": "Segoe UI"
    },
    {
        "cn_name": "Segoe UI Black",
        "en_name": "Segoe UI Black"
    },
    {
        "cn_name": "Segoe UI Emoji",
        "en_name": "Segoe UI Emoji"
    },
    {
        "cn_name": "Segoe UI Historic",
        "en_name": "Segoe UI Historic"
    },
    {
        "cn_name": "Segoe UI Light",
        "en_name": "Segoe UI Light"
    },
    {
        "cn_name": "Segoe UI Semibold",
        "en_name": "Segoe UI Semibold"
    },
    {
        "cn_name": "Segoe UI Semilight",
        "en_name": "Segoe UI Semilight"
    },
    {
        "cn_name": "Segoe UI Symbol",
        "en_name": "Segoe UI Symbol"
    },
    {
        "cn_name": "SimSun-ExtB",
        "en_name": "SimSun-ExtB"
    },
    {
        "cn_name": "Sitka Banner",
        "en_name": "Sitka Banner"
    },
    {
        "cn_name": "Sitka Display",
        "en_name": "Sitka Display"
    },
    {
        "cn_name": "Sitka Heading",
        "en_name": "Sitka Heading"
    },
    {
        "cn_name": "Sitka Small",
        "en_name": "Sitka Small"
    },
    {
        "cn_name": "Sitka Subheading",
        "en_name": "Sitka Subheading"
    },
    {
        "cn_name": "Sitka Text",
        "en_name": "Sitka Text"
    },
    {
        "cn_name": "Sylfaen",
        "en_name": "Sylfaen"
    },
    {
        "cn_name": "Symbol",
        "en_name": "Symbol"
    },
    {
        "cn_name": "Tahoma",
        "en_name": "Tahoma"
    },
    {
        "cn_name": "TeamViewer14",
        "en_name": "TeamViewer14"
    },
    {
        "cn_name": "Tempus Sans ITC",
        "en_name": "Tempus Sans ITC"
    },
    {
        "cn_name": "Times New Roman",
        "en_name": "Times New Roman"
    },
    {
        "cn_name": "Trebuchet MS",
        "en_name": "Trebuchet MS"
    },
    {
        "cn_name": "Verdana",
        "en_name": "Verdana"
    },
    {
        "cn_name": "Webdings",
        "en_name": "Webdings"
    },
    {
        "cn_name": "Wingdings",
        "en_name": "Wingdings"
    },
    {
        "cn_name": "Wingdings 2",
        "en_name": "Wingdings 2"
    },
    {
        "cn_name": "Wingdings 3",
        "en_name": "Wingdings 3"
    },
    {
        "cn_name": "Yu Gothic",
        "en_name": "Yu Gothic"
    },
    {
        "cn_name": "Yu Gothic Light",
        "en_name": "Yu Gothic Light"
    },
    {
        "cn_name": "Yu Gothic Medium",
        "en_name": "Yu Gothic Medium"
    },
    {
        "cn_name": "Yu Gothic UI",
        "en_name": "Yu Gothic UI"
    },
    {
        "cn_name": "Yu Gothic UI Light",
        "en_name": "Yu Gothic UI Light"
    },
    {
        "cn_name": "Yu Gothic UI Semibold",
        "en_name": "Yu Gothic UI Semibold"
    },
    {
        "cn_name": "Yu Gothic UI Semilight",
        "en_name": "Yu Gothic UI Semilight"
    }
]

export type fontWeight = "bolder" | "bold" | "normal" | "lighter"
export function isSupportFontWeight(fontFamily: string, fontWeight: fontWeight) {
    let defaultFontWeight: fontWeight = "normal"
    if (fontWeight.toLowerCase() === defaultFontWeight.toLowerCase()) {
        return true;
    }

    let defaultLetter = 'a整*';
    let defaultFontSize = 64;

    // 使用该字体绘制的canvas
    let width = 64;
    let height = 64;
    let canvas = document.createElement('canvas')
    let context = canvas.getContext('2d')
    if (!context) { return false }
    canvas.width = width;
    canvas.height = height;


    // 全局一致的绘制设定
    context.textAlign = 'center';
    context.fillStyle = 'black';
    context.textBaseline = 'middle';


    let getFontData = (fontWeight: fontWeight, context: CanvasRenderingContext2D) => {
        context.clearRect(0, 0, width, height);

        // document.fonts.check("bold 16px Arial", "text");

        context.font = `${fontWeight} ${defaultFontSize}px ${fontFamily}`;

        context.fillText(defaultLetter, width / 2, height / 2);
        let data = context.getImageData(0, 0, width, height).data;
        return [].slice.call(data).filter(function (value) {
            return value !== 0;
        });
    };

    return getFontData(defaultFontWeight, context).join('') !== getFontData(fontWeight, context).join('');
};
export type Script = {
    name: string
    testText: string
    sampleText: string
    key: string
}
const scriptList: Script[] = [
    {
        name: "中文 GB2312",
        testText: "刨",
        sampleText: "微软中文软件",
        key: "chinese",
    }, {
        name: "西欧语言",
        testText: "A",
        sampleText: "AaBbYyZz",
        key: "西欧语言",
    }, {
        name: "希伯来语",
        testText: "ת",
        sampleText: "AaBbנסשת",
        key: "希伯来语",
    }, {
        name: "阿拉伯语",
        testText: "ل",
        sampleText: "AaBbابجدهوز",
        key: "阿拉伯语",
    }, {
        name: "希腊语",
        testText: "β",
        sampleText: "AaBbΑαΒβ",
        key: "希腊语",
    }, {
        name: "土耳其语",
        testText: "Ğ",
        sampleText: "AaBbĞğŞş",
        key: "土耳其语",
    }, {
        name: "波罗的语",//这个存在判断失误问题
        testText: "ś",
        sampleText: "AaBbYyZz",
        key: "波罗的语",
    }, {
        name: "中欧字符",
        testText: "Á",
        sampleText: "AaBbÁáÔô",
        key: "中欧字符",
    }, {
        name: "西里尔语",
        testText: "ф",
        sampleText: "AaBbБбФф",
        key: "西里尔语",
    }, {
        name: "越南语",
        testText: "ữ",
        sampleText: "AaBbƯưƠơ",
        key: "越南语",
    }
]
export async function getFontSupportScript(fontFamily: string) {
    const startTime = performance.now()

    const element = createInvisibleDOM()
    installZeroWidthFontIfNeed()

    element.innerHTML = ""
    let waitingCheckDomList: HTMLSpanElement[] = []
    let outterDiv = document.createElement("div");



    for (let script of scriptList) {
        let newDiv = document.createElement("span");
        newDiv.style.fontFamily = `"${fontFamily}", "ZeroWidth"`
        newDiv.className = "font-test-span"
        newDiv.innerHTML = script.testText

        newDiv.setAttribute("script_name", script.name)
        newDiv.setAttribute("script_key", script.key)
        newDiv.setAttribute("script_sampleText", script.sampleText)
        outterDiv.appendChild(newDiv);
        waitingCheckDomList.push(newDiv)
    }

    element.appendChild(outterDiv);
    const supportScript: Set<{
        name: string
        key: string
        sampleText: string
    }> = new Set()

    await document.fonts.ready
    for (let dom of waitingCheckDomList) {
        if (dom.offsetWidth > 5) {
            supportScript.add({
                name: dom.getAttribute("script_name") || "null??",
                key: dom.getAttribute("script_key") || "null??",
                sampleText: dom.getAttribute("script_sampleText") || "null??",
            })
        }
    }
    removeDOM(element)


    console.log("supportScript", fontFamily, supportScript)

    console.log("takes", performance.now() - startTime)
    return [...supportScript]
};