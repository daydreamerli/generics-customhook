import useLocalStorage from "../../custom-hooks/local-storage";
import styles from "../../styles/Home.module.css";

export default function Rego(){
    const [rego, setRego] = useLocalStorage<string>("rego", "");
 return( 
    <div className ={styles.box}>
    <input
    className={styles.input}
    type="text"
    required
    maxLength={6}
    value={rego ?? ""}
    onChange={(e: { target: { value: string; }; }) => setRego(e.target.value.toUpperCase())}
    />
    <div className={styles.title}>{rego}</div>
    </div>
 )
}