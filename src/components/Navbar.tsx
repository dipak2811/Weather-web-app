import React, { useRef, useEffect, useState } from "react";
import { getCityDeatailsFromCoords } from "./WeatherAPI";
interface Iprops {
  cityCallBack: (city: string | undefined) => void;
}
function Navbar(props: Iprops) {
  const refInput = useRef<HTMLInputElement>(null);
  const [lat, setLet] = useState<string>("");
  const [lon, setLon] = useState<string>("");
  const successCallback = (position: any) => {
    console.log(position.coords.latitude, position.coords.longitude);
    setLet(position.coords.latitude);
    setLon(position.coords.longitude);
  };

  const errorCallback = (error: any) => {
    console.log(error);
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  useEffect(() => {
    (async () => {
      const city = await getCityDeatailsFromCoords(lat, lon);
      console.log("city", city);
      props.cityCallBack(city);
    })();
  }, []);
  return (
    <div className="d-flex justify-content-center mb-5">
      <input
        type="search"
        placeholder="search location"
        style={{
          height: "35px",
          marginRight: "5px",
          borderRadius: "15px",
          outline: "none",
          borderColor: "green",
          width: "500px",
          padding: "18px",
        }}
        ref={refInput}
      />
      <button
        className="btn btn-success"
        style={{ borderRadius: "15px" }}
        type="button"
        onClick={() => props.cityCallBack(refInput.current?.value)}
      >
        Search
      </button>
    </div>
  );
}

export default Navbar;
