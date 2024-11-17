import React from "react";
import classes from "./chart.module.css";
import menu from "../../../assets/Vector.svg";
import bg from '../../../assets/Vector.png'
import { Budge, Column } from "../../../shared";


type Props = {};

const chart1 = [66, 100, 31];
const chart2 = [60, 80, 31];
const chart3 = [66, 83, 31];

const normative = 150

export const Chart = (props: Props) => {
    const allCharts = [chart1, chart2, chart3];

    // Считаем общие суммы значений для каждого столбца
    const totals = allCharts.map((chart) =>
        chart.reduce((sum, value) => sum + value, 0)
    );

    // Максимальное значение среди всех столбцов
    const maxValue = Math.max(...totals);

    // Рассчитываем высоты столбцов в процентах относительно максимального значения
    const chartHeights = totals.map((total) => (total / maxValue) * 100);

    return (
        <div className={classes.wrapper}>
            <header className={classes.header}>
                <div className={classes.title}>Количество пройденных тестов “OS Doors”</div>
                <img src={menu} alt="menu" className={classes.menu} />
            </header>


            <Budge firstNumber={30} secondNumber={-26}/>

            <div className={classes.charts}>


                {allCharts.map((chart, index) => {
                    // Рассчитываем высоту каждой секции столбца
                    const percentages = chart.map((value) => (value / totals[index]) * 100);

                    return (
                      <Column chart={chart} chartHeights={chartHeights} index={index} name="dev" percentages={percentages}/> 
                    );
                })}

                {/* Норматив */}
                <div>
                    <div className={classes.normative} style={{ height: `calc(${(normative / maxValue) * 100} / 100 * 300px)` }}>

                        <div className={classes.normative_bar} >
                            <img className={classes.normalBg} src={bg} alt="line" />
                            <span className={classes.normative_text}>150</span>
                        </div>
                    </div>
                    <p style={{ textAlign: 'center', padding: '1rem 0', fontWeight: 500, color: '#898290' }}>dev</p>
                </div>


            </div>

            <div className={classes.list}>
                <div className={classes.item}>
                    <div className={classes.color} style={{backgroundColor: '#4AB6E8'}}/>
                    <p>Клиентская часть</p>
                </div>
                <div className={classes.item} >
                    <div className={classes.color} style={{backgroundColor: '#AA6FAC'}}/>
                    <p>Серверная часть</p>
                </div>
                <div className={classes.item}>
                    <div className={classes.color} style={{backgroundColor: '#E85498'}}/>
                    <p>База данных</p>
                </div>
            </div>
        </div >


    );
};
