import styles from "./empty.module.scss";
import { IoTrashBinOutline } from "react-icons/io5";

interface EmptyProps {
  text: string;
}
const EmptyData = ({ text }: EmptyProps) => {
  return (
    <div className={styles.empty}>
      <IoTrashBinOutline className={styles.bin} size={32} />
      <p>{text}.</p>
    </div>
  );
};

export default EmptyData;
