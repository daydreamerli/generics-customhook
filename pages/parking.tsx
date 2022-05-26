import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

function Redirect({ to}: { to: string }) {
    const router = useRouter();
  
    useEffect( () =>{
      router.push(to);
    },[to])
  
    return null;
  }

  export default function ParkingPage() {
    
    const [ isHoliday ,setIsHoliday ] = useState(false);
    
    useEffect( () => {
      if( typeof window !== 'undefined' ){
        setIsHoliday(window.localStorage.getItem("isHoliday") === "true");
      }
    })
   
    if(isHoliday === true){
        return <Redirect to ='/holiday' />;
    }

    return(
        <div className={styles.container}>  
            <h1>Parking Page</h1>
            <Link href={"/holiday"}>
               <a className ={styles.link}>Holiday Page</a>
            </Link>
        </div>
    )
}