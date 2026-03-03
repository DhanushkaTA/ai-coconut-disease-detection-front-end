import { useDispatch } from "react-redux";
import { changeLanguage } from "../../store/languageSlice";
// import { changeLanguage } from "../store/languageSlice";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();

  return (
    <div className="fixed bottom-4 left-5 space-x-5">
      <button onClick={() => dispatch(changeLanguage("en"))}>English</button>

      <button onClick={() => dispatch(changeLanguage("si"))}>සිංහල</button>
    </div>
  );
};

export default LanguageSwitcher;
