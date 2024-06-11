import { FC } from "react";
import Image from "next/image";
import { CardType } from "@/common/constants";

const CardDraggable: FC<CardType> = ({ id, title, imageSrc }) => {
  return (
    <>
      <div
        id={`${id}-draggable`}
        className={`flex flex-row absolute z-2 top-0 right-0 bg-white text-black w-96 h-12 p-1 rounded-lg opacity-0`}
      >
        <Image
          className="rounded-lg"
          src={imageSrc}
          alt={title}
          width={75}
          height={75}
          priority
        />
        <div>
          <p className="ml-5 mt-5 leading-6 ">
            <span className="font-semibold text-sm">{title}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CardDraggable;
