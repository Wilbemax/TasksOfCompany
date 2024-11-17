import classes from './column.module.css'
type Props = {
    index: number
    chartHeights: number[]
    chart: number[]
    percentages: number[]
    name: string
}
import arrow from '../../assets/Arrow.svg'

export const Column = ({index, chartHeights, chart, percentages, name}: Props) => {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>

                {index === 0 && (
                    <>
                        <div className={classes.line} style={{ height: `calc(358px - ${chartHeights[index]} / 100 * 300px) ` }} />

                    </>
                )}
                {index === 1 && (
                    <>
                        <div className={classes.arrow}>
                            <div className={classes.line} style={{ height: `calc(358px - ${chartHeights[index]} / 100 * 300px) ` }} />
                            <img className={classes.stroke} src={arrow} alt="" />

                        </div>
                        <div className={classes.line} style={{ height: `calc(358px - ${chartHeights[index]} / 100 * 300px) ` }} />

                    </>
                )}
                {index === 2 && <div className={classes.arrow}>
                    <div className={classes.line} style={{ height: `calc(358px - ${chartHeights[index]} / 100 * 300px) ` }} />
                    <img className={classes.stroke} src={arrow} alt="" />

                </div>}

            </div>


            <div
                className={classes.chart}
                style={{ height: `calc(${chartHeights[index]} / 100 * 300px)` }}

                key={index}
            >
                {/* Отображаем значения для каждой секции */}
                <div
                    className={classes.row1}
                    style={{ height: `${percentages[0]}%` }}
                >
                    <p>{chart[0]}</p>
                </div>
                <div
                    className={classes.row2}
                    style={{ height: `${percentages[1]}%` }}
                >
                    <p>{chart[1]}</p>
                </div>
                <div
                    className={classes.row3}
                    style={{ height: `${percentages[2]}%` }}
                >
                    <p>{chart[2]}</p>
                </div>


            </div>

            <p style={{ textAlign: 'center', padding: '1rem 0', fontWeight: 400, color: '#898290' }}>{name}</p>
        </div>



    )
}