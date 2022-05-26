import axios from "axios";
import { useEffect, useState } from "react";
import useLocalStorage from "../../custom-hooks/local-storage";
import styles from "../../styles/Home.module.css";

export interface ISitePros{
    id: string;
}
//props : ISiteInfo --> siteInfo
export default function SiteInfo({ id }: ISitePros) {
    const siteId = id;
    const [siteInfo,setSiteInfo] = useLocalStorage<JSON  | null>("siteInfo", null);

    useEffect(() => {
        if( typeof window !== 'undefined' && siteId !== undefined){
        const fetchData = async () => {
          const siteData = await axios.get(`http://localhost:3300/sites/${siteId}`)
            .then(function (response) {
              const data = response.data;
              console.log(data);
              return data;
            })
            console.log('axios got site data got: ',siteData);
            return setSiteInfo(siteData);
          }
        fetchData();
        }
      }, [siteId]);

    return(
        <div className={styles.description}>
            {/* render siteInfo here */}
            <h3>Site Info Component</h3>
            <p>Here shows the charge schema for this carpark</p>
            <p>
                {JSON.stringify(siteInfo) || "No data"}
            </p>
        </div>
    )
}