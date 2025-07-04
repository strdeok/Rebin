import { useEffect, useState } from "react";
import OutlineHeart from "../../../../assets/icons/OutlineHeart.svg?react";
import FillHeart from "../../../../assets/icons/FillHeart.svg?react";
import {
  getLikeLocation,
  removeLikeLocation,
} from "../../../../utils/firebase/manageLikeLocations";
import { useNavigate } from "react-router-dom";

interface StoreType {
  name: string;
  category: string;
  time: string;
}

export default function Favorites() {
  const [category, setCategory] = useState("전체보기");
  const [favorites, setFavorites] = useState<StoreType[]>([]);

  useEffect(() => {
    const fetchLikedLocations = async () => {
      const result = await getLikeLocation();
      setFavorites(result?.locations);
    };
    fetchLikedLocations();
  }, []);

  useEffect(() => {
    const fetchLikedLocations = async () => {
      const result = await getLikeLocation();
      setFavorites(result?.locations);
    };
    fetchLikedLocations();
  }, [favorites]);

  const filterFavorites = (category: string) => {
    if (category === "전체보기") {
      return favorites;
    } else
      return favorites.filter((favorite) => favorite.category === category);
  };

  const Container = ({ store }: { store: StoreType }) => {
    const [like, setLike] = useState<boolean>(true);
    const navigate = useNavigate();
    return (
      <div className="w-96 py-4 pl-8 pr-4 flex flex-row justify-between">
        <div>
          <p className="mb-2">
            <span className="text-xl">{store.name}</span>
            <span className="ml-2 text-sm text-[#7D8C8B]">
              {store.category === "pill" ? "폐의약품" : "공병"}
            </span>
          </p>
          <p className="text-sm">{store.time}</p>
        </div>

        <div className="flex flex-col h-full items-end gap-4">
          <button
            onClick={() => {
              setLike(!like);
              removeLikeLocation(store.name);
            }}
          >
            {like ? <FillHeart /> : <OutlineHeart />}
          </button>
          <button
            className="bg-[#007aff] text-white  rounded-lg py-2 px-4"
            onClick={() => {
              navigate("/main", { state: { poi: store } });
            }}
          >
            길찾기 시작
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-4 w-full mt-4">
        {["전체보기", "폐의약품", "공병"].map((label, index) => {
          return (  
            <button
              className={`w-18 h-9 rounded-lg ${
                category === label && "bg-[#19824F] text-white "
              }`}
              id={label}
              key={index}
              onClick={() => {
                setCategory(label);
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pb-20">
        {filterFavorites(category).map((data, index) => {
          return <Container store={data} key={index} />;
        })}
      </div>
    </>
  );
}
