import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Rego from "../components/rego";
import UserOption, { IOfferProps } from "../components/user-options";
import styles from "../styles/Home.module.css";

export function Redirect({ to}: { to: string }) {
    const router = useRouter();
  
    useEffect( () =>{
      router.push(to);
    },[to])
  
    return null;
  }

  export default function ParkingPage() {
    const router = useRouter();
    const siteId = router.query.siteId as string;
    console.log('parking page got siteId: ', siteId);
    const [ isHoliday ,setIsHoliday ] = useState(false);
    const [ siteData , setSiteData ] = useState<JSON | null>(null);
    const [offer ,setOffer ] = useState<JSON | null>(null);
    
    useEffect( () => {
      if( typeof window !== 'undefined' ){
        setIsHoliday(window.localStorage.getItem("isHoliday") === "true");
        setSiteData(JSON.parse(window.localStorage.getItem("siteInfo") as string));
      }
    },[])
    
    useEffect ( () => {
      if( typeof window !== 'undefined'  && siteId !== undefined ){
        const fetchOffer = async () => {
          const offer = await axios.get(`http://localhost:3300/offers/current/${siteId}`)
            .then(function (response) {
              const data = response.data;
              console.log('Got offer data: ',data);
              if (response.data.status === 404) {
                // this means no offer is available
                console.log('No offer found');
              }
              else if (response.status === 200) {
                console.log('Axios got offer:', data);
                return setOffer(data);   // save siteData to local storage
              }
            });
            return offer;
        }
        fetchOffer();
      }
    },[siteId])

    // if(isHoliday === true){
    //     return <Redirect to ='/holiday' />;
    // }

    return(
        <div className={styles.container}>  
            <h1>Parking Page</h1>
            <Rego />
            <Link href={"/"}>
               <a className ={styles.link}>Index Page</a>
            </Link>
            <Link href={"/holiday"}>
               <a className ={styles.link}>Holiday Page</a>
            </Link>
            <p>
              {JSON.stringify(offer) || "No Offer data"}
            </p>
            <UserOption {...offer as unknown as IOfferProps} />
            <p>
                {JSON.stringify(siteData) || "No Site data"}
            </p>
        </div>
    )
}