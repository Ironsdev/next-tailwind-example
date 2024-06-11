import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CardType } from "@/common/constants";
import { DropIndicator } from "@/common/helpers";

interface CardProps extends CardType {
  handleDragStart: (e: any, id: string) => void;
  active: string;
}

const Card: FC<CardProps> = ({
  id,
  active,
  title,
  location,
  imageSrc,
  handleDragStart,
}) => {
  return (
    <>
      <DropIndicator beforeId={id} />
      <div className={`${active === id ? "opacity-25" : "opacity-100"}`}>
        <motion.div
          id={`card-${id}`}
          layout
          layoutId={id}
          draggable
          onDragStart={(e) => handleDragStart(e, id)}
          className={`cursor-grab flex flex-row py-4 px-8 text-sm h-min ${
            active === id ? "bg-gray-300" : "bg-white"
          }`}
        >
          <Image
            src={imageSrc}
            alt={title}
            width="0"
            height="0"
            sizes="100vw"
            className="rounded-lg w-20 h-auto"
            priority
          />
          <div>
            <p className="ml-5 mt-5 leading-6 ">
              <span className="font-semibold text-sm">{title}</span>
              <span className="flex flex-row text-gray-400 text-xs">
                <Image
                  src="/pin.svg"
                  alt={"pin"}
                  width="0"
                  height="0"
                  className="w-2.5 h-auto"
                  priority
                />
                &nbsp;
                {location}
              </span>
            </p>
          </div>
        </motion.div>
      </div>
      <CardDraggable id={id} title={title} imageSrc={imageSrc} />
    </>
  );
};

const CardDraggable: FC<CardType> = ({ id, title, imageSrc }) => {
  return (
    <>
      <div
        id={`${id}-draggable`}
        style={{ right: "-100" }}
        className={`flex flex-row bg-white text-black min-w-30 h-12 p-3 rounded-lg absolute -left-80`}
      >
        <Image
          className="rounded-md w-6 h-auto"
          src={imageSrc}
          alt={title}
          width="0"
          height="0"
          priority
        />
        <div>
          <span className="ml-2 font-bold text-xs">{title}</span>
        </div>
      </div>
    </>
  );
};

export default Card;
