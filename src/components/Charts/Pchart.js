import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function Pchart ({nutrient}){
    // console.log(nutrient);

    let carb = nutrient.carb;
    let protein = nutrient.protein;
    let fat = nutrient.fat;

    const nutrientData = [
        { name: '탄수화물', value: carb},
        { name: '단백질', value: protein},
        { name: '지방', value: fat},
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
//영양섭취비율을 나타내는 차트
        return(
        <>  
        {nutrient ?
            (
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={300} height={300}>
                    <Pie
                        data={nutrientData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                    {nutrientData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            )
        :
        <p>데이터부족</p>
        }
            
            
        </>
        )
}
    //주간 섭취 칼로리 통계 그래프
   
export default Pchart;

