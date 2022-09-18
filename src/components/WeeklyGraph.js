import {LineChart,Line, Legend, Tooltip, YAxis, XAxis, CartesianGrid,ResponsiveContainer } from 'recharts';
import React, { PureComponent, useEffect } from 'react';

function WeeklyGraph({week}){
    let dateArray = [];
    let kcalArray = [];
    if(week!==null){
        for(let i = 0; i<week.length; i++) {
            dateArray.push(week[i].date);
            kcalArray.push(week[i].totalCal);
        }
    }

    dateArray = dateArray.reverse();
    kcalArray = kcalArray.reverse();

    let weekData = [];
    for(let i = 0; i<dateArray.length; i++){
        weekData.push({name: dateArray[i], "총 섭취 칼로리": kcalArray[i]});
    }

    return (
        <div>
            {week ?
            (
                <ResponsiveContainer width="100%" height="60%">
                        <LineChart width={300} height={1000} data={weekData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="총 섭취 칼로리" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
            )
            :
            <p>식단 분석에 필요한 데이터가 부족합니다.</p>
            }
        </div>
        
    )

}

export default WeeklyGraph;
