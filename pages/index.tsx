import { useState, useEffect } from "react";
import {useRouter } from "next/router";
import Link from "next/link";
import useLocalStorage from "../custom-hooks/local-storage";
import styles from "../styles/Home.module.css";
import axios from "axios";
import SiteInfo from "../components/siteInfo";

export default function Home() {
  const router = useRouter();
  const siteId = router.query.siteId as string;
  console.log(siteId);
  const [rego, setRego] = useLocalStorage<string | null>("rego", null);
  const [isHoliday, setIsHoliday] = useLocalStorage<boolean>("isHoliday",false);
  const [holidayData,setHolidayData] = useLocalStorage<JSON  | null>("holidayData", null);
  const [redirectTo, setRedirectTo] = useState<string>('/parking');
  
  // how to use it in other child components? const siteDate = JSON.parse(localStorage.getItem("siteInfo"));

  useEffect(() => {
    if( typeof window !== 'undefined' && siteId !== undefined){
 
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
              setIsHoliday(true);
              setRedirectTo('/holiday') // set isHoliday to true 
              return data;
            }
          });
          return holidayData;
      }
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
      <Link href={`${redirectTo}`}>
                <a className ={styles.linkTwo}>START PARKING</a>
      </Link>
      <input
      className={styles.input}
      type="text"
      required
      maxLength={6}
      value={rego ?? ""}
      onChange={(e: { target: { value: string; }; }) => setRego(e.target.value.toUpperCase())}
      />
      <div className={styles.title}>{rego}</div>
      <SiteInfo  id = {siteId}/>
    </div>
  );
}
