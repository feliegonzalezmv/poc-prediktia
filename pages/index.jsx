import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/What.module.scss";
import { useRouter } from "next/router";
import Quartiles from "../components/Quartiles/Quartiles";
import { ProgressBar } from "../components/ProgressBar/ProgressBar";
import TableLoader from "../components/TableLoader/TableLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Navigation } from "swiper";
import CurrencyFormat from "react-currency-format";

SwiperCore.use([Navigation]);

export default function What() {
  const router = useRouter();

  const [quartiles, setQuartiles] = useState();
  const [suggestions, setSuggestions] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [suggestionsSelected, setSuggestionsSelected] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [totals, setTotals] = useState({ totalSelected: 0, totalPrice: 0 });

  useEffect(() => {
    fetch("https://api.prediktia.io/quartiles")
      .then((res) => res.json())
      .then((response) => {
        setQuartiles(response);
      });

    fetch("https://api.prediktia.io/suggestions?page=1&size=50")
      .then((res) => res.json())
      .then((response) => {
        setSuggestions(response.items);
        setIsLoading(false);
      });
  }, []);

  const updateQuartiles = (sku, price_quartile) => {
    const newQuartiles = quartiles?.map((quartile) => {
      const item = quartile;
      if (item.label === price_quartile) {
        if (item.items_selected) {
          if (item.items_selected.includes(sku)) {
            item.items_selected = item.items_selected.filter(
              (item) => item !== sku
            );
          } else {
            item.items_selected = [...item?.items_selected, sku];
          }
        } else {
          item.items_selected = [sku];
        }
      }
      return item;
    });

    setQuartiles(newQuartiles);
  };

  const updateSuggestionsSelected = (
    sku,
    rank,
    price,
    instock_sku,
    instock_rank
  ) => {
    const isInstockSkuSelected = suggestionsSelected?.some(
      (elem) => elem.instock_sku === instock_sku
    );
    const selectedItemInfo = { sku, rank, price };
    let newSuggestionsSelected = [];

    if (suggestionsSelected && isInstockSkuSelected) {
      newSuggestionsSelected = suggestionsSelected?.map((suggestion) => {
        const item = suggestion;

        if (item.instock_sku === instock_sku) {
          if (item.selected) {
            if (item.selected.some((elem) => elem.sku === sku)) {
              item.selected = item.selected.filter((item) => item.sku !== sku);
            } else {
              item.selected = [...item?.selected, selectedItemInfo];
            }
          } else {
            item.selected = [selectedItemInfo];
          }
        }
        return item;
      });
    } else if (suggestionsSelected && !isInstockSkuSelected) {
      newSuggestionsSelected = [
        ...suggestionsSelected,
        {
          instock_sku,
          instock_rank,
          selected: [selectedItemInfo],
        },
      ];
    } else {
      newSuggestionsSelected = [
        {
          instock_sku,
          instock_rank,
          selected: [selectedItemInfo],
        },
      ];
    }

    setSuggestionsSelected(newSuggestionsSelected);
    setTotals(calculateTotals(newSuggestionsSelected));
  };

  const calculateTotals = (suggestions) => {
    const totalSelected = 0;
    const totalPrice = 0;
    suggestions?.forEach((suggestion) => {
      let totalSku = 0;
      totalSku = suggestion.selected.reduce(
        (a, b) => ({
          price: a.price + b.price,
        }),
        { price: 0 }
      );
      totalPrice = totalPrice + totalSku.price;
      totalSelected = totalSelected + suggestion.selected.length;
    });

    return { totalSelected, totalPrice };
  };

  const onClickProduct = (
    sku,
    rank,
    price,
    price_quartile,
    instock_sku,
    instock_rank
  ) => {
    updateQuartiles(sku, price_quartile);
    updateSuggestionsSelected(sku, rank, price, instock_sku, instock_rank);
  };

  const onClickAnalyzePrediktion = () => {
    fetch("https://api.prediktia.io/how_many", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selected: suggestionsSelected }),
    })
      .then((res) => res.json())
      .then((res) =>
        router.push(
          { pathname: "/howMany", query: { data: JSON.stringify(res) } },
          "howMany"
        )
      );
  };

  const fetchMoreData = () => {
    fetch(
      `https://api.prediktia.io/suggestions?page=${currentPage + 1}&size=50`
    )
      .then((res) => res.json())
      .then((response) => {
        setSuggestions((prev) => [...prev, ...response.items]);
        setIsLoading(false);
        if (response?.items.length === 0) setHasMoreItems(false);
      });

    setCurrentPage((prev) => prev + 1);
  };

  const isSuggestionSelected = (instock_sku, sku) => {
    const instockSkuSelected = suggestionsSelected?.find(
      (elem) => elem.instock_sku === instock_sku
    );

    return instockSkuSelected?.selected.some(
      (suggestion) => suggestion.sku === sku
    );
  };

  return (
    <Layout title="Prediktia - What">
      <div className="container">
        <div className="row portfolio">
          <div className="optimization">
            <h2>Portfolio optimization</h2>
            <h5>
              Build-up on past top perforferms, while keeping up to date with
              relevant fashion trends.
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
          <div className="collapse-sections active">
            <h4>Select products</h4>
          </div>
          <div className="collapse-sections">
            <h4>Define quantities</h4>
          </div>
        </div>
      </div>

      {isLoading ? (
        <TableLoader />
      ) : (
        <>
          <div className="container">
            <div className="row">
              <Quartiles data={quartiles} totals={totals} />
            </div>
          </div>

          <section className="container">
            {suggestions && suggestions.length > 0 && (
              <InfiniteScroll
                dataLength={suggestions.length}
                next={fetchMoreData}
                hasMore={hasMoreItems}
                loader={<TableLoader />}
              >
                {suggestions.map((suggestion, index) => (
                  <div key={suggestion?.instock_sku} className="row instock">
                    <div className={styles.rank}>
                      {index === 0 && (
                        <div className={styles.Tstock}>
                          <div className={styles.stock}>
                            <h3>In stock</h3>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M6.00008 11.8333C2.77842 11.8333 0.166748 9.22162 0.166748 5.99996C0.166748 2.7783 2.77842 0.166626 6.00008 0.166626C9.22174 0.166626 11.8334 2.7783 11.8334 5.99996C11.8299 9.22015 9.22028 11.8298 6.00008 11.8333ZM5.41675 7.74996V8.91663H6.58341V7.74996H5.41675ZM5.41675 3.08329V6.58329H6.58341V3.08329H5.41675Z"
                                fill="#6AC6A7"
                              />
                            </svg>
                          </div>
                          <div className={styles.settings}>
                            <div className={styles.square}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="17"
                                viewBox="0 0 20 17"
                              >
                                <path d="M6 16.4995C4.17526 16.5004 2.58119 15.2663 2.125 13.4995H0V11.4995H2.126C2.64564 9.48696 4.62012 8.20777 6.66928 8.55608C8.71845 8.90439 10.1594 10.7641 9.98486 12.8354C9.81035 14.9066 8.07856 16.499 6 16.4995ZM6 10.4995C4.9074 10.5006 4.01789 11.3784 4.00223 12.4709C3.98658 13.5633 4.85057 14.4662 5.94269 14.4986C7.03481 14.5311 7.95083 13.681 8 12.5895V12.9895V12.4995C8 11.3949 7.10457 10.4995 6 10.4995ZM20 13.4995H11V11.4995H20V13.4995ZM11 8.49952C9.17563 8.49998 7.58209 7.26596 7.126 5.49952H0V3.49952H7.126C7.64564 1.48696 9.62012 0.207766 11.6693 0.556079C13.7184 0.904392 15.1594 2.76413 14.9849 4.83535C14.8103 6.90657 13.0786 8.49899 11 8.49952ZM11 2.49952C9.9074 2.50062 9.01789 3.37836 9.00223 4.47086C8.98658 5.56335 9.85056 6.46622 10.9427 6.49864C12.0348 6.53105 12.9508 5.68101 13 4.58952V4.98952V4.49952C13 3.39495 12.1046 2.49952 11 2.49952ZM20 5.49952H16V3.49952H20V5.49952Z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className={styles.card}>
                        <img
                          src={suggestion?.thumbnail}
                          alt="shoes"
                          width="200"
                          height="200"
                        />
                        <div className={styles.infoDiv}>
                          <p className={styles.skuTitle}>sku</p>
                          <p className={styles.skuCod}>
                            {suggestion?.instock_sku}
                          </p>
                        </div>
                        <div className={styles.infoDiv}>
                          <p className={styles.titleInfo}>Cost</p>
                          <p className={styles.Cod}>
                            <CurrencyFormat
                              value={suggestion?.instock_average_price}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          </p>
                        </div>
                        <div className={styles.infoDiv}>
                          <p className={styles.titleInfo}>Sell-through (3M)</p>
                          <p className={styles.Cod}>
                            {suggestion?.instock_sell_through * 100}%
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={styles.swipers}>
                      {index === 0 && (
                        <div className={styles.Tstock}>
                          <div className={styles.stock}>
                            <h3>Suggested products from the new catalog</h3>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M6.00008 11.8333C2.77842 11.8333 0.166748 9.22162 0.166748 5.99996C0.166748 2.7783 2.77842 0.166626 6.00008 0.166626C9.22174 0.166626 11.8334 2.7783 11.8334 5.99996C11.8299 9.22015 9.22028 11.8298 6.00008 11.8333ZM5.41675 7.74996V8.91663H6.58341V7.74996H5.41675ZM5.41675 3.08329V6.58329H6.58341V3.08329H5.41675Z"
                                fill="#6AC6A7"
                              />
                            </svg>
                          </div>
                          <div className={styles.settings}>
                            <div className={styles.square}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="17"
                                viewBox="0 0 20 17"
                              >
                                <path d="M6 16.4995C4.17526 16.5004 2.58119 15.2663 2.125 13.4995H0V11.4995H2.126C2.64564 9.48696 4.62012 8.20777 6.66928 8.55608C8.71845 8.90439 10.1594 10.7641 9.98486 12.8354C9.81035 14.9066 8.07856 16.499 6 16.4995ZM6 10.4995C4.9074 10.5006 4.01789 11.3784 4.00223 12.4709C3.98658 13.5633 4.85057 14.4662 5.94269 14.4986C7.03481 14.5311 7.95083 13.681 8 12.5895V12.9895V12.4995C8 11.3949 7.10457 10.4995 6 10.4995ZM20 13.4995H11V11.4995H20V13.4995ZM11 8.49952C9.17563 8.49998 7.58209 7.26596 7.126 5.49952H0V3.49952H7.126C7.64564 1.48696 9.62012 0.207766 11.6693 0.556079C13.7184 0.904392 15.1594 2.76413 14.9849 4.83535C14.8103 6.90657 13.0786 8.49899 11 8.49952ZM11 2.49952C9.9074 2.50062 9.01789 3.37836 9.00223 4.47086C8.98658 5.56335 9.85056 6.46622 10.9427 6.49864C12.0348 6.53105 12.9508 5.68101 13 4.58952V4.98952V4.49952C13 3.39495 12.1046 2.49952 11 2.49952ZM20 5.49952H16V3.49952H20V5.49952Z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                      {suggestion?.top_matches.length === 0 &&
                        suggestion?.message === "" && (
                          <p>This SKU does not have relevant matches</p>
                        )}
                      {suggestion?.top_matches.length === 0 &&
                        suggestion?.message !== "" && (
                          <div className={styles.messageContainer}>
                            {suggestion?.message}
                          </div>
                        )}
                      {suggestion?.top_matches.length > 0 && (
                        <div className="flex">
                          <div
                            className={`${styles.arrow}  button-prev-${suggestion?.instock_sku}`}
                          >
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  d="M6.58495 13.01L0.574951 6.99999L6.58495 0.98999L7.99995 2.40399L3.39995 7.00399L7.99995 11.604L6.58595 13.01H6.58495ZM12.01 13.01L5.99895 6.99999L12.01 0.98999L13.424 2.40399L8.82395 7.00399L13.424 11.604L12.011 13.01H12.01Z"
                                  fill="#AAA9B1"
                                />
                              </svg>
                            </a>
                          </div>

                          <Swiper
                            navigation={{
                              prevEl: `.button-prev-${suggestion?.instock_sku}`,
                              nextEl: `.button-next-${suggestion?.instock_sku}`,
                            }}
                            updateOnWindowResize={false}
                            spaceBetween={24}
                            breakpoints={{
                              // when window width is >= 640
                              640: {
                                slidesPerView: 1,
                              },
                              768: {
                                slidesPerView: 1,
                              },
                              1024: {
                                slidesPerView: 2,
                              },
                              1216: {
                                slidesPerView:
                                  suggestion?.top_matches.length >= 3
                                    ? 3
                                    : suggestion?.top_matches.length,
                              },
                              1408: {
                                slidesPerView:
                                  suggestion?.top_matches.length >= 4
                                    ? 4
                                    : suggestion?.top_matches.length,
                              },
                              1600: {
                                slidesPerView:
                                  suggestion?.top_matches.length >= 5
                                    ? 5
                                    : suggestion?.top_matches.length,
                              },
                            }}
                          >
                            {suggestion?.top_matches?.map(
                              ({
                                sku,
                                forecasted_performance,
                                price,
                                price_quartile,
                                rank,
                                thumbnail,
                              }) => (
                                <SwiperSlide key={sku}>
                                  <div
                                    className={
                                      isSuggestionSelected(
                                        suggestion?.instock_sku,
                                        sku
                                      )
                                        ? `${styles.card} ${styles.cardSelected}`
                                        : styles.card
                                    }
                                    onClick={() =>
                                      onClickProduct(
                                        sku,
                                        rank,
                                        price,
                                        price_quartile,
                                        suggestion.instock_sku,
                                        suggestion.instock_rank
                                      )
                                    }
                                  >
                                    <div className={styles.select}>
                                      <img
                                        src={thumbnail}
                                        alt="shoes"
                                        width="200"
                                        height="200"
                                      />
                                      <div className={styles.selected}>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="20"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                        >
                                          <path d="M10 20C4.47967 19.994 0.00606237 15.5204 0 10V9.80002C0.109931 4.30455 4.63459 -0.0720257 10.1307 0.000898217C15.6268 0.0738221 20.0337 4.5689 19.9978 10.0654C19.9619 15.5618 15.4966 19.9989 10 20ZM5.41 9.59002L4 11L8 15L16 7.00002L14.59 5.58002L8 12.17L5.41 9.59002Z" />
                                        </svg>
                                      </div>
                                    </div>
                                    <div className={styles.infoDiv}>
                                      <p className={styles.skuTitle}>sku</p>
                                      <p className={styles.skuCod}>{sku}</p>
                                    </div>
                                    <div className={styles.infoDiv}>
                                      <p className={styles.titleInfo}>Cost</p>
                                      <p className={styles.priceCod}>
                                        <CurrencyFormat
                                          value={price}
                                          displayType={"text"}
                                          thousandSeparator={true}
                                          prefix={"$"}
                                        />
                                      </p>
                                    </div>
                                    <div className={styles.infoDiv}>
                                      <p className={styles.titleInfo}>
                                        Forcasted perform.
                                      </p>
                                      <div className="progress">
                                        <ProgressBar
                                          value={forecasted_performance}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </SwiperSlide>
                              )
                            )}
                          </Swiper>

                          <div
                            className={`${styles.arrow} button-next-${suggestion?.instock_sku}`}
                          >
                            <a href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  d="M7.41395 13.01L5.99895 11.597L10.599 6.99699L5.99895 2.39699L7.41395 0.98999L13.424 6.99999L7.41495 13.01H7.41395ZM1.98895 13.01L0.574951 11.597L5.17495 6.99699L0.574951 2.40399L1.98895 0.98999L7.99995 6.99999L1.98995 13.01H1.98895Z"
                                  fill="#AAA9B1"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            )}
          </section>

          <button
            className={styles.analyzePrediktionButton}
            onClick={onClickAnalyzePrediktion}
          >
            Analyze Prediktion
          </button>
        </>
      )}
    </Layout>
  );
}
