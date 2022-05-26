import axios from "axios";
import { useEffect, useState } from "react";
import useLocalStorage from "../../custom-hooks/local-storage";
import styles from "../../styles/Home.module.css";

export interface ISitePros {
    id: string;
}
//props : ISiteInfo --> siteInfo
export default function SiteInfo({ id }: ISitePros) {
    const siteId = id;
    const [siteInfo, setSiteInfo] = useLocalStorage<JSON | null>("siteInfo", null);

    useEffect(() => {
        if (typeof window !== 'undefined' && siteId !== undefined) {
            const fetchData = async () => {
                const siteData = await axios.get(`http://localhost:3300/sites/${siteId}`)
                    .then(function (response) {
                        const data = response.data;
                        return data;
                    })
                console.log('axios got site data got: ', siteData);
                return setSiteInfo(siteData);
            }
            fetchData();
        }
    }, [siteId]);
    console.log('info components:', siteInfo);
    console.log(typeof siteInfo);

    return (
        <div className={styles.description}>
            {/* render siteInfo here */}
            <h3>Site Info Component</h3>
            <p>Here shows the charge schema for this carpark</p>
            <p>{JSON.stringify(siteInfo)}</p>
            {/* <ul>
                {JSON.parse(siteInfo as unknown as string)?.map((item: string, index: number) =>
                    (<li key={index}> {item}</li>))}
            </ul> */}
        </div>
    )
}