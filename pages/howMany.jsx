import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Quartiles from "../components/Quartiles/Quartiles";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styles from "../styles/HowMany.module.scss";
import { BarChart } from "../components/Chart/BarChart";
import HowManyTableLoader from "../components/HowManyTableLoader/HowManyTableLoader";
import CurrencyFormat from "react-currency-format";
import { Sell } from "../components/sell/Sell";
import { Range } from "../components/Range/Range";

export default function HowMany() {
  const router = useRouter();
  const [quartiles, setQuartiles] = useState();
  const [selection, setSelection] = useState();

  useEffect(() => {
    if (router?.query?.data) {
      const data = JSON.parse(router.query.data);
      if (data.quartiles) setQuartiles(data.quartiles);
      if (data.selection) setSelection(data.selection);
    }
  }, [router.query.data]);

  return (
    <Layout title="Prediktia - How Many">
      <div className="container">
        <div className="row portfolio">
          <div className="optimization">
            <h2>Review Prediktia order</h2>
            <h5>
              Review the recommendations of the model: Accept, reject or edit
              and proceed to download your predikted file.
            </h5>
          </div>
          <div className="brand-catalog">
            <h2>Freeport</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
            >
              <path
                d="M7.71296 6.49999L1.70196 0.48999L0.287964 1.90399L4.88796 6.50399L0.287964 11.097L1.70196 12.511L7.71296 6.49999Z"
                fill="#AAA9B1"
              />
            </svg>
            <h2>Summer catalog 2023</h2>
          </div>
        </div>
      </div>
      <div className="container tabInformation">
        <div className="row">
          <div className="collapse-sections">
            <h4>Prediktions</h4>
          </div>
          <div className="collapse-sections">
            <h4>Select products</h4>
          </div>
          <div className="collapse-sections active">
            <h4>Define quantities</h4>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">{quartiles && <Quartiles data={quartiles} />}</div>
      </div>

      <div className="container">
        <div className="row">{!selection && <HowManyTableLoader />}</div>
      </div>

      <div className="container">
        <div className="row">
          {selection && (
            <table className={styles.howManyTable}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>SKU</th>
                  <th>Cost</th>
                  <th className={styles.suggest}>
                    Suggested
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="11"
                      viewBox="0 0 6 11"
                      fill="none"
                    >
                      <path
                        d="M2.6249 10.4498L0.152402 7.9718L0.856402 7.2673L2.6249 9.0348L4.3924 7.2673L5.0999 7.9743L2.6249 10.4498ZM0.856402 3.7323L0.149902 3.0248L2.6249 0.549805L5.0969 3.0273L4.3929 3.7313L2.6249 1.9643L0.856902 3.7318L0.856402 3.7323Z"
                        fill="#6AC6A7"
                      />
                    </svg>
                  </th>
                  <th className={styles.probability}>
                    Sell-through probability
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="11"
                      viewBox="0 0 6 11"
                      fill="none"
                    >
                      <path
                        d="M2.6249 10.4498L0.152402 7.9718L0.856402 7.2673L2.6249 9.0348L4.3924 7.2673L5.0999 7.9743L2.6249 10.4498ZM0.856402 3.7323L0.149902 3.0248L2.6249 0.549805L5.0969 3.0273L4.3929 3.7313L2.6249 1.9643L0.856902 3.7318L0.856402 3.7323Z"
                        fill="#6AC6A7"
                      />
                    </svg>
                  </th>
                  <th className={styles.price}>
                    Price range
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="11"
                      viewBox="0 0 6 11"
                      fill="none"
                    >
                      <path
                        d="M2.6249 10.4498L0.152402 7.9718L0.856402 7.2673L2.6249 9.0348L4.3924 7.2673L5.0999 7.9743L2.6249 10.4498ZM0.856402 3.7323L0.149902 3.0248L2.6249 0.549805L5.0969 3.0273L4.3929 3.7313L2.6249 1.9643L0.856902 3.7318L0.856402 3.7323Z"
                        fill="#6AC6A7"
                      />
                    </svg>
                  </th>
                  <th className={styles.margin}>
                    Margin range
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="11"
                      viewBox="0 0 6 11"
                      fill="none"
                    >
                      <path
                        d="M2.6249 10.4498L0.152402 7.9718L0.856402 7.2673L2.6249 9.0348L4.3924 7.2673L5.0999 7.9743L2.6249 10.4498ZM0.856402 3.7323L0.149902 3.0248L2.6249 0.549805L5.0969 3.0273L4.3929 3.7313L2.6249 1.9643L0.856902 3.7318L0.856402 3.7323Z"
                        fill="#6AC6A7"
                      />
                    </svg>
                  </th>
                  <th>Final quantity</th>
                  <th className={styles.sizecurves}>Size curve</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {selection.map(
                  ({
                    thumbnail,
                    sku,
                    cost,
                    suggested_quantity,
                    sell_through_probability_text,
                    sell_through_probability,
                    price_range,
                    brand,
                    category,
                    gender,
                    size_curve,
                    margin_range,
                  }) => (
                    <tr key={sku}>
                      <td className={styles.thumb}>
                        <img
                          src={thumbnail}
                          className={styles.thumb}
                          alt="shoes"
                          width="60"
                          height="60"
                        />
                      </td>
                      <td>{sku}</td>
                      <td>
                        <CurrencyFormat
                          value={cost}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </td>
                      <td className={styles.suggested}>{suggested_quantity}</td>
                      <td>
                        <div className={styles.probability}>
                          <div>
                            {sell_through_probability_text}
                          </div>
                          <Sell value={sell_through_probability} />
                        </div>
                      </td>
                      <td>
                        <CurrencyFormat
                          value={price_range[0]}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                        {` - `}
                        <CurrencyFormat
                          value={price_range[1]}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </td>
                      <td>
                        <Range marginRange={margin_range} />
                      </td>
                      <td className={styles.finalQuantity}>
                        {suggested_quantity}
                        <button className={styles.pen}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M1.077 11.6472C0.908686 11.6469 0.748237 11.5759 0.634796 11.4516C0.519263 11.3283 0.461855 11.1615 0.476996 10.9932L0.623996 9.37678L7.4148 2.58838L9.537 4.70998L2.748 11.4978L1.1316 11.6448C1.113 11.6466 1.0944 11.6472 1.077 11.6472ZM9.9606 4.28578L7.839 2.16418L9.1116 0.891579C9.22414 0.778912 9.37685 0.715607 9.5361 0.715607C9.69534 0.715607 9.84806 0.778912 9.9606 0.891579L11.2332 2.16418C11.3459 2.27672 11.4092 2.42943 11.4092 2.58868C11.4092 2.74792 11.3459 2.90064 11.2332 3.01318L9.9612 4.28518L9.9606 4.28578Z"
                              fill="#6AC6A7"
                            />
                          </svg>
                        </button>
                      </td>
                      <td className={styles.pop}>
                        <Popup
                          trigger={
                            <a>
                              {" "}
                              {category}, {brand}, {gender}
                            </a>
                          }
                          position="right center"
                          modal={true}
                        >
                          {close => (
                            <BarChart
                              title={`${category}, ${brand}, ${gender}`}
                              dataChart={size_curve}
                              close={close}
                            />)}
                        </Popup>
                      </td>
                      <td className={styles.actions}>
                        <button className={styles.edit}>Edit</button>                        
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
        <div className="row">
          <div className="paginator">
            <p>1 - 2 of 2</p>
            <button className="prev">
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13">
                <path d="M7.71296 6.49999L1.70196 0.48999L0.287964 1.90399L4.88796 6.50399L0.287964 11.097L1.70196 12.511L7.71296 6.49999Z" />
              </svg>
              previous
            </button>
            <button className="next">
              Next
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="13" viewBox="0 0 8 13">
                <path d="M7.71296 6.49999L1.70196 0.48999L0.287964 1.90399L4.88796 6.50399L0.287964 11.097L1.70196 12.511L7.71296 6.49999Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
