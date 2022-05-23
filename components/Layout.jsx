import React, { useEffect, useState } from "react";
import s from "./layout.module.scss";
import Cards from "./Cards";
import Form from "./Form";
import { useSelector } from "react-redux";

function Layout({ posts }) {
  const [realTimeData, setRealTimeData] = useState([]);
  const realTimeUpdate = useSelector((state) => state.realTimeUpdate);
  const ssr = useSelector((state) => state.ssr);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/post", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const responseData = await response.json();
      setRealTimeData(responseData);
    };
    fetchPosts();
  }, [realTimeUpdate]);

  return (
    <main className={s.layout}>
      <section className={s.left}>
        {ssr
          ? realTimeData.map((post) => <Cards key={post._id} posts={post} />)
          : posts.map((post) => <Cards key={post._id} posts={post} />)}
      </section>

      <section className={s.right}>
        <Form />
      </section>
    </main>
  );
}

export default Layout;
