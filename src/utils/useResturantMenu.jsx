import { MENU_API } from "../utils/constants";
import { useState, useEffect } from "react";

const useResturantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    console.log("API Response:", json);
    setResInfo(json?.data);
  };

  return resInfo;
};

export default useResturantMenu;
