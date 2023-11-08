import Image from "next/image";

export const HeadingImage = ({ imagePath }: { imagePath: string }) => {
  return <Image src={imagePath} width={200} height={200} alt="塵" />;
};
