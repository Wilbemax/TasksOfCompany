import classes from './budge.module.css'
import arrow from '../../assets/Vector (1).svg'


type Props = {
    firstNumber: number,
    secondNumber: number
}

export const Budge = ({ firstNumber, secondNumber }: Props) => {
    return (
        <div className={classes.staticLineWrapper}>

            {firstNumber > 0 ? <div className={classes.lineWrap}>
                <div className={classes.staticLine} />
                <div className={classes.budge} style={{ backgroundColor: '#00CC99' }}>
                    <img src={arrow} alt="" className={classes.rotate} />
                    +{firstNumber}</div>
            </div>
                : firstNumber === 0 ?
                    <div className={classes.lineWrap}>
                        <div className={classes.staticLine} />
                        <div className={classes.budge} style={{ backgroundColor: '#898290' }}>{firstNumber}</div>
                    </div> :
                    <div className={classes.lineWrap}>
                        <div className={classes.staticLine} />
                        <div className={classes.budge} style={{ backgroundColor: '#FC440F' }}>
                            <img src={arrow} alt="" />
                            {firstNumber}</div>
                    </div>}

            {secondNumber > 0 ? <div className={classes.lineWrap}>
                <div className={classes.staticLine} />
                <div className={classes.budge} style={{ backgroundColor: '#00CC99' }}>
                    <img src={arrow} alt="" className={classes.rotate} />
                    +{secondNumber}</div>
            </div>
                : secondNumber === 0 ?
                    <div className={classes.lineWrap}>
                        <div className={classes.staticLine} />
                        <div className={classes.budge} style={{ backgroundColor: '#898290' }}>{secondNumber}</div>
                    </div> :
                    <div className={classes.lineWrap}>
                        <div className={classes.staticLine} />
                        <div className={classes.budge} style={{ backgroundColor: '#FC440F' }}>
                            <img src={arrow} alt="" />
                            {secondNumber}</div>
                    </div>}
        </div>
    )
}