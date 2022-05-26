import styles from "../../styles/Home.module.css";

export interface IOfferProps{
    id: number;
    offerName: string;
    sequence: number;
    charge: number;
    validateHours: number;
    startAt: string;
    endAt: string;
    active: boolean;
  }

export default function UserOption({...offer} : IOfferProps){

  const offerName = offer.offerName;
  const charge = offer.charge;
  const duration = offer.validateHours;

  return (
    <div className={styles.box}>
        <h3>{offerName}</h3>
        <p>{charge}</p>
        <p>{duration}</p>
    </div>
  )
}