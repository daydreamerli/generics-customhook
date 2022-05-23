import { useState, useEffect } from "react";
import {useRouter } from "next/router";
import Link from "next/link";
import useLocalStorage from "../custom-hooks/local-storage";
import styles from "../styles/Home.module.css";
import axios from "axios";

function Redirect({ to}: { to: string }) {
  const router = useRouter();

  useEffect( () =>{
    router.push(to);
  },[to])

  return null;
}

export default function Home() {
  const router = useRouter();
  const siteId = router.query.siteId;
  console.log(siteId);
  const [text, setText] = useLocalStorage<string | null>("input", null);
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
             console.log(data);
            return setIsHoliday(false);
            }
            setHolidayData(data);   // save holidayData to local storage
            setIsHoliday(true); // set isHoliday to true 
            return data; 
          });
          return holidayData;
      }
    fetchData();
    isHoliday();
    }
  }, [siteId]);

  if(isHoliday === true){
    return <Redirect to ='/holiday' />;
  }
  
  return (
    <div className={styles.container}>
    
      <Link href={"/holiday"}>
          <a className ={styles.link}>Holiday Page</a>
      </Link>

      <input
      className={styles.input}
      type="text"
      value={text ?? ""}
      onChange={(e: { target: { value: any; }; }) => setText(e.target.value)}
      />
      <div className={styles.title}>{text}</div>
    </div>
  );
}
