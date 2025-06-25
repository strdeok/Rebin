import Battery from "../../../assets/icons/Battery.svg?react";
import Bottle from "../../../assets/icons/Bottle.svg?react";
import Pill from "../../../assets/icons/Pill.svg?react";
import { getBoundaryCollectors } from "../../../utils/getBoundaryCollectors";
import { useEffect, useState } from "react";
import { getWalkingMatrix } from "../../../api/getWalkingMatrix";
import Loading from "../../../components/loading";
import { useNavigate } from "react-router-dom";
import { useUserLocation } from "../../../state/nowLocationContext";

const Container = ({ location }: any) => {
  const navigate = useNavigate();
  const Icon = () => {
    switch (location.category) {
      case "battery":
        return <Battery />;
      case "pill":
        return <Pill />;
      case "bottle":
        return <Bottle />;
    }
  };

  return (
    <div className="flex flex-row items-center w-full h-24 px-4">
      {Icon()}
      <div className="ml-6 w-56">
        <span className="text-xl">{location.name}</span>
        <br />
        <span className="text-sm text-[#7D8C8B]">
          ({location.distance?.toFixed(0)}m 약{" "}
          {((location.duration ?? 0) / 60).toFixed(0)}분)
        </span>
        <br />
        <span>{location.time}</span>
      </div>

      <div className="flex flex-col absolute right-4 items-end gap-4">
        <button
          className="w-[6.563rem] h-8 bg-[#007aff] text-white rounded-lg"
          onClick={() => {
            navigate("/main", { state: { poi: location } });
          }}
        >
          길찾기 시작
        </button>
      </div>
    </div>
  );
};

export default function AroundTrash() {
  const [locations, setLocations] = useState<
    {
      name: string;
      location: { lat: number; lng: number };
      time: string;
      category: string;
      distance: number;
      duration: number;
    }[]
  >();
  const { userLocation } = useUserLocation();
  const [loading, setLoading] = useState(false);
  const [isInBoundary, setIsInBoundary] = useState(true);
  const [apiError, setApiError] = useState(false);

  const SongDoBounds = {
    north: 37.427025044166236,
    south: 37.3411119498197,
    west: 126.58951155157007,
    east: 126.69771587807054,
  };

  useEffect(() => {
    if (userLocation.lat === 0 && userLocation.lng === 0) return;
    const bins = async () => {
      setLoading(true);
      const location = getBoundaryCollectors(userLocation);
      const matrix = await getWalkingMatrix(userLocation, location);

      if (!matrix) {
        setApiError(true);
        return;
      }

      const mergedLocations = location
        .map((loc, index) => ({
          ...loc,
          distance: matrix.distances[index],
          duration: matrix.durations[index],
        }))
        .sort((a, b) => a.distance - b.distance);

      setLocations(mergedLocations);
      setLoading(false);
    };

    const isOutOfBounds =
      userLocation.lat > SongDoBounds.north ||
      userLocation.lat < SongDoBounds.south ||
      userLocation.lng < SongDoBounds.west ||
      userLocation.lng > SongDoBounds.east;

    if (isOutOfBounds) {
      setIsInBoundary(false);
    } else {
      bins();
    }
  }, [userLocation]);

  if (apiError) {
    return (
      <div className=" h-full flex flex-col items-center justify-center">
        <p>서비스 오류입니다.</p>
        <p>잠시 후 다시 시도해주세요.</p>
      </div>
    );
  } else if (isInBoundary) {
    return (
      <div className="relative flex flex-col items-center pb-20">
        {loading ? (
          <Loading />
        ) : (
          locations?.map((data) => (
            <Container key={data.name} location={data} />
          ))
        )}
      </div>
    );
  } else
    return (
      <div className="bg-gray-500 h-full flex flex-col items-center justify-center text-white">
        <p>서비스 지역을 벗어났습니다.</p>
        <p>송도 지역으로 진입하시면 정상적으로 이용하실 수 있습니다.</p>
      </div>
    );
}
