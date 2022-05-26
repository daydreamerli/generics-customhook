import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { Redirect } from "./parking";

export default function HolidayPage(){

    const [holidayData, setHolidayData] = useState<JSON | null>(null);

    useEffect( () => {
        if( typeof window !== 'undefined' ){
          setHolidayData(JSON.parse(window.localStorage.getItem("holidayData") as string));
        }
      },[])
    

    return(
        <div className={styles.container}>
            <h1>Holiday Page</h1>
            <p>This is the holiday page</p>
            <Link href={"/"}>
               <a className ={styles.link}>Index Page</a>
            </Link>
            <Link href={"/parking"}>
               <a className ={styles.link}>Parking Page</a>
            </Link>
            <p>
                {JSON.stringify(holidayData) || "No Holiday data"}
            </p>
        </div>
    )
}