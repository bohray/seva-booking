import axios from "axios";
import React, { useEffect, useState } from "react";
import SevaCard from "./SevaCard";
import styles from "./styles/Home.module.css";
import SevaCardLoader from "./SevaCardLoader";

const PAGE_SIZE = 10;

const HomeSection = () => {
  const [sevas, setSevas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const fetchSevas = async () => {
      try {
        const res = await axios.get("/api/sevas");
        setSevas(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sevas", error);
      }
    };

    fetchSevas();
  }, []);

  const handleView = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <div className={styles.container}>
      <h1>Seva Listings</h1>
      <div className={styles.cardGrid}>
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <SevaCardLoader key={idx} />
            ))
          : sevas
              .slice(0, visibleCount)
              .map((seva) => <SevaCard key={seva.code} seva={seva} />)}
      </div>
      {visibleCount < sevas.length && (
        <button className={styles.viewMore} onClick={handleView}>
          View More
        </button>
      )}
    </div>
  );
};

export default HomeSection;
