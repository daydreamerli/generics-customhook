import { useState, useEffect } from "react";
import {useRouter } from "next/router";
import Link from "next/link";
import useLocalStorage from "../custom-hooks/local-storage";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const siteId = router.query.siteId;
  console.log(siteId);
  const [rego, setRego] = useLocalStorage<string | null>("rego", null);
  const [siteInfo,setSiteInfo] = useLocalStorage<JSON | null>("siteInfo", null);
  const [isHoliday, setIsHoliday] = useLocalStorage<boolean>("isHoliday",false);
  const [holidayData,setHolidayData] = useLocalStorage<JSON | null>("holidayData", null);
  // how to use it in other child components? const siteDate = JSON.parse(localStorage.getItem("siteInfo"));

  useEffect(() => {
    if( typeof window !== 'undefined' && siteId !== undefined){
    const fetchData = async () => {
      const siteData = await axios.get(`http://localhost:3300/sites/${siteId}`)
        .then(function (response) {
          const data = response.data;
          console.log(data);
          return data;
        })
        return setSiteInfo(siteData);
      }
      const isHoliday = async () => {
        const holidayData = await axios.get(`http://localhost:3300/holidays/${siteId}/today`)
          .then(function (response) {
            const data = response.data;
            console.log('Got holiday data: ',data);
            if(response.data.status === 404){
             console.log('404',data);
            return setIsHoliday(false);
            }
            else if(response.status === 200){
              console.log('200',data);
              setHolidayData(data);   // save holidayData to local storage
              setIsHoliday(true); // set isHoliday to true 
              return data;
            }
          });
          return holidayData;
      }
    fetchData();
    isHoliday();
    }
  }, [siteId]);
  
  if( typeof window !== 'undefined' ){
    window.addEventListener("beforeunload", () => localStorage.clear());
  }
  
  return (
    <div className={styles.container}>  
      <h1>Home Page</h1>
      <Link href={"/holiday"}>
               <a className ={styles.link}>Holiday Page</a>
      </Link>
      <Link href={"/parking"}>
               <a className ={styles.link}>Parking Page</a>
      </Link>
      <input
      className={styles.input}
      type="text"
      required
      maxLength={6}
      value={rego ?? ""}
      onChange={(e: { target: { value: any; }; }) => setRego(e.target.value)}
      />
      <div className={styles.title}>{rego}</div>
    </div>
  );
}
