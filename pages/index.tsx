import { useState, useEffect } from "react";
import useLocalStorage from "../custom-hooks/local-storage";
import styles from "../styles/Home.module.css";
import axios from "axios";
// 1) Generics... type parameters
// 2) "extends" to restrict
// 3) Default generic types
// 4) typeof to infer type from variable

// function useLocalState<S>(key: string, initial: S) {
//   const [value, setValue] = useState<S>(() => {
//     if (typeof window !== "undefined" && window.localStorage) {
//       const saved = window.localStorage.getItem(key);
//       if (saved) {
//         return JSON.parse(saved);
//       }
//     }
//     return initial;
//   });

//   useEffect(() => {
//     if (window.localStorage) {
//       window.localStorage.setItem(key, JSON.stringify(value));
//     }
//   }, [value]);

//   return [value, setValue] as [typeof value, typeof setValue];
// }

export default function Home() {
  const [text, setText] = useLocalStorage<string | null>("input", null);
  const [siteInfo,setSiteInfo] = useLocalStorage<JSON | null>("siteInfo", null);

  useEffect(() => {
    const fetchData = async () => {
      const siteData = await axios.get("http://localhost:4400/api/sites/1")
        .then(function (response) {
          const data = response.data;
          console.log(data);
          return data;
        })
        return setSiteInfo(siteData);
      }
    fetchData();
  }, []);
  
  return (
    <div className={styles.container}>
    <input
      className={styles.input}
      type="text"
      value={text ?? ""}
      onChange={(e: { target: { value: any; }; }) => setText(e.target.value)}
    />
    <div className={styles.output}>{text}</div>
    </div>
  );
}
