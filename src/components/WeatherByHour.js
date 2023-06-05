import React from "react";

function SavedDataCard({ data }) {
  return (
    <div className="weather-by-hour__item">
      <p className="city-name">{data?.location?.name}</p>
      <img
        src={`https:${data?.current?.condition?.icon}`}
        alt={data?.current?.condition?.text}
      />
      <div>{data?.current?.temp_c}&deg;</div>
    </div>
  );
}

export default SavedDataCard;
