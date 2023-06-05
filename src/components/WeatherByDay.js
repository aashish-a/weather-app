import moment from "moment";
import React from "react";

function WeatherByDay({ data }) {
  return (
    <div className="next-5-days__row">
      <div className="next-5-days__date">
        {moment(data?.date).locale("en").format("ddd")}
        <div className="next-5-days__label">30/7</div>
      </div>

      <div className="next-5-days__low">
        {data?.day?.mintemp_c}&deg;
        <div className="next-5-days__label">Low</div>
      </div>

      <div className="next-5-days__high">
        {data?.day?.maxtemp_c}&deg;
        <div className="next-5-days__label">High</div>
      </div>

      <div className="next-5-days__icon">
        <img
          src={`https:${data?.day?.condition?.icon}`}
          alt={data?.day?.condition?.text}
        />
      </div>

      <div className="next-5-days__rain">
        {data?.day?.daily_chance_of_rain}%
        <div className="next-5-days__label">Rain</div>
      </div>

      <div className="next-5-days__wind">
        {data?.day?.maxwind_mph}mph
        <div className="next-5-days__label">Wind</div>
      </div>
    </div>
  );
}

export default WeatherByDay;
