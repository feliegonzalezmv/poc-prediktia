import styles from "./Sell.module.scss";

export const Sell = ({ value }) => {
    if (value <= 0.32){
        return (
            <div className={styles.sell}>
                <div className={styles.low} style={{width: `${value * 100}%`}}></div>
            </div>
        );
    }else if (value >= 0.33 && value <= 0.65){
        return (
            <div className={styles.sell}>
                <div className={styles.medium} style={{width: `${value * 100}%`}}></div>
            </div>
        );
    }else{
        return (
            <div className={styles.sell}>
                <div className={styles.high} style={{width: `${value * 100}%`}}></div>
            </div>
        );
    }
};
