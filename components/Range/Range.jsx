import styles from "./Range.module.scss";

export const Range = ({ marginRange }) => {
    if (marginRange[1] <= 0.49){
        return(
            <div className={styles.range}>
                {`${parseInt(marginRange[0] * 100)}% - ${parseInt(marginRange[1] * 100)}% `}
                
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <path d="M10.25 21C7.5971 21.0023 5.05218 19.9495 3.17629 18.0737C1.30041 16.1978 0.24761 13.6528 0.249996 10.9999V10.7999C0.331784 6.79217 2.7978 3.2201 6.51636 1.72301C10.2349 0.225912 14.4881 1.09284 17.324 3.92595C20.1865 6.78603 21.0432 11.0893 19.4943 14.8276C17.9455 18.5659 14.2964 21.0023 10.25 21ZM10.25 12.4099L12.84 14.9999L14.25 13.5899L11.66 10.9999L14.25 8.40995L12.84 6.99995L10.25 9.58995L7.66 6.99995L6.25 8.40995L8.84 10.9999L6.25 13.5899L7.66 14.9999L10.25 12.4109V12.4099Z" fill="#FF6250" />
                </svg> */}
            </div>
        );
    }else if(marginRange[1] >= 0.50 && marginRange[1] <= 0.55){
        return(
            <div className={styles.range}>
                {`${parseInt(marginRange[0] * 100)}% - ${parseInt(marginRange[1] * 100)}% `}
                
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                    <path d="M10.25 20C4.72715 20 0.25 15.5228 0.25 10C0.25 4.47715 4.72715 0 10.25 0C15.7728 0 20.25 4.47715 20.25 10C20.2439 15.5203 15.7703 19.9939 10.25 20ZM9.25 13V15H11.25V13H9.25ZM9.25 5V11H11.25V5H9.25Z" fill="#FFC700" />
                </svg> */}
            </div>
        );
    }else{
        return(
            <div className={styles.range}>
                {`${parseInt(marginRange[0] * 100)}% - ${parseInt(marginRange[1] * 100)}% `}
                
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 20C4.47967 19.994 0.00606237 15.5204 0 10V9.80002C0.109931 4.30455 4.63459 -0.0720257 10.1307 0.000898217C15.6268 0.0738221 20.0337 4.5689 19.9978 10.0654C19.9619 15.5618 15.4966 19.9989 10 20ZM5.41 9.59002L4 11L8 15L16 7.00002L14.59 5.58002L8 12.17L5.41 9.59002Z" fill="#6AC6A7" />
                </svg> */}
            </div>
        );
    }
}