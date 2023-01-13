import { useEffect, useState } from "react";
import styles from "./Quartiles.module.scss";

export default function Quartiles({ data }) {
  const [stickyClass, setStickyClass] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight > 150 ? setStickyClass("sticky-nav") : setStickyClass("");
    }
  };
  return (
    <section
      className={`${styles.quartiles} ${stickyClass}`}
    >
      <div className="d-flex">
        <div>
          <h2>Portfolio structure / repartition</h2>
        </div>
        <div className="d-flex">
          {/* <a href="prediktia.xlsx" className={styles.download} download>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.31 384">
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <path d="M195.42,0c8.07,2.47,14.39,6.93,16.62,15.55a36.24,36.24,0,0,1,.86,8.9q.07,97.85,0,195.68v5.56c1.74-1.66,2.73-2.57,3.68-3.52q22.5-22.53,45-45c5.88-5.87,13-7.75,21-5.56s13.07,7.64,14.92,15.72-.72,15-6.54,20.78q-23.73,23.67-47.37,47.43-17.6,17.64-35.19,35.25c-10.7,10.68-22.81,10.67-33.46,0q-41.15-41.21-82.28-82.44c-9.06-9.1-9.92-21.47-2.23-30.26,8.33-9.52,22.23-9.91,31.53-.69,15,14.86,29.83,29.85,44.74,44.78.95,1,1.95,1.86,3.69,3.53v-5.54q0-98.22,0-196.43c0-12.67,4.92-19.4,16.9-23.28a2.46,2.46,0,0,0,.61-.42Z" />
                <path d="M77.14,384c-7.8-2-15.87-3.29-23.35-6.13C22.15,365.83.51,334.34.07,300.46,0,292.84,0,285.22.05,277.6.17,265.5,9.53,256,21.28,256s21.1,9.42,21.38,21.53c.22,9.61-.4,19.33.9,28.79,2.66,19.46,20.33,34.73,40,34.9,33,.28,66.08.12,99.13.13,38.15,0,76.31.06,114.47,0,20.92,0,37.77-13,42.25-32.81,1.22-5.4,1-11.14,1.23-16.74.19-5-.08-10,.09-15a21.29,21.29,0,0,1,41.47-6.13c.37,1.05.74,2.09,1.1,3.14v33a15.8,15.8,0,0,0-.68,2.46,85.19,85.19,0,0,1-61.91,71.72c-4.77,1.28-9.67,2.06-14.51,3.07Z" />
              </g>
            </g>
          </svg>
          Download
        </a> */}
          <div>
            <h3>Selected: 70</h3>
          </div>
          <div>
            <h3>Total price: <span>$ 1,250,000</span></h3>
          </div>
        </div>
      </div>
      <div className={styles.segmentation}>
        {data &&
          data.map(
            (
              {
                label,
                total_number_of_products,
                items_selected = [],
                number_of_products,
              },
              index
            ) => (
              <div key={label} className={styles.quartile}>
                <div className={styles.divRange}>
                  {new Array(index + 1).fill(label).map((label, index) => (
                    <span key={label + index} className={styles.range}>
                      $
                    </span>
                  ))}
                </div>
                <div className={styles.percentile}>
                  <h3>{label.replaceAll("$", "")}</h3>
                  <h2>
                    {number_of_products && number_of_products}
                    {!number_of_products &&
                      `${items_selected.length} of ${total_number_of_products}`}
                  </h2>
                </div>
              </div>
            )
          )}
      </div>
    </section>
  );
}
