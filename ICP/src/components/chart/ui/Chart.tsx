
import classes from "./chart.module.css";
import menu from "../../../assets/Vector.svg";
import bg from "../../../assets/Vector.png";
import { Budge, Column } from "../../../shared";
import { useEffect, useState } from "react";
import axios from "axios";
import { Empty, Popover, Radio, Space } from "antd";

type Props = {};

type EnvironmentData = {
    back: number;
    db: number;
    front: number;
};

type ServerData = {
    dev: EnvironmentData;
    norm: number;
    prod: EnvironmentData;
    test: EnvironmentData;
    title: string;
};

export const Chart = (props: Props) => {
    const [data, setData] = useState<ServerData[]>([]); // Данные с сервера
    const [selectChart, setSelectChart] = useState(0); // Индекс выбранного графика

    // Загрузка данных с сервера
    useEffect(() => {
        const fetchData = async () => {
            const urls = [
                "https://rcslabs.ru/ttrp1.json",
                "https://rcslabs.ru/ttrp2.json",
                "https://rcslabs.ru/ttrp3.json",
                "https://rcslabs.ru/ttrp4.json",
                "https://rcslabs.ru/ttrp5.json",
            ];

            try {
                const responses = await Promise.all(urls.map((url) => axios.get(url)));
                setData(responses.map((res) => res.data));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Если данные еще не загружены, показываем индикатор загрузки
    if (data.length === 0) return <div>Loading...</div>;

    const selectedData = data[selectChart];
    const allCharts = [selectedData.dev, selectedData.prod, selectedData.test];

    // Суммируем значения для каждого графика
    const totals = allCharts.map((chart) =>
        Object.values(chart).reduce((sum, value) => sum + (isNaN(value) ? 0 : value), 0)
    );

    // Находим максимальное значение для нормализации высот
    const maxValue = Math.max(...totals.filter(value => !isNaN(value)), selectedData.norm);

    // Вычисляем высоты столбцов в процентах
    const chartHeights = totals.map((total) => ((total / maxValue) * 100));

    // Вычисляем разницу между значениями
    const sumDev = Object.values(selectedData.dev).reduce((sum, value) => sum + value, 0);
    const sumProd = Object.values(selectedData.prod).reduce((sum, value) => sum + value, 0);
    const sumTest = Object.values(selectedData.test).reduce((sum, value) => sum + value, 0);

    const diffFirst = sumDev - sumProd;
    const diffSecond = sumProd - sumTest;

    // Находим максимальную высоту столбцов для отображения
    const maxHeight = Math.max(...chartHeights);

    // Получаем ключи для графиков
    const allKeys = Object.keys(selectedData).filter(key => ['dev', 'prod', 'test'].includes(key));

    // Контент для поповера
    const content = (
        <Radio.Group onChange={(e) => setSelectChart(Number(e.target.value))} value={selectChart}>
            <Space direction="vertical">
                {data.map((chart, index) => (
                    <Radio value={index} key={index}>
                        {chart.title}
                    </Radio>
                ))}
            </Space>
        </Radio.Group>
    );

    return (
        <div className={classes.wrapper}>
            {/* Заголовок */}
            <header className={classes.header}>
                <div className={classes.title}>{selectedData.title}</div>
                <Popover content={content} placement="rightTop">
                    <img src={menu} alt="menu" className={classes.menu} />
                </Popover>
            </header>

            {/* Если высота графиков не равна 0, отображаем данные */}
            {maxHeight > 0 ? (
                <>
                    <Budge firstNumber={diffFirst} secondNumber={diffSecond} />

                    {/* Графики */}
                    <div className={classes.charts}>
                        {allCharts.map((chart, index) => {
                            const percentages = Object.values(chart).map((value) => (value / totals[index]) * 100);
                            return (
                                <Column
                                    key={index}
                                    chart={Object.values(chart)}
                                    chartHeights={chartHeights}
                                    index={index}
                                    name={allKeys[index] || ""}
                                    percentages={percentages}
                                />
                            );
                        })}

                        {/* Норматив */}
                        <div>
                            <div
                                className={classes.normative}
                                style={{
                                    height: `${(selectedData.norm / maxValue) * 300}px`,
                                }}
                            >
                                <div className={classes.normative_bar}>
                                    <img className={classes.normalBg} src={bg} alt="line" />
                                    <span className={classes.normative_text}>
                                        {selectedData.norm}
                                    </span>
                                </div>
                            </div>
                            <p
                                style={{
                                    textAlign: "center",
                                    padding: "1rem 0",
                                    fontWeight: 500,
                                    color: "#898290",
                                }}
                            >
                                Норматив
                            </p>
                        </div>
                    </div>

                    {/* Легенда */}
                    <div className={classes.list}>
                        <div className={classes.item}>
                            <div className={classes.color} style={{ backgroundColor: "#4AB6E8" }} />
                            <p>Клиентская часть</p>
                        </div>
                        <div className={classes.item}>
                            <div className={classes.color} style={{ backgroundColor: "#AA6FAC" }} />
                            <p>Серверная часть</p>
                        </div>
                        <div className={classes.item}>
                            <div className={classes.color} style={{ backgroundColor: "#E85498" }} />
                            <p>База данных</p>
                        </div>
                    </div>
                </>
            ) : (
                <Empty />
            )}
        </div>
    );
};
