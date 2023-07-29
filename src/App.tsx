import {Button, Empty, FloatButton, Modal, Skeleton, Typography} from "antd";
import {makeAutoObservable} from "mobx";
import {observer, useLocalObservable} from "mobx-react";
import {useSize} from "ahooks";
import {SlidersOutlined} from "@ant-design/icons";
import axios from "axios";
import _, {extend} from "lodash";
import ReactECharts from 'echarts-for-react';
import {createEchartsCandleOption} from "./echarts-candle";
import {EChartsOption} from "echarts";

/**
 * EloHistoryItem 数据示例
 */
const dataItemExample = {
    "id": "86661650",
    "type": "user-matches",
    "attributes": {
        "id": 86661650,
        "current-elo": 1500.0,
        "won-game": false,
        "team": 1,
        "match-id": 43330837,
        "created-at": "2023-05-21T03:29:09.681Z",
        "ranked": true
    }
}

class EloHistoryItem {
    id = 0
    matchId = 0
    currentElo = 0
    wonGame = false
    team = 0
    ranked = false
    createdAt = ""
    type = ""

    constructor(prop: Partial<EloHistoryItem>) {
        _.extend(this, prop)
    }

    get date() {
        return _.first(this.createdAt.split("T"))
    }
}

/**
 * EchartsDataItem示例
 */
const EchartsDataItemExample = [
    "2004-01-02",
    10452.74,
    10409.85,
    10367.41,
    10554.96,
    168890000
]

class EchartsDataItem {
    date = ""
    open = 0
    close = 0
    lowest = 0
    highest = 0
    volume = 0

    constructor(prop: Partial<EchartsDataItem>) {
        _.extend(this, prop)
    }

    toEchartsListData() {
        return [this.date, this.open, this.close, this.lowest, this.highest, this.volume]
    }
}


class AppState {
    open: boolean = false

    loading = false

    constructor() {
        makeAutoObservable(this)
    }

    eloHis: EloHistoryItem[] = []

    async fetch() {
        this.loading = true
        try {
            let pathname = window.location.pathname;
            console.log(pathname)
            let userId = _.last(pathname.split("/"))
            console.log(userId)
            const dataUrl = `https://www.elevenvr.club/accounts/${userId}/elo-history`
            let response = await axios.get(dataUrl);
            console.log(response.data.data)
            let list = response.data.data as any[]
            const eloHis: EloHistoryItem[] = list.map(o => {
                const attributes = o.attributes
                return new EloHistoryItem({
                    id: attributes.id,
                    currentElo: _.get(attributes, "current-elo"),
                    wonGame: _.get(attributes, "won-game"),
                    matchId: _.get(attributes, "match-id"),
                    createdAt: _.get(attributes, "created-at"),
                    team: attributes.team,
                    ranked: attributes.ranked,
                    type: o.type
                })
            })
            console.log(eloHis)
            this.eloHis = eloHis
        } finally {
            this.loading = false
        }
    }

    toEchartsData(): EchartsDataItem[] {
        let originGroups = _.groupBy(this.eloHis, (it) => it.date);
        return _.map(originGroups, (group, key) => new EchartsDataItem({
            date: key,
            open: _.first(group)?.currentElo,
            close: _.last(group)?.currentElo,
            lowest: _.minBy(group, (it) => it.currentElo)?.currentElo,
            highest: _.maxBy(group, (it) => it.currentElo)?.currentElo,
            volume: group.length,
        }))
    }

    toEchartsListData() {
        return this.toEchartsData().map((it) => it.toEchartsListData())
    }

    onCancel = () => {
        this.open = false
        this.eloHis = []
    }
    onOpen = () => {
        this.open = true
        this.fetch()
    }

    getOption():EChartsOption {
        return createEchartsCandleOption(this.toEchartsListData() as any);
    }
}

function AppFn() {
    const state: AppState = useLocalObservable(() => new AppState())
    return (
        <div>
            <FloatButton icon={<SlidersOutlined/>} onClick={state.onOpen}/>
            <Modal
                title="Candlestick - K线图"
                open={state.open}
                destroyOnClose
                footer={false}
                onCancel={state.onCancel}
                width={document.body.clientWidth - 100}
                bodyStyle={{
                }}
            >
                {
                    state.loading ? <Skeleton active/> : (state.eloHis.length == 0 ? <Empty/> :
                        <ReactECharts option={state.getOption()} style={{
                            height:document.body.clientHeight-200
                        }}/>)
                }
            </Modal>
        </div>
    );
}

export const App = observer(AppFn);
