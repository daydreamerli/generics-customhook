import styles from "../styles/Home.module.css";

//props : ISiteInfo --> siteInfo
export default function SiteInfo(){

    return(
        <div className={styles.container}>
            {/* render siteInfo here */}
            <h1>Site Info Page</h1>
            <p>This is the site info page</p>
        </div>
    )
}